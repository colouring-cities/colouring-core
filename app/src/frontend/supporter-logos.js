import React, { Fragment } from 'react';

import './supporter-logos.css';

const SupporterLogos = () => (
    <Fragment>
        <h2 className="h3">Lead Organisation and Project Partners</h2>
        <ul className="logo-list">
            <li>
                <a href="https://www.ucl.ac.uk/bartlett/casa/">
                    <img src="images/logo-casa.png"
                        alt="Centre for Advanced Spatial Analysis (CASA)" />
                </a>
            </li>
            <li>
                <a href="https://www.ucl.ac.uk/">
                    <img src="images/logo-ucl.png"
                        alt="University College London" />
                </a>
            </li>
            <li>
                <a href="https://www.historicengland.org.uk/">
                    <img src="images/logo-he.png"
                        alt="Historic England" />
                </a>
            </li>
            <li>
                <a href="https://www.ordnancesurvey.co.uk/">
                    <img src="images/logo-os.png"
                        alt="Ordnance Survey" />
                </a>
            </li>
            <li>
                <a href="https://www.london.gov.uk/">
                    <img src="images/logo-gla.png"
                        alt="Supported by the Mayor of London" />
                </a>
            </li>
        </ul>
    </Fragment>
);

export default SupporterLogos;
