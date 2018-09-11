import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import Sidebar from './sidebar';

const data_map = [
    {
        slug: 'date_year',
        label: 'Age',
        elements: [
            {
                slug: 'date_year',
                label: 'Year Built',
                elements: [
                    { color: '#f0eaba', text: '≥2000' },
                    { color: '#fae269', text: '1980-2000' },
                    { color: '#fbaf27', text: '1960-1980' },
                    { color: '#e6711d', text: '1940-1960' },
                    { color: '#d73d3a', text: '1920-1940' },
                    { color: '#ba221c', text: '1900-1920' },
                    { color: '#bb859b', text: '1880-1900' },
                    { color: '#8b3654', text: '1860-1880' },
                    { color: '#8f5385', text: '1840-1860' },
                    { color: '#56619b', text: '1820-1840' },
                    { color: '#6793b2', text: '1800-1820' },
                    { color: '#83c3b3', text: '1780-1800' },
                    { color: '#adc88f', text: '1760-1780' },
                    { color: '#83a663', text: '1740-1760' },
                    { color: '#77852d', text: '1720-1740' },
                    { color: '#69814e', text: '1700-1720' },
                    { color: '#d0c291', text: '1680-1700' },
                    { color: '#918158', text: '1660-1680' },
                    { color: '#7a5732', text: '<1660' },
                ]
            }
        ]
    },
    {
        slug: 'size_storeys',
        label: 'Size',
        elements: [
            {
                slug: 'size_storeys',
                label: 'Number of storeys',
                elements: [
                    { color: '#ffc584', text: '≥20' },
                    { color: '#f46259', text: '10-20' },
                    { color: '#da456a', text: '5-10' },
                    { color: '#a8327d', text: '4' },
                    { color: '#7c2383', text: '3' },
                    { color: '#5b167f', text: '2' },
                    { color: '#360f69', text: '1' },
                ]
            }
        ]
    }
];

const LegendItem = (props) => (
    <li>
        <span className="key" style={ { background: props.color } }>-</span>
        { props.text }
    </li>
);

const LegendSection = (props) => (
    <Fragment>
        <dt>
            <Link to={`/map/${ props.slug }.html`}>{ props.label }</Link>
        </dt>
        <dd>
            <ul className="data-legend">
                { props.children }
            </ul>
        </dd>
    </Fragment>
);

const LegendGroup = (props) => (
    <div className="data-section">
        <Link to={`/map/${ props.slug }.html`}>
            <h3 className={`h3 bullet-prefix ${ props.slug }`}>{ props.label }</h3>
        </Link>
        <dl className="data-list">
            { props.children }
        </dl>
    </div>
);

class Legend extends Component {
    render() {
        var data_layer = undefined;
        if (this.props.match && this.props.match.params && this.props.match.params.map) {
            data_layer = this.props.match.params.map;
        }

        return (
            <Sidebar title="Maps">
                {
                    data_map.map((data_group) => (
                        <LegendGroup {...data_group} key={data_group.slug}>
                            {
                                ( data_layer.match(data_group.slug) )
                                ? data_group.elements.map((data_section) => (
                                    <LegendSection {...data_section} key={data_section.slug}>
                                        {
                                            ( data_layer.match(data_section.slug) )
                                            ? data_section.elements.map((data_item) => (
                                                <LegendItem {...data_item} key={data_item.color} />
                                            ))
                                            : null
                                        }
                                    </LegendSection>
                                ))
                                : null
                            }
                        </LegendGroup>
                    ))
                }
            </Sidebar>
        );
    }
}

export default Legend;
