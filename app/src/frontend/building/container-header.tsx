import React from 'react';
import { Link } from 'react-router-dom';

import { BackIcon }from '../components/icons';

interface ContainerHeaderProps {
    cat?: string;
    backLink: string;
    title: string;
}

const ContainerHeader: React.FunctionComponent<ContainerHeaderProps> = (props) => (
    <header className={`section-header view ${props.cat ? props.cat : ''} ${props.cat ? `background-${props.cat}` : ''}`}>
        <Link className="icon-button back" to={props.backLink}>
            <BackIcon />
        </Link>
        <h2 className="h2">{props.title}</h2>
        <nav className="icon-buttons">
            {props.children}
        </nav>
    </header>
);

export default ContainerHeader;
