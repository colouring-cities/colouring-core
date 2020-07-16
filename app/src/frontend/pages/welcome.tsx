import React from 'react';
import { Link } from 'react-router-dom';

import './welcome.css';

const Welcome = () => (
    <div className="section-body welcome">
        <h1 className="h2">Welcome to Colouring London!</h1>
        <p>

            We collect and provide open data about buildings.

        </p>
        <p>

            Colouring London is a knowledge exchange platform set up by University College
            London. It provides open statistical data about the city's buildings and the
            dynamic behaviour of the stock. We're working to collate, collect, generate,
            and verify over fifty types of data and to visualise many of these datasets.

        </p>
        <p>

            Our information comes from many different sources. As we are unable to vouch for
            data accuracy, we are experimenting with how to present data sources, how data
            are edited over time, and how to ask for data verification, to help you to check
            reliability and judge how suitable the data are for your intended use. Your help
            in checking and adding data is very much appreciated.

        </p>
        <p>

            All data we collect are made <Link to="/data-extracts.html">openly
            available</Link>. We ask you to credit Colouring London and read our <a
            href="https://www.pages.colouring.london/data-ethics">data ethics policy</a> when
            using or sharing our data, maps or <a
            href="https://github.com/colouring-london/colouring-london">code</a>.

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
