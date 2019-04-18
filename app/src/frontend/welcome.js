import React from 'react';
import { Link } from 'react-router-dom';

import './welcome.css';

const Welcome = () => (
    <div className="jumbotron welcome-float">
        <h1 className="h1">Welcome to Colouring London</h1>

        <p className="lead">
        Colouring London is a citizen science platform collecting information on every
        building in London, to help make the city more sustainable.
        </p>
        <p className="lead">
        We're looking for volunteers of all ages and abilities to test the
        site. Add your knowledge to make the buildings colour.
        </p>
        <Link to="/view/age.html"
            className="btn btn-outline-dark btn-lg btn-block">
            Start Colouring Here!
        </Link>
        <img src="images/supporter-logos.png" alt="Colouring London collaborating organisations:         The Bartlett UCL, Ordnance Survey, Historic ENgland, GLA, bretrust, EPPSRC, RICS, Survey of London, RSA, RIBA Learning, UCL Energy Institute, UCL, UCL IEDE, IHR, Layers of London" />
    </div>
);

export default Welcome;
