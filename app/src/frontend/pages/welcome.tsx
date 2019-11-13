import React from 'react';
import { Link } from 'react-router-dom';

import './welcome.css';

const Welcome = () => (
    <div className="jumbotron welcome-float">
        <h1 className="h1">Welcome to Colouring London</h1>

        <p className="lead">
        Colouring London is a knowledge exchange platform collecting information on every
        building in London, to help make the city more sustainable. We&rsquo;re building it at The
        Bartlett Centre for Advanced Spatial Analysis, University College London.
        </p>
        <p className="lead">
        Can you help us? We&rsquo;re still at an early stage of development, and we&rsquo;re looking for
        volunteers of all ages and abilities to test and provide feedback on the site as we
        build it.
        </p>
        <p className="lead">
        All of the data we collect is made <Link to="/data-extracts.html">openly available</Link> &ndash;
        please read our <a href="https://www.pages.colouring.london/data-ethics">data ethics policy</a> and
        credit Colouring London if you use or share our maps or data.
        </p>
        <Link to="/view/categories"
            className="btn btn-outline-dark btn-lg btn-block">
            Start Colouring Here!
        </Link>
        <p>
        <img src="images/supporter-logos.png" alt="Colouring London collaborating organisations: The Bartlett UCL, Ordnance Survey, Historic England, Greater London Authority" />
        </p>
    </div>
);

export default Welcome;
