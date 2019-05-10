import React from 'react';
import { Redirect } from 'react-router-dom';

import Sidebar from './sidebar';


const MultiEdit = (props) => {
    if (!props.user){
        return <Redirect to="/sign-up.html" />
    }
    const cat = props.match.params.cat;

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
