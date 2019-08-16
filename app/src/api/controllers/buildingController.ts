import * as buildingService from '../services/building';
import * as userService from '../services/user';


// GET buildings
// not implemented - may be useful to GET all buildings, paginated

// GET buildings at point
function getBuildingsByLocation(req, res) {
    const { lng, lat } = req.query;
    buildingService.queryBuildingsAtPoint(lng, lat).then(function (result) {
        res.send(result);
    }).catch(function (error) {
        console.error(error);
        res.send({ error: 'Database error' })
    })
}

// GET buildings by reference (UPRN/TOID or other identifier)
function getBuildingsByReference(req, res) {
    const { key, id } = req.query;
    buildingService.queryBuildingsByReference(key, id).then(function (result) {
        res.send(result);
    }).catch(function (error) {
        console.error(error);
        res.send({ error: 'Database error' })
    })
}

// GET individual building, POST building updates
function getBuildingById(req, res) {
    const { building_id } = req.params;
    buildingService.getBuildingById(building_id).then(function (result) {
        res.send(result);
    }).catch(function (error) {
        console.error(error);
        res.send({ error: 'Database error' })
    })
}

function updateBuildingById(req, res) {
    if (req.session.user_id) {
        updateBuilding(req, res, req.session.user_id);
    } else if (req.query.api_key) {
        userService.authAPIUser(req.query.api_key)
            .then(function (user) {
                updateBuilding(req, res, user.user_id)
            })
            .catch(function (err) {
                console.error(err);
                res.send({ error: 'Must be logged in' });
            });
    } else {
        res.send({ error: 'Must be logged in' });
    }
}

function updateBuilding(req, res, userId) {
    const { building_id } = req.params;
    const building = req.body;
    buildingService.saveBuilding(building_id, building, userId).then(building => {
        if (building.error) {
            res.send(building)
            return
        }
        if (typeof (building) === 'undefined') {
            res.send({ error: 'Database error' })
            return
        }
        res.send(building)
    }).catch(
        () => res.send({ error: 'Database error' })
    )
}

// GET building UPRNs
function getBuildingUPRNsById(req, res) {
    const { building_id } = req.params;
    buildingService.getBuildingUPRNsById(building_id).then(function (result) {
        if (typeof (result) === 'undefined') {
            res.send({ error: 'Database error' })
            return
        }
        res.send({
            uprns: result
        });
    }).catch(function (error) {
        console.error(error);
        res.send({ error: 'Database error' })
    })
}

// GET/POST like building
function getBuildingLikeById(req, res) {
    if (!req.session.user_id) {
        res.send({ like: false });  // not logged in, so cannot have liked
        return
    }
    const { building_id } = req.params;
    buildingService.getBuildingLikeById(building_id, req.session.user_id).then(like => {
        // any value returned means like
        res.send({ like: like })
    }).catch(
        () => res.send({ error: 'Database error' })
    )
}

function updateBuildingLikeById(req, res) {
    if (!req.session.user_id) {
        res.send({ error: 'Must be logged in' });
        return
    }
    const { building_id } = req.params;
    const { like } = req.body;
    if (like) {
        buildingService.likeBuilding(building_id, req.session.user_id).then(building => {
            if (building.error) {
                res.send(building)
                return
            }
            if (typeof (building) === 'undefined') {
                res.send({ error: 'Database error' })
                return
            }
            res.send(building)
        }).catch(
            () => res.send({ error: 'Database error' })
        )
    } else {
        buildingService.unlikeBuilding(building_id, req.session.user_id).then(building => {
            if (building.error) {
                res.send(building)
                return
            }
            if (typeof (building) === 'undefined') {
                res.send({ error: 'Database error' })
                return
            }
            res.send(building)
        }).catch(
            () => res.send({ error: 'Database error' })
        )
    }
}

export default {
    getBuildingsByLocation,
    getBuildingsByReference,
    getBuildingById,
    updateBuildingById,
    getBuildingUPRNsById,
    getBuildingLikeById,
    updateBuildingLikeById
};