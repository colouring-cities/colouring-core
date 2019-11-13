import React, { Component } from 'react';

import { InfoIcon } from './icons';

import './tooltip.css';

interface TooltipProps {
    text: string;
}

interface TooltipState {
    active: boolean;
}

class Tooltip extends Component<TooltipProps, TooltipState> {
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
        return (
            <div className="tooltip-wrap">
                <button className={(this.state.active? 'active ': '') + 'tooltip-hint icon-button'}
                    title={this.props.text}
                    onClick={this.handleClick}>
                    Hint
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
