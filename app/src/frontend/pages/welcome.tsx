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

            Colouring {config.cityName}  is a research-led, free public resource, providing open spatial data 
            on {config.cityName}'s buildings. It is also an open knowledge initiative, built collectively by, 
            and for, academia, communities, government, industry and the third sector. 
            Any information you can add to our open platform is greatly appreciated.

        </p>
        <p>
            Colouring {config.cityName} forms part of the <a href="https://colouringcities.org/">Colouring Cities Research Programme</a> (CCRP), 
            managed in {config.cityName} by {config.institution}. The CCRP allows international academic institutions to co-work on a global network 
            of interoperable open data platforms on national building stocks, and to accelerate sharing of resources and expertise. 
            The CCRP's overall aim is to help improve the quality, efficiency, resilience and sustainability of buildings, 
            and urban areas, and to accelerate the move to net zero in line with United Nations Sustainable Development Goals.
        </p>
        <p>
            New data and features are added all the time. We are keen to engage as many people as possible in platform development. 
            Whether you are a resident, or a stakeholder in academia, government, industry or the third sector, any help you can give 
            colouring in our Colouring Cities maps, and enriching and verifying our open databases with your knowledge, is greatly appreciated.
        </p>
        <p>
            All data collected (e.g <a href="/data-extracts.html">data-extracts</a>) 
            and <a href="https://github.com/colouring-cities/colouring-core">code</a> are free to download, 
            use and share under open licence terms. Our <a href="https://github.com/colouring-cities/manual/wiki">
            open manual</a> provides non-technical information for anyone interested in our research.
            We also have an <a href="https://colouringcities.org/impact-studies">impact studies showcase</a>.
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
        </div>
    </div>
);

export default Welcome;
