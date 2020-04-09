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
            { color: '#f5f58f', text: 'Industry & Business' },
            { color: '#73ccd1', text: 'Community Services' },
            { color: '#ffbfbf', text: 'Recreation & Leisure' },
            { color: '#b3de69', text: 'Transport' },
            { color: '#cccccc', text: 'Utilities & Infrastructure' },
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
            { color: '#fff9b8', text: '>2020' },
            { color: '#fae269', text: '2000-2019' },
            { color: '#fbaf27', text: '1980-1999' },
            { color: '#e6711d', text: '1960-1979' },
            { color: '#cc1212', text: '1940-1959' },
            { color: '#8f0303', text: '1920-1939' },
            { color: '#8f5385', text: '1900-1919' },
            { color: '#c3e1eb', text: '1880-1899' },
            { color: '#6a9dba', text: '1860-1879' },
            { color: '#3b74a3', text: '1840-1859' },
            { color: '#95ded8', text: '1820-1839' },
            { color: '#68aba5', text: '1800-1819' },
            { color: '#acc98f', text: '1750-1799' },
            { color: '#6d8a51', text: '1700-1749' },
            { color: '#d0c291', text: '<1700' },
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
        title: 'Statutory protections',
        disclaimer: 'All data relating to designated buildings should be checked on the National Heritage List for England or local authority websites where used for planning or development purposes',
        elements: [
            { color: '#95beba', text: 'In conservation area'},
            { color: '#c72e08', text: 'Grade I listed'}, 
            { color: '#e75b42', text: 'Grade II* listed'}, 
            { color: '#ffbea1', text: 'Grade II listed'},
            { color: '#858ed4', text: 'Locally listed'}, 
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
                                details.disclaimer &&
                                    <p className='legend-disclaimer'>{details.disclaimer}</p>
                            }
                            {
                                elements.map((item) => (

                                       <li key={item.color} >
                                            <span className="key" style={ { background: item.color, border: item.border } }>-</span>
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
