import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Component to fall back on in case of 404 or no other match
 */
export const NotFound: React.FC = () => (
    <article>
        <section className="main-col">
            <h1 className="h1">Page not found</h1>
            <p className="lead">

            We can&rsquo;t find that one anywhere.

            </p>
            <Link className="btn btn-outline-dark" to="/">Back home</Link>
        </section>
    </article>
);
