import React from 'react';
import { Link } from 'react-router-dom';

import './welcome.css';

const Welcome = () => (
    <div className="jumbotron welcome-float">
        <h1 className="h1">Welcome to Colouring London</h1>
        <p className="lead">
            Colouring London is a knowledge exchange platform set up by University College London to help make the city more sustainable. It provides open statistical data on the characteristics of the city's buildings and on the dynamic behaviour of the stock. We're working to collate, collect, generate, verify over fifty types of data and to visualise many of these datasets.
        </p>
        <p className="lead">
           Our information comes from many different sources. As we are unable to vouch for data accuracy, we are currently experimenting with a range of features including 'data source', 'edit history', and 'entry verification', to assist you in checking reliability and judging how suitable the data are for your intended use. Your help in checking and adding data is very much appreciated.
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
