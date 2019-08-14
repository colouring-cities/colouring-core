import React from 'react';
import PropTypes from 'prop-types';

import './sidebar.css';

const Sidebar = (props) => (
    <div id="sidebar" className="info-container">
        { props.children }
    </div>
);

Sidebar.propTypes = {
    children: PropTypes.node
}

export default Sidebar;
