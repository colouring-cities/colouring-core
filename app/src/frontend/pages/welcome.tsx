import React from 'react';
import { Link } from 'react-router-dom';

import './welcome.css';

const Welcome = () => (
    <div className="jumbotron welcome-float">
        <h1 className="h1">Welcome to Colouring London</h1>

        <p className="lead">
        Colouring London is a knowledge exchange platform collecting information on every
        building in London, to help make the city more sustainable. We&rsquo;re building it at The
        Bartlett Centre for Advanced Spatial Analysis, University College London. We're still at an early stage of development. Please help us by providing feedback on the site as we create it.
        </p>
        <p className="lead">
            We collect our building data from many sources. Though we are unable to vouch for their accuracy, we are currently experimenting with a range of features including 'data source', 'edit history', and 'entry verification', to assist you in checking reliability and judging how suitable the data are for your intended use.
        </p>
        <p className="lead">
        All of the data we collect is made <Link to="/data-extracts.html">openly available</Link>. We just ask you to credit Colouring London and read our <a href="https://www.pages.colouring.london/data-ethics">data ethics policy</a>  when using or sharing our data and maps.
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
