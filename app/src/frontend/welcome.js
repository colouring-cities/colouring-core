import React from 'react';
import { Link } from 'react-router-dom';

import './welcome.css';

const Welcome = () => (
    <div className="jumbotron welcome-float">
        <h1 className="h1">Welcome to Colouring London</h1>

        <p className="lead">
        Colouring London is a citizen science platform collecting information on every
        building in London. We're building it at the Centre for Advanced Spatial Analysis,
        University College London, to help make London more sustainable.
        </p>
        <p className="lead">
        Can you help us? We're looking for volunteers of all ages and abilities to test the
        site before we launch next year. Just add your knowledge to make the buildings colour.
        </p>
        <Link to="/map/age.html"
            className="btn btn-outline-dark btn-lg btn-block">
            Start Colouring Here!
        </Link>
    </div>
);

export default Welcome;
