import React from 'react';
import { Link } from 'react-router-dom';
import './logo.css';

/**
 * Logo
 *
 * As link to homepage, used in top header
 */
const Logo: React.FunctionComponent  = () => (
    <Link to="/" className="logo navbar-brand" id="top">
        <LogoGrid />
        <h1 className="logotype">
            <span>Colouring</span>
            <span>London</span>
        </h1>
    </Link>
);

/**
 * MinorLogo
 *
 * As plain logo, used in legend
 */
const MinorLogo: React.FunctionComponent = () => (
    <div className="logo">
        <LogoGrid />
        <h3 className="h3 logotype">
            <span>Colouring</span>
            <span>London</span>
        </h3>
    </div>
)

const LogoGrid: React.FunctionComponent = () => (
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
)

export { Logo, MinorLogo };
