import React from 'react';
import { Link } from 'react-router-dom';

import { CCConfig } from '../../cc-config';
let config: CCConfig = require('../../cc-config.json')

import Categories from '../building/categories';
import './welcome.css';

const Welcome = () => (
    <div className="section-body welcome">
        <Categories mode="view"/>
        <h1 className="h2">Welcome to Colouring {config.cityName}!</h1>
        <p>

            Colouring {config.cityName} is a free knowledge exchange platform designed to provide over fifty types
            of open data on buildings in the city, to help make the city more sustainable.

        </p>
        <p>
            {config.projectBlurb}&nbsp;
            based at the Alan Turing Institute (the UK's national Institute for data science and artificial intelligence).
            The programme works with local, regional, national and international partners to develop
            open platform code also of relevance to other cities.
        </p>
        <p>
            New datasets and features are added all the time. Any help you can give, colouring-in our building maps,
            and enriching and verifying our open datasets is very much appreciated.
        </p>
        <p>
            All our <Link to="/data-extracts.html">data</Link> and <a href="https://github.com/colouring-cities/colouring-core">code</a> are 
            free to download, use and share under our open licence terms. 
            Our <a href="https://github.com/colouring-cities/manual/wiki">open manual</a> provides detailed
            non-technical information on the CCRP, and our international collaborators, 
            for anyone interested in our research.
        </p>
        <Link to="/view/categories"
            className="btn btn-outline-dark btn-lg btn-block">
            Start Colouring Here!
        </Link>
        <div className="image-row">
            <img className="cl-logo" src="images/logo-cc.jpg" alt="Colouring Cities Research Programme"></img>
            <img className="turing-logo" src="images/logo-turing.jpg" alt="Alan Turing Institute"></img>
        </div>
        <div className="image-row">
            <img src="images/supporter-logos.png" alt="Colouring Cities collaborating organisations: The Bartlett UCL, Ordnance Survey, Historic England, Greater London Authority" />
        </div>
        <div className="image-row">
            <img src="images/logo-loughborough.png" alt="Colouring Cities collaborating organisations: Loughborough University" />
            <img src="images/logo-newcastle.png" alt="Colouring Cities collaborating organisations: Newcastle University" />
        </div>
    </div>
);

export default Welcome;
