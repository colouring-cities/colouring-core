import express from 'express';
import bodyParser from 'body-parser';

import { authUser, getNewUserAPIKey, logout } from './services/user';
import { queryLocation } from './services/search';

import buildingsRouter from './routes/buildingsRouter';
import usersRouter from './routes/usersRouter';


const server = express.Router();

// parse POSTed json body
server.use(bodyParser.json());

server.use('/buildings', buildingsRouter);
server.use('/users', usersRouter);

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
    logout(req.session).then(() => {
        res.send({ success: true });
    }).catch(err => {
        console.error(err);
        res.send({ error: 'Failed to end session'});
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

server.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    if (err != undefined) {
        console.log('Global error handler: ', err);
        res.status(500).send({ error: 'Server error' });
    }
});

server.use((req, res) => {
    res.status(404).json({ error: 'Resource not found'});
})


export default server;
