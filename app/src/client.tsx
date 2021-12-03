/**
 * Client-side entry point to shared frontend React App
 *
 */
import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { App } from './frontend/app';

const data = (window as any).__PRELOADED_STATE__; // TODO: remove any

hydrate(
    <BrowserRouter>
        <App
            user={data.user}
            building={data.building}
            user_verified={data.user_verified}
            revisionId={data.latestRevisionId}
        />
    </BrowserRouter>,
    document.getElementById('root')
);

if (module.hot) {
    module.hot.accept();
}
