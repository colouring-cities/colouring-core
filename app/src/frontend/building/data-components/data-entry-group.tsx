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

    function setGroupCollapsed(collapsed): void {

        if (collapsed==false) {
            let elems = document.getElementsByClassName("data-entry-group-body");
            
            for (let i = 0; i < elems.length; i++) {
                const elem = elems[i];

                if (elem instanceof HTMLElement) {
                    elem.classList.add("collapse");
                }
            }
        }
        
        setCollapsed(collapsed);
    }

    return (
        <Fragment>
            <div className='data-entry-group-header' onClick={() => setGroupCollapsed(!collapsed)}>
                <CollapseIcon collapsed={collapsed} />
                <span className='data-entry-group-title'>
                    {props.name}
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
