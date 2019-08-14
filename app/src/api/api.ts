import express from 'express';
import bodyParser from 'body-parser';

import { authUser, createUser, getUserById, getNewUserAPIKey } from './services/user';
import { queryLocation } from './services/search';

import buildingsRouter from './routes/buildingsRouter';


const server = express();

// parse POSTed json body
server.use(bodyParser.json());

server.use('/buildings', buildingsRouter);

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

server.use((req, res) => {
    res.status(404).json({ error: 'Resource not found'});
})

export default server;