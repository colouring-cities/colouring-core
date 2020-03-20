import React from 'react';

import './legend.css';

import { DownIcon, UpIcon } from '../components/icons';
import { Logo } from '../components/logo';

const LEGEND_CONFIG = {
    location: {
        title: 'Location',
        description: '% data collected',
        elements: [
            { color: '#084081', text: '≥80%' },
            { color: '#0868ac', text: '60–80%' },
            { color: '#43a2ca', text: '40–60%' },
            { color: '#7bccc4', text: '20–40%' },
            { color: '#bae4bc', text: '<20%' }
        ]
    },
    use: {
        title: 'Land Use',
        elements: [
            { color: '#4a54a6', text: 'Residential' },
            { color: '#e5050d', text: 'Mixed Use' },
            { color: '#ff8c00', text: 'Retail' },
            { color: '#f5f58f', text: 'Industry And Business' },
            { color: '#73ccd1', text: 'Community Services' },
            { color: '#ffbfbf', text: 'Recreation And Leisure' },
            { color: '#b3de69', text: 'Transport' },
            { color: '#cccccc', text: 'Utilities And Infrastructure' },
            { color: '#898944', text: 'Defence' },
        ]
    },
    type: {
        title: 'Type',
        elements: [
            { color: "#f2a2b9", text: "Detached" },
            { color: "#ab8fb0", text: "Semi-Detached" },
            { color: "#3891d1", text: "End-Terrace" },
            { color: "#226291", text: "Mid-Terrace" }
        ]
    },
    age: {
        title: 'Age',
        elements: [
            { color: '#f0eaba', text: '≥2000' },
            { color: '#fae269', text: '1980–2000' },
            { color: '#fbaf27', text: '1960–1980' },
            { color: '#e6711d', text: '1940–1960' },
            { color: '#d73d3a', text: '1920–1940' },
            { color: '#ba221c', text: '1900–1920' },
            { color: '#bb859b', text: '1880–1900' },
            { color: '#8b3654', text: '1860–1880' },
            { color: '#8f5385', text: '1840–1860' },
            { color: '#56619b', text: '1820–1840' },
            { color: '#6793b2', text: '1800–1820' },
            { color: '#83c3b3', text: '1780–1800' },
            { color: '#adc88f', text: '1760–1780' },
            { color: '#83a663', text: '1740–1760' },
            { color: '#77852d', text: '1720–1740' },
            { color: '#69814e', text: '1700–1720' },
            { color: '#d0c291', text: '1680–1700' },
            { color: '#918158', text: '1660–1680' },
            { color: '#7a5732', text: '<1660' },
        ]
    },
    size: {
        title: 'Height to apex',
        elements: [
            { color: '#f7f4f9', text: '0-5.55'},
            { color: '#e7e1ef', text: '5.55-7.73'},
            { color: '#d4b9da', text: '7.73-11.38'},
            { color: '#c994c7', text: '11.38-18.45'},
            { color: '#df65b0', text: '18.45-35.05'},
            { color: '#e7298a', text: '35.05-89.30'},
            { color: '#ce1256', text: '89.30-152'},
            { color: '#980043', text: '≥152'}
        ]
    },
    construction: {
        title: 'Construction',
        elements: []
    },
    team: {
        title: 'Team',
        elements: []
    },
    sustainability: {
        title: 'Sustainability',
        description: 'DEC Rating',
        elements: [
            { color: "#007f3d", text: 'A' },
            { color: "#2c9f29", text: 'B' },
            { color: "#9dcb3c", text: 'C' },
            { color: "#fff200", text: 'D' },
            { color: "#f7af1d", text: 'E' },
            { color: "#ed6823", text: 'F' },
            { color: "#e31d23", text: 'G' },
        ]
    },
    streetscape: {
        title: 'Streetscape',
        elements: []
    },
    planning: {
        title: 'Planning',
        elements: [
            { color: '#73ebaf', text: 'within conservation area' },
        ]
    },
    community: {
        title: 'Community',
        elements: []
    },
    like: {
        title: 'Like Me',
        elements: [
            { color: '#bd0026', text: '👍👍👍👍 100+' },
            { color: '#e31a1c', text: '👍👍👍 50–99' },
            { color: '#fc4e2a', text: '👍👍 20–49' },
            { color: '#fd8d3c', text: '👍👍 10–19' },
            { color: '#feb24c', text: '👍 3–9' },
            { color: '#fed976', text: '👍 2' },
            { color: '#ffe8a9', text: '👍 1'}
        ]
    }
};


interface LegendProps {
    slug: string;
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
        const details = LEGEND_CONFIG[this.props.slug] || {};
        const title = details.title || "";
        const elements = details.elements || [];

        return (
            <div className="map-legend">
                <Logo variant='gray' />
                <h4 className="h4">
                    { title }
                </h4>
                {
                    elements.length > 0 ?
                        <button className="expander-button btn btn-outline-secondary btn-sm" type="button" onClick={this.handleClick} >
                            {
                                this.state.collapseList ?
                                    <UpIcon /> :
                                    <DownIcon />
                            }
                        </button> :
                        null
                }
                {
                    details.description?
                        <p>{details.description} </p>
                        : null
                }
                {
                    elements.length?
                        <ul className={this.state.collapseList ? 'collapse data-legend' : 'data-legend'} >
                            {
                                elements.map((item) => (

                                       <li key={item.color} >
                                            <span className="key" style={ { background: item.color } }>-</span>
                                            { item.text }
                                       </li>

                                ))
                            }
                        </ul>
                        : <p className="data-intro">Coming soon…</p>
                }
            </div>
        );

    }

}

export default Legend;
