import React from 'react';

import './legend.css';


const LEGEND_CONFIG = {
    location: [
        { color: '#f0f9e8', text: '>5' },
        { color: '#bae4bc', text: '4' },
        { color: '#7bccc4', text: '3' },
        { color: '#43a2ca', text: '2' },
        { color: '#0868ac', text: '1' }
    ],
    age: [
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
    ],
    size: [
        { color: '#ffffcc', text: '≥20' },
        { color: '#ffeda0', text: '15-20' },
        { color: '#fed976', text: '10–15' },
        { color: '#feb24c', text: '6–10' },
        { color: '#fd8d3c', text: '5' },
        { color: '#fc4e2a', text: '4' },
        { color: '#e31a1c', text: '3' },
        { color: '#bd0026', text: '2' },
        { color: '#800026', text: '1' },
    ],
    like: [
        { color: '#f65400', text: 'We like these buildings 👍 🎉 +1' },
    ]
};

const Legend = (props) => {
    let elements = LEGEND_CONFIG[props.slug];
    return (
        <dl className="data-list">
            <dt>
                { props.title }
            </dt>
            <dd>
                <ul className="data-legend">
                {
                    elements.map((data_item) => (
                        <LegendItem {...data_item} key={data_item.color} />
                    ))
                }
                </ul>
            </dd>
        </dl>
    );
}

const LegendItem = (props) => (
    <li>
        <span className="key" style={ { background: props.color } }>-</span>
        { props.text }
    </li>
);

export default Legend;
