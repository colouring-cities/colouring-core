import React from 'react';
import { Link } from 'react-router-dom';

import './welcome.css';

const Welcome = () => (
    <div className="jumbotron welcome-float">
        <h1 className="h1">Welcome to Colouring London</h1>

        <p className="lead">
        Colouring London is a citizen science platform collecting information on every
        building in London, to help make the city more sustainable. We&rsquo;re building it at The
        Bartlett Centre for Advanced Spatial Analysis, University College London.
        </p>
        <p className="lead">
        Can you help us? We&rsquo;re still at an early stage of development, and we&rsquo;re looking for
        volunteers of all ages and abilities to test and provide feedback on the site as we
        build it.
        </p>
        <Link to="/view/categories.html"
            className="btn btn-outline-dark btn-lg btn-block">
            Start Colouring Here!
        </Link>
        <img src="images/supporter-logos.png" alt="Colouring London collaborating organisations: The Bartlett UCL, Ordnance Survey, Historic England, Greater London Authority" />
    </div>
);

export default Welcome;
