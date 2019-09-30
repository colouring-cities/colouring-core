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

export { Logo };
