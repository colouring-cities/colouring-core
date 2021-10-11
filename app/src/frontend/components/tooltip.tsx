import React, { Component } from 'react';

import './tooltip.css';

import { InfoIcon } from './icons';
import Markdown from 'markdown-to-jsx';

interface TooltipProps {
    text: string;
}

interface TooltipState {
    active: boolean;
}

const nonCaptureLingRegex = /\[[^[]+?\]\([^(]+?\)/;
const linkRegex = /\[([^[]+?)\]\(([^(]+?)\)/;

function markdownLinkToAnchor(link: string) {
    const m = link.match(linkRegex);
        return (<a href={m[2]} target="_blank">{m[1]}</a>);
}

function interweave(arr1: any[], arr2: any[]): any[] {
    const commonLen = Math.min(arr1.length, arr2.length);
    const arr = [];
    for(let i=0; i<commonLen; i++) {
        arr.push(arr1[i], arr2[i]);
    }
    arr.push(...arr1.slice(commonLen), ...arr2.slice(commonLen));

    return arr;
}

function tooltipTextToComponents(text: string): any[] {
    let betweenLinks = text.split(nonCaptureLingRegex);
    if(betweenLinks.length <= 1) return [text];
    let links = text.match(new RegExp(linkRegex, 'g')).map(markdownLinkToAnchor);

    return interweave(betweenLinks, links);
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
                                <div className="tooltip-inner">
                                    <Markdown>
                                        {this.props.text}
                                    </Markdown>
                                </div>
                            </div>
                        )
                        : null
                }
            </div>
        );
    }
}

export default Tooltip;
