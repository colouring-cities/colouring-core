import React from 'react';
import { Link } from 'react-router-dom';

import './welcome.css';

const Welcome = () => (
    <div className="jumbotron welcome-float">
        <h1 className="h1">Welcome to Colouring London</h1>

        <p className="lead">
        Colouring London is a citizen science platform collecting information on every
        building in London. We're building it at the Centre for Advanced Spatial Analysis,
        University College London, to support sustainability research and we're looking for
        volunteers of all ages and abilities to help.
        </p>
        <p className="lead">
        All you need to do is add information on any London building, to help create beautiful,
        coloured maps, and a free statistical database for everyone to use. Or just view our
        maps and test our site before we launch officially next year.
        </p>
        <p className="lead">
        Start colouring buildings and viewing maps now!
        </p>
        <Link to="/map/age.html"
            className="btn btn-outline-dark btn-lg btn-block">
            Start Colouring
        </Link>
    </div>
);

export default Welcome;
