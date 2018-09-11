import React from 'react';

import './tooltip.css';

const Tooltip = (props) => (
    <span className="tooltip-hook" data-toggle="tooltip">
        ?
        <div className="tooltip bs-tooltip-bottom">
            <div className="arrow"></div>
            <div className="tooltip-inner">{props.text}</div>
        </div>
    </span>
);

export default Tooltip;
