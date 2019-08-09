import React from 'react';
import { Link } from 'react-router-dom';
import './logo.css';

/**
 * Logo
 */
const Logo = () => (
    <Link to="/" className="logo navbar-brand" id="top">
        <div className="grid">
            <div className="row">
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
            </div>
            <div className="row">
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
            </div>
            <div className="row">
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
            </div>
        </div>
        <h1 className="logotype">
            <span>Colouring</span>
            <span>London</span>
        </h1>
    </Link>
);

export default Logo;
