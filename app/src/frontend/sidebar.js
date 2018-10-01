import React from 'react';
import { Link } from 'react-router-dom';

import './sidebar.css';
import { BackIcon } from './icons';

const Sidebar = (props) => (
    <div id="legend" className="info-container">
        <header className="sidebar-header">
            {
                props.back?
                    <Link className="icon-button back" to={props.back}>
                        <BackIcon />
                    </Link>
                : null
            }
            <h2 className="h2">{props.title}</h2>
        </header>
        {props.children}
    </div>
);

export default Sidebar;
