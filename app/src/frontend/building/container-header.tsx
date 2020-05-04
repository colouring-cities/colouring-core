import React from 'react';

interface ContainerHeaderProps {
    cat?: string;
    backLink: string;
    title: string;
}

const ContainerHeader: React.FunctionComponent<ContainerHeaderProps> = (props) => (
    <header className={`section-header view ${props.cat ? props.cat : ''} ${props.cat ? `background-${props.cat}` : ''}`}>
        <h2 className="h2">{props.title}</h2>
        <nav className="icon-buttons">
            {props.children}
        </nav>
    </header>
);

export default ContainerHeader;
