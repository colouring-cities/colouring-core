import React, { Component } from 'react';

import './tooltip.css';
import { InfoIcon } from './icons';

class Tooltip extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        event.preventDefault();
        this.setState({
            active: !this.state.active
        });
    }

    render() {
        console.log(this.state, this.props)
        return (
            <div className="tooltip-wrap">
                <button className={(this.state.active? "active ": "") + "tooltip-hint icon-button"} title={this.props.text}
                        onClick={this.handleClick}>
                    <InfoIcon />
                </button>
                {
                    this.state.active?
                    (
                        <div className="tooltip bs-tooltip-bottom">
                            <div className="arrow"></div>
                            <div className="tooltip-inner">{this.props.text}</div>
                        </div>
                    )
                    : null
                }
            </div>
        );
    }
}
export default Tooltip;
