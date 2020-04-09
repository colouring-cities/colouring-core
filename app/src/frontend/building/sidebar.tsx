import React from 'react';

import './sidebar.css';

const Sidebar: React.FC<{}> = (props) => (
    <div id="sidebar" className="info-container">
        { props.children }
    </div>
);

export default Sidebar;
