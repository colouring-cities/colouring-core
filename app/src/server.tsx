/**
 * Server-side Express application
 * - API methods
 * - entry-point to shared React App
 *
 */
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import express from 'express';
import { renderToString } from 'react-dom/server';
import serialize from 'serialize-javascript';

import session from 'express-session';
import pgConnect from 'connect-pg-simple';

import App from './frontend/app';
import db from './db';
import { getUserById } from './api/services/user';
import {
    getBuildingById,
    getBuildingLikeById,
    getBuildingUPRNsById
} from './api/services/building';
import tileserver from './tiles/tileserver';
import apiServer from './api/api';
import { parseBuildingURL } from './parse';

// create server
const server = express();

// reference packed assets
const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

// disable header
server.disable('x-powered-by');

// serve static files
server.use(express.static(process.env.RAZZLE_PUBLIC_DIR));


// handle user sessions
const pgSession = pgConnect(session);
const sess: any = { // TODO: remove any
    name: 'cl.session',
    store: new pgSession({
        pgPromise: db,
        tableName: 'user_sessions'
    }),
    secret: process.env.APP_COOKIE_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
};
if (server.get('env') === 'production') {
    // trust first proxy
    server.set('trust proxy', 1)
    // serve secure cookies
    sess.cookie.secure = true
}
server.use(session(sess));

// handle HTML routes (server-side rendered React)
server.get('/*.html', frontendRoute);
server.get('/', frontendRoute);

function frontendRoute(req, res) {
    const context: any = {}; // TODO: remove any
    const data: any = {}; // TODO: remove any
    context.status = 200;

    const userId = req.session.user_id;
    const buildingId = parseBuildingURL(req.url);
    const isBuilding = (typeof (buildingId) !== 'undefined');
    if (isBuilding && isNaN(buildingId)) {
        context.status = 404;
    }

    Promise.all([
        userId ? getUserById(userId) : undefined,
        isBuilding ? getBuildingById(buildingId) : undefined,
        isBuilding ? getBuildingUPRNsById(buildingId) : undefined,
        (isBuilding && userId) ? getBuildingLikeById(buildingId, userId) : false
    ]).then(function (values) {
        const user = values[0];
        const building = values[1];
        const uprns = values[2];
        const buildingLike = values[3];
        if (isBuilding && typeof (building) === 'undefined') {
            context.status = 404
        }
        data.user = user;
        data.building = building;
        data.building_like = buildingLike;
        if (data.building != null) {
            data.building.uprns = uprns;
        }
        renderHTML(context, data, req, res)
    }).catch(error => {
        console.error(error);
        data.user = undefined;
        data.building = undefined;
        data.building_like = undefined;
        context.status = 500;
        renderHTML(context, data, req, res);
    });
}

function renderHTML(context, data, req, res) {
    const markup = renderToString(
        <StaticRouter context={context} location={req.url}>
            <App user={data.user} building={data.building} building_like={data.building_like} />
        </StaticRouter>
    );

    if (context.url) {
        res.redirect(context.url);
    } else {
        res.status(context.status).send(
            `<!doctype html>
    <html lang="">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charset="utf-8" />
        <title>Colouring London</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <style>
          @font-face {
            font-family: 'glacial_cl';
            src: url('/fonts/glacialindifference-regular-webfont.woff2') format('woff2'),
            url('/fonts/glacialindifference-regular-webfont.woff') format('woff');
            font-weight: normal;
            font-style: normal;
          }
        </style>
        ${
    assets.client.css
        ? `<link rel="stylesheet" href="${assets.client.css}">`
        : ''
}
        ${
    process.env.NODE_ENV === 'production'
        ? `<script src="${assets.client.js}" defer></script>`
        : `<script src="${assets.client.js}" defer crossorigin></script>`
}
    </head>
    <body>
        <div id="root">${markup}</div>
        <script>
          window.__PRELOADED_STATE__ = ${serialize(data)}
        </script>
    </body>
</html>`
        );
    }
}

server.use('/tiles', tileserver);

server.use('/api', apiServer);

// use the frontend route for anything else - will presumably show the 404 page
server.use(frontendRoute);

export default server;
