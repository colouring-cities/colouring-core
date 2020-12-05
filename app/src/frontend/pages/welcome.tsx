import React from 'react';
import { Link } from 'react-router-dom';

import './welcome.css';

const Welcome = () => (
    <div className="section-body welcome">
        <h1 className="h2">Welcome to Colouring London!</h1>
        <p>

            Colouring London is a free knowledge exchange platform designed to provide over fifty types
            of open data on London buildings, to help make the city more sustainable.

        </p>
        <p>

            Colouring London is also the prototype for the Colouring Cities Research programme
            based at the Alan Turing Institute (the UK's national Institute for data science and artificial intelligence).
            The programme works with local, regional, national and international partners to develop
            open platform code also of relevance to other cities.
        </p>
        <p>
            New datasets and features are added all the time. Any help you can give, colouring-in our building maps,
            and enriching and verifying our open datasets is very much appreciated.
        </p>
        <p>
            All our <Link to="/data-extracts.html">data</Link> and <a href="https://github.com/colouring-london/colouring-london">code</a> are 
            free to download, use and share under our open licence terms.
        </p>
        <Link to="/view/categories"
            className="btn btn-outline-dark btn-lg btn-block">
            Start Colouring Here!
        </Link>
        <div className="image-row">
            <img src="images/logo-cc.jpg" alt="Colouring Cities Research Programme"></img>
            <img src="images/logo-turing.jpg" alt="Alan Turing Institute"></img>
        </div>
        <div className="image-row">
            <img src="images/supporter-logos.png" alt="Colouring London collaborating organisations: The Bartlett UCL, Ordnance Survey, Historic England, Greater London Authority" />
        </div>
    </div>
);

export default Welcome;
