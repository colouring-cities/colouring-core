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
        const result = await buildingService.queryBuildingsAtPoint(lng, lat);
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
        const result = await buildingService.queryBuildingsByReference(key, id);
        res.send(result);
    } catch (error) {
        console.error(error);
        res.send({ error: 'Database error' });
    }
});

// GET individual building, POST building updates
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

const updateBuildingById = asyncController(async (req: express.Request, res: express.Response) => {
    if (req.session.user_id) {
        await updateBuilding(req, res, req.session.user_id);
    } else if (req.query.api_key) {
        try {
            const user = await userService.authAPIUser(req.query.api_key);
            await updateBuilding(req, res, user.user_id);
        } catch(err) {
            console.error(err);
            res.send({ error: 'Must be logged in' });
        }
    } else {
        res.send({ error: 'Must be logged in' });
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

// GET/POST like building
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

const getBuildingEditHistoryById = asyncController(async (req: express.Request, res: express.Response) => {
    const buildingId = processParam(req.params, 'building_id', parsePositiveIntParam, true);

    try {
        const editHistory = await buildingService.getBuildingEditHistory(buildingId);

        res.send({ history: editHistory });
    } catch(error) {
        res.send({ error: 'Database error' });
    }
});

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
    getBuildingEditHistoryById,
    getLatestRevisionId
};
