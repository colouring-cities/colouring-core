import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';

import { App } from './app';

const originalFetch = global.fetch;

beforeAll(() => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            ok: true,
            status: 200,
            json: () =>
                Promise.resolve({
                    type: "FeatureCollection",
                    features: [], // Ensure this is an array, even if empty
                }),
            headers: new Headers(),
            redirected: false,
            statusText: "OK",
            type: "basic",
            url: "",
            clone: jest.fn(),
            body: null,
            bodyUsed: false,
            text: jest.fn(),
            blob: jest.fn(),
            formData: jest.fn(),
            arrayBuffer: jest.fn(),
        })
    ) as jest.Mock;
});

afterAll(() => {
    global.fetch = originalFetch;
});

describe('<App />', () => {
    test('renders without exploding', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <MemoryRouter>
                <App revisionId="0" />
            </MemoryRouter>,
            div
        );
    });
});
