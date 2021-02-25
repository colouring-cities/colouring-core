import React, { Fragment, useState } from "react";

import './data-entry-group.css';

import { DownIcon, RightIcon } from "../../components/icons";

interface DataEntryGroupProps {
    /** Name of the group */
    name: string;
    /** Whether the group should be collapsed initially */
    collapsed?: boolean;
    showCount?: boolean;
}

const DataEntryGroup: React.FunctionComponent<DataEntryGroupProps> = (props) => {
    const {
        collapsed: initialCollapsed = true,
        showCount = true
    } = props;

    const [collapsed, setCollapsed] = useState(initialCollapsed);

    return (
        <Fragment>
            <div className='data-entry-group-header' onClick={() => setCollapsed(!collapsed)}>
                <CollapseIcon collapsed={collapsed} />
                <span className='data-entry-group-title'>
                    {props.name}
                    <span className='data-entry-group-count'>{showCount && ` (${React.Children.count(props.children)} attributes)`}</span>
                </span>
            </div>
            <div className={`data-entry-group-body ${collapsed ? 'collapse' : ''}`}>
                {props.children}
            </div>
        </Fragment>
    );
};

const CollapseIcon: React.FunctionComponent<{collapsed: boolean}> = (props) => (
    <span className="collapse-icon">
        {props.collapsed ?  <RightIcon/> : <DownIcon/>}
    </span>
);

export {
    DataEntryGroup
};
