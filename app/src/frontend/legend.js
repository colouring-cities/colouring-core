import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

import Sidebar from './sidebar';
import { HelpIcon } from './icons';
import './legend.css';

import CONFIG from './fields-config.json';


const LEGEND_CONFIG = {
    age: [
        {
            title: 'Year Built',
            slug: 'date_year',
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
        }
    ],
    size: [
        {
            title: 'Number of storeys',
            slug: 'size_storeys',
            elements: [
                { color: '#ffc584', text: '≥20' },
                { color: '#f46259', text: '10–20' },
                { color: '#da456a', text: '5–10' },
                { color: '#a8327d', text: '4' },
                { color: '#7c2383', text: '3' },
                { color: '#5b167f', text: '2' },
                { color: '#360f69', text: '1' },
            ]
        }
    ],
    like: [
        {
            title: 'Which buildings do you like?',
            slug: 'like',
            elements: [
                { color: '#f65400', text: 'We like these buildings 👍 🎉 +1' },
            ]
        }
    ]
};


const Legend = (props) => {
    var data_layer = undefined;
    if (props.match && props.match.params && props.match.params.map) {
        data_layer = props.match.params.map;
    }

    return (
        <Sidebar title="Maps">
            <p className="data-intro">Click on the map to see more information about a building&hellip;</p>
            {
                CONFIG.map((data_group) => (
                    <LegendGroup {...data_group} maps={LEGEND_CONFIG[data_group.slug]}
                        data_layer={data_layer} key={data_group.slug} />
                ))
            }
        </Sidebar>
    );
}

const LegendGroup = (props) => {
    const match = props.data_layer === props.slug;
    const inactive = props.inactive || !props.maps;
    return (
        <section className={(inactive? "inactive ": "") + "data-section legend"}>
            <header className="bullet-prefix section-header">
                <NavLink
                    to={`/map/${props.slug}.html`}
                    isActive={() => match}>
                    <h3 className="h3">{props.title}</h3>
                </NavLink>
                {
                    props.help?
                    <nav className="icon-buttons">
                        <a className="icon-button help" title="Find out more" href={props.help} target="_blank" rel="noopener noreferrer">
                            <HelpIcon />
                        </a>
                    </nav>
                    : null
                }
            </header>
            { (match && props.intro)? <p className="data-intro">{ props.intro }</p> : null }
            <dl className="data-list">
            {
                (match && props.maps)?
                props.maps.map((data_section) => (
                    <LegendSection {...data_section} key={data_section.slug}>
                    {
                        data_section.elements.map((data_item) => (
                            <LegendItem {...data_item} key={data_item.color} />
                        ))
                    }
                    </LegendSection>
                ))
                : null
            }
            </dl>
        </section>
    )
};

const LegendSection = (props) => (
    <Fragment>
        <dt>
            { props.title }
        </dt>
        <dd>
            <ul className="data-legend">
                { props.children }
            </ul>
        </dd>
    </Fragment>
);

const LegendItem = (props) => (
    <li>
        <span className="key" style={ { background: props.color } }>-</span>
        { props.text }
    </li>
);

export default Legend;
