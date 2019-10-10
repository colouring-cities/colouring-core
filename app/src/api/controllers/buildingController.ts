import express from 'express';
import * as buildingService from '../services/building';
import * as userService from '../services/user';
import asyncController from '../routes/asyncController';


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
    const { building_id } = req.params;
    try {
        const result = await buildingService.getBuildingById(building_id);
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
    const { building_id } = req.params;
    let building = req.body;

    try {
        building = await buildingService.saveBuilding(building_id, building, userId);

        if (building.error) {
            return res.send(building);
        }
        if (typeof (building) === 'undefined') {
            return res.send({ error: 'Database error' });
        }
        res.send(building);
    } catch(err) {
        res.send({ error: 'Database errror' });
    }
}

// GET building UPRNs
const getBuildingUPRNsById = asyncController(async (req: express.Request, res: express.Response) => {
    const { building_id } = req.params;
    try {
        const result = await buildingService.getBuildingUPRNsById(building_id);

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
    const { building_id } = req.params;
    try {
        const like = await buildingService.getBuildingLikeById(building_id, req.session.user_id);

        // any value returned means like
        res.send({ like: like });
    } catch(error) {
        res.send({ error: 'Database error' })
    }
});

const updateBuildingLikeById = asyncController(async (req: express.Request, res: express.Response) => {
    if (!req.session.user_id) {
        return res.send({ error: 'Must be logged in' });
    }

    const { building_id } = req.params;
    const { like } = req.body;

    try {
        const building = like ?
            await buildingService.likeBuilding(building_id, req.session.user_id) :
            await buildingService.unlikeBuilding(building_id, req.session.user_id);
        
        if (building.error) {
            return res.send(building);
        }
        if (typeof (building) === 'undefined') {
            return res.send({ error: 'Database error' });
        }
        res.send(building);
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
    updateBuildingLikeById
};