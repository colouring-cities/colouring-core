import React from 'react';

const Legend = () => (
    <div id="legend" className="info-container">
        <h2 className="h2">Maps</h2>
        <div className="data-section">
            <h3 className="h3 bullet-prefix age toggled-on"
                data-toggle="collapse"
                data-target="#data-list-age">Age</h3>
            <dl id="data-list-age" className="data-list collapse show">
            <dt>
                <a href="/maps/date_year"
                    data-map="date_year">Year Built</a></dt>
            <dd>
                <ul className="data-legend">
                <li>
                    <span className="key" style={{background: '#f0eaba'}}>-</span>
                    &gt;=2000
                </li>
                <li>
                    <span className="key" style={{background: '#fae269'}}>-</span>
                    1980-2000
                </li>
                <li>
                    <span className="key" style={{background: '#fbaf27'}}>-</span>
                    1960-1980
                </li>
                <li>
                    <span className="key" style={{background: '#e6711d'}}>-</span>
                    1940-1960
                </li>
                <li>
                    <span className="key" style={{background: '#d73d3a'}}>-</span>
                    1920-1940
                </li>
                <li>
                    <span className="key" style={{background: '#ba221c'}}>-</span>
                    1900-1920
                </li>
                <li>
                    <span className="key" style={{background: '#bb859b'}}>-</span>
                    1880-1900
                </li>
                <li>
                    <span className="key" style={{background: '#8b3654'}}>-</span>
                    1860-1880
                </li>
                <li>
                    <span className="key" style={{background: '#8f5385'}}>-</span>
                    1840-1860
                </li>
                <li>
                    <span className="key" style={{background: '#56619b'}}>-</span>
                    1820-1840
                </li>
                <li>
                    <span className="key" style={{background: '#6793b2'}}>-</span>
                    1800-1820
                </li>
                <li>
                    <span className="key" style={{background: '#83c3b3'}}>-</span>
                    1780-1800
                </li>
                <li>
                    <span className="key" style={{background: '#adc88f'}}>-</span>
                    1760-1780
                </li>
                <li>
                    <span className="key" style={{background: '#83a663'}}>-</span>
                    1740-1760
                </li>
                <li>
                    <span className="key" style={{background: '#77852d'}}>-</span>
                    1720-1740
                </li>
                <li>
                    <span className="key" style={{background: '#69814e'}}>-</span>
                    1700-1720
                </li>
                <li>
                    <span className="key" style={{background: '#d0c291'}}>-</span>
                    1680-1700
                </li>
                <li>
                    <span className="key" style={{background: '#918158'}}>-</span>
                    1660-1680
                </li>
                <li>
                    <span className="key" style={{background: '#7a5732'}}>-</span>
                    &lt;1660
                </li>
                </ul>
            </dd>
            </dl>
        </div>
        <div className="data-section">
            <h3 className="h3 bullet-prefix size"
                data-toggle="collapse"
                data-target="#data-list-size">Size</h3>
            <dl id="data-list-size" className="data-list collapse">
            <dt>
                <a href="/maps/size_storeys"
                data-map="size_storeys">Number of storeys</a>
            </dt>
            <dd>
                <ul className="data-legend">
                    <li>
                    <span className="key" style={{background: '#ffc584'}}>-</span>
                    &gt;20
                    </li>
                    <li>
                    <span className="key" style={{background: '#f46259'}}>-</span>
                    10-20
                    </li>
                    <li>
                    <span className="key" style={{background: '#da456a'}}>-</span>
                    5-10
                    </li>
                    <li>
                    <span className="key" style={{background: '#a8327d'}}>-</span>
                    4
                    </li>
                    <li>
                    <span className="key" style={{background: '#7c2383'}}>-</span>
                    3
                    </li>
                    <li>
                    <span className="key" style={{background: '#5b167f'}}>-</span>
                    2
                    </li>
                    <li>
                    <span className="key" style={{background: '#360f69'}}>-</span>
                    1
                    </li>

                </ul>
            </dd>
            </dl>
        </div>
        </div>
);

export default Legend;
