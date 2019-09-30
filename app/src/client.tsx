/**
 * Client-side entry point to shared frontend React App
 *
 */
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { hydrate } from 'react-dom';

import App from './frontend/app';

const data = (window as any).__PRELOADED_STATE__; // TODO: remove any

hydrate(
    <BrowserRouter>
        <App user={data.user} building={data.building} building_like={data.building_like} />
    </BrowserRouter>,
    document.getElementById('root')
);

if (module.hot) {
    module.hot.accept();
}
