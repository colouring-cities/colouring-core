import React, { Component } from 'react';

import './tooltip.css';

import { InfoIcon } from './icons';

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

        this.toggleVisible = this.toggleVisible.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    
    toggleVisible() {
        this.setState(state => ({
                active: !state.active
        }));
    }

    handleBlur(event) {
        if(!event.currentTarget.contains(event.relatedTarget)) {
        this.setState({
                active: false
        });
    }
    }

    render() {
        return (
            <div className="tooltip-wrap" tabIndex={0} onBlur={this.handleBlur}>
                <button type="button" className={(this.state.active? 'active ': '') + 'tooltip-hint icon-button'}
                    onClick={this.toggleVisible}>
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
