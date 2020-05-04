import React, { useState, Fragment } from 'react';

import './sidebar.css';
import { BackIcon, ForwardIcon } from '../components/icons';

const Sidebar: React.FC<{}> = (props) => {
    const [collapsed, setCollapsed] = useState(true);

    return (
        <Fragment>
        <div id="sidebar" className={"info-container " + (collapsed? "offscreen": "")}>
            <button className="info-container-collapse btn btn-light"
                onClick={() => setCollapsed(!collapsed)}
                >
                {
                    collapsed?
                        <ForwardIcon />
                        : <BackIcon />
                }
            </button>
            <div className="info-container-inner">
                { props.children }
            </div>
        </div>
        </Fragment>
    );
}

export default Sidebar;
