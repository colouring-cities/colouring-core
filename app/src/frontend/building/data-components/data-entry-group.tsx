import React, { Fragment } from "react";

import './data-entry-group.css';
import { RightIcon, DownIcon } from "../../components/icons";

interface DataEntryProps {
    name: string;
}

interface DataEntryState {
    collapsed: boolean;
}

class DataEntryGroup extends React.Component<DataEntryProps, DataEntryState> {
    constructor(props) {
        super(props);

        this.state = {
            collapsed: true
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState((state) => ({
            collapsed: !state.collapsed
        }));
    }

    render() {
        return (
            <Fragment>
                <div className='data-entry-group-header' onClick={this.toggle}>
                    <CollapseIcon collapsed={this.state.collapsed} />
                    <span className='data-entry-group-title'>{this.props.name}</span>
                </div>
                <div className={`data-entry-group-body ${this.state.collapsed ? 'collapse' : ''}`}>
                    {this.props.children}
                </div>
            </Fragment>
        );
    }
}

const CollapseIcon: React.FunctionComponent<{collapsed: boolean}> = (props) => (
    <span className="collapse-icon">
        {props.collapsed ?  <RightIcon/> : <DownIcon/>}
    </span>
);

export {
    DataEntryGroup
};
