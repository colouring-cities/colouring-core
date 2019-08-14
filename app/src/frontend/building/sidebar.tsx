import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './sidebar.css';
import { BackIcon } from '../components/icons';

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

Sidebar.propTypes = {
    back: PropTypes.string,
    title: PropTypes.string.isRequired,
    children: PropTypes.node
}

export default Sidebar;
