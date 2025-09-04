import React from 'react';
import { Link } from 'react-router-dom';

import { CCConfig } from '../../cc-config';
let config: CCConfig = require('../../cc-config.json')

import Categories from '../building/categories';
import './welcome.css';

const Welcome = () => (
    <div className="section-body welcome">
        <Categories mode="view"/>
        <h1 className="h3">Welcome to Colouring {config.cityName}!</h1>
        <p>

            Colouring {config.cityName}  is a research-led, free public resource, providing open spatial data 
            on {config.cityName}'s buildings and natural environment. It is also an open knowledge initiative, built collectively by, 
            and for, academia, communities, government, industry and the third sector. 
            Any information you can add to our open platform is greatly appreciated.
            New data and features are added all the time.
        </p>
        <p>
            Colouring {config.cityName} is managed by {config.institution}.
            It forms part of the <a href="https://colouringcities.org/">Colouring Cities Research Programme</a> (CCRP), which brings together academic institutions worldwide, interested in co-working on a global network
            of interoperable open data platforms. These provide spatial data on buildings, and the built and natural infrastructure, and support cross-sector knowledge and resource sharing.
            The CCRP works to improve environmental quality, resilience and sustainability, and to accelerate progress towards net zero, and other United Nations Sustainable Development Goals.
            It is overseen by an informal international academic consortium, made up of representatives from CCRP expert groups and Global Hubs.
        </p>
        <p>
            All data collected (e.g <a href="/data-extracts.html">data-extracts</a>) 
            and <a href="https://github.com/colouring-cities/colouring-core">code</a> are free to download, 
            use and share under open licence terms. Our <a href="https://github.com/colouring-cities/manual/wiki">
            open manual</a> provides non-technical information for anyone interested in our research. We also have a <a href="https://github.com/colouring-cities/ccrp-technical-manual/wiki">Technical Manual</a>, and an <a href="https://colouringcities.org/impact-studies">Impact Studies Section</a> which shows how the data from the platform can be used.
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
