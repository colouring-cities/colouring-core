import express from 'express';

import { ApiUserError } from '../errors/api';
import { UserError } from '../errors/general';
import { parseBooleanExact } from '../../helpers';
import { parsePositiveIntParam, processParam } from '../parameters';
import asyncController from '../routes/asyncController';
import * as buildingService from '../services/building/base';
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

    const returnUserAttributes = parseBooleanExact(String(req.query.user_attributes));

    let userDataOptions = null;
    if(returnUserAttributes) {
        if(!req.session.user_id) {
            return res.send({ error: 'Must be logged in' });
        }
        userDataOptions = { userId: req.session.user_id, userAttributes: true};
    }

    try {
        const result = await buildingService.getBuildingById(buildingId, { userDataOptions });
        res.send(result);
    } catch(error) {
        console.error(error);
        res.send({ error: 'Database error' });
    }
});

// POST building attribute updates
const updateBuildingById = asyncController(async (req: express.Request, res: express.Response) => {
    let userId: string;
    
    try {
        userId = req.session.user_id ?? (
            req.query.api_key && await userService.authAPIUser(String(req.query.api_key))
        );
    } catch(error) {
        console.error(error);
    }

    if(!userId) {
        return res.send({ error: 'Must be logged in' });
    }

    const buildingId = processParam(req.params, 'building_id', parsePositiveIntParam, true);

    const {
        attributes = null,
        user_attributes: userAttributes = null
    } = req.body;

    try {
        const resultUpdate = await buildingService.editBuilding(buildingId, userId, {attributes, userAttributes});
        
        res.send({
            attributes: resultUpdate.attributes,
            user_attributes: resultUpdate.userAttributes,
            revision_id: resultUpdate.revisionId
        });
    } catch(error) {
        if(error instanceof UserError) {
            throw new ApiUserError(error.message, error);
        }
        throw error;
    }
});


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

const getBuildingUserAttributesById = asyncController(async (req: express.Request, res: express.Response) => {
    if(!req.session.user_id) {
        return res.send({ error: 'Must be logged in'});
    }

    const buildingId = processParam(req.params, 'building_id', parsePositiveIntParam, true);

    try {
        const userAttributes = await buildingService.getBuildingUserAttributesById(buildingId, req.session.user_id);

        res.send(userAttributes);
    } catch(error) {
        res.send({ error: 'Database error'});
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
    getUserVerifiedAttributes,
    verifyBuildingAttributes,
    getBuildingEditHistoryById,
    getLatestRevisionId,
    getBuildingUserAttributesById
};
