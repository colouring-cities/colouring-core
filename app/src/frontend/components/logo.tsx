import React from 'react';

import './logo.css';

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
                <span>London</span>
            </h1>
        </div>
    );
};

const LogoGrid: React.FunctionComponent = () => (
    <div className="grid">
        <div className="row">
            <div className="cell background-location"></div>
            <div className="cell background-use"></div>
            <div className="cell background-type"></div>
            <div className="cell background-age"></div>
        </div>
        <div className="row">
            <div className="cell background-size"></div>
            <div className="cell background-construction"></div>
            <div className="cell background-streetscape"></div>
            <div className="cell background-team"></div>
        </div>
        <div className="row">
            <div className="cell background-sustainability"></div>
            <div className="cell background-community"></div>
            <div className="cell background-planning"></div>
            <div className="cell background-like"></div>
        </div>
    </div>
);

export { Logo };
