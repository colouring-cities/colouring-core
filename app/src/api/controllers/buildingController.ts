import express from 'express';

import { ApiUserError } from '../errors/api';
import { UserError } from '../errors/general';
import { parsePositiveIntParam, processParam } from '../parameters';
import asyncController from '../routes/asyncController';
import * as buildingService from '../services/building';
import * as userService from '../services/user';


// GET buildings
// not implemented - may be useful to GET all buildings, paginated

// GET buildings at point
const getBuildingsByLocation = asyncController(async (req: express.Request, res: express.Response) => {
    const { lng, lat } = req.query;
    try {
        const result = await buildingService.queryBuildingsAtPoint(Number(lng), Number(lat));
        res.send(result);
    } catch (error) {
        console.error(error);
        res.send({ error: 'Database error' });
    }
});

// GET buildings by reference (UPRN/TOID or other identifier)
const getBuildingsByReference = asyncController(async (req: express.Request, res: express.Response) => {
    const { key, id } = req.query;
    try {
        const result = await buildingService.queryBuildingsByReference(String(key), String(id));
        res.send(result);
    } catch (error) {
        console.error(error);
        res.send({ error: 'Database error' });
    }
});

// GET individual building
const getBuildingById = asyncController(async (req: express.Request, res: express.Response) => {
    const buildingId = processParam(req.params, 'building_id', parsePositiveIntParam, true);

    try {
        const result = await buildingService.getBuildingById(buildingId);
        res.send(result);
    } catch(error) {
        console.error(error);
        res.send({ error: 'Database error' });
    }
});

// POST building attribute updates
const updateBuildingById = asyncController(async (req: express.Request, res: express.Response) => {
    let user_id;

    if (req.session.user_id) {
        user_id = req.session.user_id;
    } else if (req.query.api_key) {
        try {
            const user = await userService.authAPIUser(String(req.query.api_key));
            user_id = user.user_id;
        } catch(err) {
            console.error(err);
            res.send({ error: 'Must be logged in' });
        }
    } else {
        res.send({ error: 'Must be logged in' });
    }

    if (user_id) {
        await updateBuilding(req, res, user_id);
    }
});

async function updateBuilding(req: express.Request, res: express.Response, userId: string) {
    const buildingId = processParam(req.params, 'building_id', parsePositiveIntParam, true);

    const buildingUpdate = req.body;

    let updatedBuilding: object;
    try {
        updatedBuilding = await buildingService.saveBuilding(buildingId, buildingUpdate, userId);
    } catch(error) {
        if(error instanceof UserError) {
            throw new ApiUserError(error.message, error);
        }
        throw error;
    }

    res.send(updatedBuilding);
}

// GET building UPRNs
const getBuildingUPRNsById = asyncController(async (req: express.Request, res: express.Response) => {
    const buildingId = processParam(req.params, 'building_id', parsePositiveIntParam, true);

    try {
        const result = await buildingService.getBuildingUPRNsById(buildingId);

        if (typeof (result) === 'undefined') {
            return res.send({ error: 'Database error' });
        }
        res.send({uprns: result});
    } catch(error) {
        console.error(error);
        res.send({ error: 'Database error' });
    }
});

// GET whether the user likes a building
const getBuildingLikeById = asyncController(async (req: express.Request, res: express.Response) => {
    if (!req.session.user_id) {
        return res.send({ like: false });  // not logged in, so cannot have liked
    }

    const buildingId = processParam(req.params, 'building_id', parsePositiveIntParam, true);

    try {
        const like = await buildingService.getBuildingLikeById(buildingId, req.session.user_id);

        // any value returned means like
        res.send({ like: like });
    } catch(error) {
        res.send({ error: 'Database error' });
    }
});

// GET building edit history
const getBuildingEditHistoryById = asyncController(async (req: express.Request, res: express.Response) => {
    const buildingId = processParam(req.params, 'building_id', parsePositiveIntParam, true);

    try {
        const editHistory = await buildingService.getBuildingEditHistory(buildingId);

        res.send({ history: editHistory });
    } catch(error) {
        res.send({ error: 'Database error' });
    }
});

// POST update to like/unlike building
const updateBuildingLikeById = asyncController(async (req: express.Request, res: express.Response) => {
    if (!req.session.user_id) {
        return res.send({ error: 'Must be logged in' });
    }

    const buildingId = processParam(req.params, 'building_id', parsePositiveIntParam, true);
    const { like } = req.body;

    let updatedBuilding: object;
    try {
        updatedBuilding = like ?
            await buildingService.likeBuilding(buildingId, req.session.user_id) :
            await buildingService.unlikeBuilding(buildingId, req.session.user_id);
    } catch(error) {
        if(error instanceof UserError) {
            throw new ApiUserError(error.message, error);
        }

        throw error;
    }

    res.send(updatedBuilding);
});

// GET building attributes (and values) as verified by user
const getUserVerifiedAttributes = asyncController(async (req: express.Request, res: express.Response) => {
    if (!req.session.user_id) {
        return res.send({error: "Not logged in"}); // not logged in, so send empty object as no attributes verified
    }

    const buildingId = processParam(req.params, 'building_id', parsePositiveIntParam, true);

    try {
        const verifiedAttributes = await buildingService.getUserVerifiedAttributes(buildingId, req.session.user_id);
        res.send(verifiedAttributes);
    } catch (error) {
        if(error instanceof UserError) {
            throw new ApiUserError(error.message, error);
        }

        throw error;
    }
});

// POST update to verify building attribute
const verifyBuildingAttributes = asyncController(async (req: express.Request, res: express.Response) => {
    if (!req.session.user_id) {
        return res.send({ error: 'Must be logged in' });
    }

    const buildingId = processParam(req.params, 'building_id', parsePositiveIntParam, true);
    const verifiedAttributes = req.body;

    try {
        const success = await buildingService.verifyBuildingAttributes(buildingId, req.session.user_id, verifiedAttributes);
        res.send(success);
    } catch (error) {
        if(error instanceof UserError) {
            throw new ApiUserError(error.message, error);
        }

        throw error;
    }    
});

// GET latest revision id of any building
const getLatestRevisionId = asyncController(async (req: express.Request, res: express.Response) => {
    try {
        const revisionId = await buildingService.getLatestRevisionId();
        res.send({latestRevisionId: revisionId});
    } catch(error) {
        res.send({ error: 'Database error' });
    }
});

export default {
    getBuildingsByLocation,
    getBuildingsByReference,
    getBuildingById,
    updateBuildingById,
    getBuildingUPRNsById,
    getBuildingLikeById,
    updateBuildingLikeById,
    getUserVerifiedAttributes,
    verifyBuildingAttributes,
    getBuildingEditHistoryById,
    getLatestRevisionId
};
