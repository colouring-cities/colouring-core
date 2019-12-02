import React from 'react';
import { Link } from 'react-router-dom';

import './welcome.css';

const Welcome = () => (
    <div className="jumbotron welcome-float">
        <h1 className="h1">Welcome to Colouring London</h1>

        <p className="lead">
        Colouring London is a knowledge exchange platform collecting information on every
        building in London, to help make the city more sustainable. We're developing it at University College London. Can you help us? We're looking for volunteers of all ages and abilities to help test the site and colour the buildings in.
        </p>
        <p className="lead">
            Our building data comes from many different sources. Though we are unable to vouch for their accuracy, we are currently experimenting with a range of features including 'data source', 'edit history', and 'entry verification', to assist you in checking reliability and judging how suitable the data are for your intended use.
        </p>
        <p className="lead">
            All data we collect are made <Link to="/data-extracts.html">openly available</Link>. We just ask you to credit Colouring London and read our <a href="https://www.pages.colouring.london/data-ethics">data ethics policy</a>  when using or sharing our data, maps or <a href="https://github.com/tomalrussell/colouring-london">code</a>.
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
