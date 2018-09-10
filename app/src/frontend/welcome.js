import React from 'react';
import { Link } from 'react-router-dom';

import './welcome.css';

const Welcome = () => (
    <div className="jumbotron welcome-float">
        <h1 className="h1">Welcome to Colouring London</h1>
        <p className="lead">Colour in, view and download data on London's buildings</p>
        <Link to="/map/date_year.html"
              className="btn btn-outline-dark btn-lg btn-block">
            Start Colouring
        </Link>
    </div>
);

export default Welcome;
