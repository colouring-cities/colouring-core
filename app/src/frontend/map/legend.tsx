import React from 'react';

import './legend.css';

import { DownIcon, UpIcon } from '../components/icons';
import { Logo } from '../components/logo';
import { LegendConfig } from '../config/category-maps-config';

interface LegendProps {
    legendConfig: LegendConfig;
}

interface LegendState {
    collapseList: boolean;
}

class Legend extends React.Component<LegendProps, LegendState> {
    constructor(props) {
        super(props);
        this.state = {collapseList: false};
        this.handleClick = this.handleClick.bind(this);
        this.onResize= this.onResize.bind(this);
    }


    handleClick() {
        this.setState(state => ({
            collapseList: !state.collapseList
        }));
    }


    componentDidMount() {
        window.addEventListener('resize', this.onResize);
        if (window && window.outerHeight) {
            // if we're in the browser, pass in as though from event to initialise
            this.onResize({target: window});
        }
    }


    componentWillUnmount() {
        window.removeEventListener('resize', this.onResize);
    }


    onResize(e) {
        this.setState({collapseList: (e.target.outerHeight < 670 || e.target.outerWidth < 768)});  // magic number needs to be consistent with CSS expander-button media query
    }

    render() {
        const {
            title = undefined,
            elements = [],
            description = undefined,
            disclaimer = undefined
        } = this.props.legendConfig ?? {};

        return (
            <div className="map-legend">
                <Logo variant="default" />
                {
                    title && <h4 className="h4">{title}</h4>
                }
                {
                    elements.length > 0 &&
                        <button className="expander-button btn btn-outline-secondary btn-sm" type="button" onClick={this.handleClick} >
                            {
                                this.state.collapseList ?
                                    <UpIcon /> :
                                    <DownIcon />
                            }
                        </button>
                }
                {
                    description && <p>{description}</p>
                }
                {
                    elements.length === 0 ?
                        <p className="data-intro">Coming soon…</p> :
                        <ul className={this.state.collapseList ? 'collapse data-legend' : 'data-legend'} >
                            {
                                disclaimer && <p className='legend-disclaimer'>{disclaimer}</p>
                            }
                            {
                                elements.map((item) => {
                                    let key: string, 
                                        content: React.ReactElement;
                                        
                                    if('subtitle' in item) {
                                        key = item.subtitle;
                                        content = <h6>{item.subtitle}</h6>;
                                    } else {
                                        key = `${item.text}-${item.color}`;
                                        content = <>
                                            <div className="key" style={ { background: item.color, border: item.border } } />
                                            { item.text }
                                        </>;
                                    }
                                    return (
                                        <li key={key}>
                                            {content}
                                        </li>
                                    );
                                })
                            }
                        </ul>
                }
            </div>
        );

    }

}

export default Legend;
