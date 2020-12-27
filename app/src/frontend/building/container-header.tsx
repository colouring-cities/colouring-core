import React from 'react';
import { Link } from 'react-router-dom';
import { BackIcon } from '../components/icons';


import './container-header.css';

interface ContainerHeaderProps {
    cat?: string;
    backLink?: string;
    title: string;
}

const ContainerHeader: React.FunctionComponent<ContainerHeaderProps> = (props) => (
    <header className={`section-header view ${props.cat ? props.cat : ''} ${props.cat ? `background-${props.cat}` : ''}`}>
        <h2 className="h2">
            {props.backLink && 
                <Link className="icon-button back" to={props.backLink}>
                    <BackIcon />
                </Link>
            }
            {props.title}
        </h2>
        <nav className="section-header-actions">
            {props.children}
        </nav>
    </header>
);

export default ContainerHeader;
