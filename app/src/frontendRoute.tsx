import express from 'express';
import React from 'react';
import { StaticRouter } from 'react-router-dom';

import { renderToString } from 'react-dom/server';
import serialize from 'serialize-javascript';

import App from './frontend/app';

import { parseBuildingURL } from './parse';
import { getUserById } from './api/services/user';
import {
    getBuildingById,
    getBuildingLikeById,
    getBuildingUPRNsById
} from './api/services/building';


// reference packed assets
const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);


function frontendRoute(req: express.Request, res: express.Response) {
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
    ]).then(function ([user, building, uprns, buildingLike]) {
        if (isBuilding && typeof (building) === 'undefined') {
            context.status = 404;
        }
        data.user = user;
        data.building = building;
        data.building_like = buildingLike;
        if (data.building != null) {
            data.building.uprns = uprns;
        }
        renderHTML(context, data, req, res);
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

        <meta name="twitter:card"              content="summary" />
        <meta name="twitter:site"              content="@colouringlondon" />

        <meta property="og:url"                content="https://colouring.london" />
        <meta property="og:type"               content="website" />
        <meta property="og:title"              content="Colouring London" />
        <meta property="og:description"        content="Colouring London is a citizen science platform collecting information on every building in London, to help make the city more sustainable. We’re building it at The Bartlett Centre for Advanced Spatial Analysis, University College London." />
        <meta property="og:locale"             content="en_GB" />
        <meta property="og:image"              content="https://colouring.london/images/logo-cl.png" />

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

export default frontendRoute;
