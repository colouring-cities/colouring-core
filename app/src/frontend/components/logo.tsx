import React from 'react';
import './logo.css';

import { CCConfig } from '../../cc-config';
let config: CCConfig = require('../../cc-config.json')

interface LogoProps {
    variant: 'default' | 'animated' | 'gray';
}

/**
 * Logo
 *
 * As link to homepage, used in top header
 */
const Logo: React.FunctionComponent<LogoProps> = (props) => {
    const variantClass = props.variant === 'default' ? '' : props.variant;
    return (
        <div className={`logo ${variantClass}`} >
            <LogoGrid />
            <h1 className="logotype">
                <span>Colouring</span>
                <span>{config.cityName}</span>
            </h1>
        </div>
    );
};

const LogoGrid: React.FunctionComponent = () => (
    <div className="grid">
        <div className="row">
            <div className="cell background-location"></div>
            <div className="cell background-land-use"></div>
            <div className="cell background-typology-size"></div>
            <div className="cell background-construction-design"></div>
        </div>
        <div className="row">
            <div className="cell background-age-history"></div>
            <div className="cell background-planning-conservation"></div>
            <div className="cell background-retrofit-condition"></div>
            <div className="cell background-energy-performance"></div>
        </div>
        <div className="row">
            <div className="cell background-water-green-infrastructure"></div>
            <div className="cell background-urban-infrastructure"></div>
            <div className="cell background-disaster-management"></div>
            <div className="cell background-community"></div>
        </div>
    </div>
);

export { Logo };
