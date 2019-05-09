import React from 'react';
import { Redirect } from 'react-router-dom';

import Sidebar from './sidebar';
import { parseCategoryURL } from '../parse';


const MultiEdit = (props) => {
    if (!props.user){
        return <Redirect to="/sign-up.html" />
    }
    const cat = parseCategoryURL(props.match.url);
    return (
        <Sidebar
            title={`Quick edit`}
            back={`/edit/${cat}.html`}>
            <section className="data-section">
                <p className="data-intro">Click a building to colour</p>
                <p className="data-intro">Set <strong>Year built</strong> to <strong>1999</strong></p>
            </section>
        </Sidebar>
    );
}

export default MultiEdit;
