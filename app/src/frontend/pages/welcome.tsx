import React from 'react';
import { Link } from 'react-router-dom';

import { CCConfig } from '../../cc-config';
let config: CCConfig = require('../../cc-config.json')

import Categories from '../building/categories';
import './welcome.css';

import { t } from 'i18next';

const Welcome = () => (
    <div className="section-body welcome">
        <Categories mode="view"/>
        <h1 className="h2">{t(Welcome to Colouring)} {config.cityName}!</h1>
        <p>

            Colouring {config.cityName} is a free knowledge exchange platform designed to provide over fifty types
            of open data on buildings in the city, to help make the city more sustainable.

        </p>
        <p>
            {config.projectBlurb}&nbsp;
            The Colouring Cities Research Programme (CCRP), led by the Alan Turing Institute,
            involves <a href="https://github.com/colouring-cities/colouring-cities.github.io">an international consortium of academic institutions</a> involved
            in building research. Our aim is to maximise accessibility to building-level data across countries, 
            to help improve stock quality, efficiency, sustainability and resilience and meet net-zero goals.
        </p>
        <p>
            New data and features are added all the time. We are keen to engage as many people as possible in platform development. Whether you are a resident, 
            or a stakeholder in academia, government, industry or the third sector, any help you can give colouring in our Colouring Cities maps, 
            and enriching and verifying our open databases with your knowledge, is greatly appreciated.
        </p>
        <p>
            All our <Link to="/data-extracts.html">data</Link> and <a href="https://github.com/colouring-cities/colouring-core">code</a> are 
            free to download, use and share under our open licence terms. 
            Our <a href="https://github.com/colouring-cities/manual/wiki">open manual</a> also provides non-technical information on the CCRP for anyone interested in our research.
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
