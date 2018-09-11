import React from 'react';

import './sidebar.css';

const Sidebar = (props) => (
    <div id="legend" className="info-container">
        <h2 className="h2">{props.title}</h2>
        {props.children}
    </div>
);

export default Sidebar;
