import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { parse } from 'query-string';

import Sidebar from './sidebar';
import CONFIG from './fields-config.json';

const MultiEdit = (props) => {
    if (!props.user){
        return <Redirect to="/sign-up.html" />
    }
    const cat = props.match.params.cat;
    if (cat === 'like') {
        // special case for likes
        return (
            <Sidebar
            title={`Quick like`}
            back={`/edit/${cat}.html`}>
                <section className="data-section">
                    <p className="data-intro">Click all the buildings that you like and think contribute to the city!</p>

                    <div className="buttons-container ml-3 mr-3">
                        <Link to={`/view/like.html`} className="btn btn-secondary">Back to view</Link>
                        <Link to={`/edit/like.html`} className="btn btn-secondary">Back to edit</Link>
                    </div>
                </section>
            </Sidebar>
        );
    }

    const q = parse(props.location.search);
    const label = field_title_from_slug(q.k);
    return (
        <Sidebar
            title={`Quick edit`}
            back={`/edit/${cat}.html`}>
            <section className="data-section">
                <p className="data-intro">Click a building to colour</p>
                <p className="data-intro">Set <strong>{label}</strong> to <strong>{q.v}</strong></p>

                <div className="buttons-container ml-3">
                    <Link to={`/view/${cat}.html`} className="btn btn-secondary">Back to view</Link>
                    <Link to={`/edit/${cat}.html`} className="btn btn-secondary">Back to edit</Link>
                </div>
            </section>
        </Sidebar>
    );
}

function field_title_from_slug(slug) {
    const fields = CONFIG.reduce(
        (prev, section) => {
            const el = prev.concat(
                section.fields.filter(
                    field => field.slug === slug
                )
            )
            return el
        }, []
    )
    if (fields.length === 1 && fields[0].title) {
        return fields[0].title
    } else {
        console.error('Expected single match, got', fields)
    }
}

export default MultiEdit;
