/**
 * Server-side Express application
 * - API methods
 * - entry-point to shared React App
 *
 */
import pgConnect from 'connect-pg-simple';
import express from 'express';
import session from 'express-session';

import apiServer from './api/api';
import db from './db';
import frontendRoute from './frontendRoute';
import tileserver from './tiles/tileserver';

// create server
const server = express();

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
    server.set('trust proxy', 1);
    // serve secure cookies
    sess.cookie.secure = true;
}
server.use(session(sess));

server.use('/tiles', tileserver);
server.use('/api', apiServer);
server.use(frontendRoute);

export default server;
