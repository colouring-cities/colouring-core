import express from 'express';


import { authUser, createUser, getUserById, authAPIUser, getNewUserAPIKey } from './services/user';
import {
    queryBuildingsAtPoint,
    queryBuildingsByReference,
    getBuildingById,
    getBuildingLikeById,
    getBuildingUPRNsById,
    saveBuilding,
    likeBuilding,
    unlikeBuilding
} from './services/building';
import { queryLocation } from './services/search';

const server = express.Router();

// GET buildings
// not implemented - may be useful to GET all buildings, paginated

// GET buildings at point
server.get('/buildings/locate', function (req, res) {
    const { lng, lat } = req.query;
    queryBuildingsAtPoint(lng, lat).then(function (result) {
        res.send(result);
    }).catch(function (error) {
        console.error(error);
        res.send({ error: 'Database error' })
    })
});

// GET buildings by reference (UPRN/TOID or other identifier)
server.get('/buildings/reference', function (req, res) {
    const { key, id } = req.query;
    queryBuildingsByReference(key, id).then(function (result) {
        res.send(result);
    }).catch(function (error) {
        console.error(error);
        res.send({ error: 'Database error' })
    })
});

// GET individual building, POST building updates
server.route('/building/:building_id.json')
    .get(function (req, res) {
        const { building_id } = req.params;
        getBuildingById(building_id).then(function (result) {
            res.send(result);
        }).catch(function (error) {
            console.error(error);
            res.send({ error: 'Database error' })
        })
    })
    .post(function (req, res) {
        if (req.session.user_id) {
            updateBuilding(req, res, req.session.user_id);
        } else if (req.query.api_key) {
            authAPIUser(req.query.api_key)
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
    })

function updateBuilding(req, res, userId) {
    const { building_id } = req.params;
    const building = req.body;
    saveBuilding(building_id, building, userId).then(building => {
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
server.get('/building/:building_id/uprns.json', function (req, res) {
    const { building_id } = req.params;
    getBuildingUPRNsById(building_id).then(function (result) {
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
})

// GET/POST like building
server.route('/building/:building_id/like.json')
    .get(function (req, res) {
        if (!req.session.user_id) {
            res.send({ like: false });  // not logged in, so cannot have liked
            return
        }
        const { building_id } = req.params;
        getBuildingLikeById(building_id, req.session.user_id).then(like => {
            // any value returned means like
            res.send({ like: like })
        }).catch(
            () => res.send({ error: 'Database error' })
        )
    })
    .post(function (req, res) {
        if (!req.session.user_id) {
            res.send({ error: 'Must be logged in' });
            return
        }
        const { building_id } = req.params;
        const { like } = req.body;
        if (like) {
            likeBuilding(building_id, req.session.user_id).then(building => {
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
            unlikeBuilding(building_id, req.session.user_id).then(building => {
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
    })

// POST new user
server.post('/users', function (req, res) {
    const user = req.body;
    if (req.session.user_id) {
        res.send({ error: 'Already signed in' });
        return
    }

    if (user.email) {
        if (user.email != user.confirm_email) {
            res.send({ error: 'Email did not match confirmation.' });
            return
        }
    } else {
        user.email = null;
    }

    createUser(user).then(function (result) {
        if (result.user_id) {
            req.session.user_id = result.user_id;
            res.send({ user_id: result.user_id });
        } else {
            req.session.user_id = undefined;
            res.send({ error: result.error });
        }
    }).catch(function (err) {
        console.error(err);
        res.send(err)
    });
});

// POST user auth
server.post('/login', function (req, res) {
    authUser(req.body.username, req.body.password).then(function (user: any) { // TODO: remove any
        if (user.user_id) {
            req.session.user_id = user.user_id;
        } else {
            req.session.user_id = undefined;
        }
        res.send(user);
    }).catch(function (error) {
        res.send(error);
    })
});

// POST user logout
server.post('/logout', function (req, res) {
    req.session.user_id = undefined;
    req.session.destroy(function (err) {
        if (err) {
            console.error(err);
            res.send({ error: 'Failed to end session' })
        }
        res.send({ success: true });
    });
});

// GET own user info
server.get('/users/me', function (req, res) {
    if (!req.session.user_id) {
        res.send({ error: 'Must be logged in' });
        return
    }

    getUserById(req.session.user_id).then(function (user) {
        res.send(user);
    }).catch(function (error) {
        res.send(error);
    });
});

// POST generate API key
server.post('/api/key', function (req, res) {
    if (!req.session.user_id) {
        res.send({ error: 'Must be logged in' });
        return
    }

    getNewUserAPIKey(req.session.user_id).then(function (apiKey) {
        res.send(apiKey);
    }).catch(function (error) {
        res.send(error);
    });
})

// GET search
server.get('/search', function (req, res) {
    const searchTerm = req.query.q;
    if (!searchTerm) {
        res.send({
            error: 'Please provide a search term'
        })
        return
    }
    queryLocation(searchTerm).then((results) => {
        if (typeof (results) === 'undefined') {
            res.send({
                error: 'Database error'
            })
            return
        }
        res.send({
            results: results.map(item => {
                // map from DB results to GeoJSON Feature objects
                const geom = JSON.parse(item.st_asgeojson)
                return {
                    type: 'Feature',
                    attributes: {
                        label: item.search_str,
                        zoom: item.zoom || 9
                    },
                    geometry: geom
                }
            })
        })
    }).catch(function (error) {
        res.send(error);
    });
})

export default server;