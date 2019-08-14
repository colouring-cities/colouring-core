import React, { Fragment } from 'react';

import withCopyEdit from '../data-container';
import DataEntry from '../data-components/data-entry';

/**
* Sustainability view/edit section
*/
const SustainabilityView = (props) => (
    <Fragment>
        <p className="data-intro">{props.intro}</p>
        <ul>
            <li>Energy Performance Certificate (EPC) rating</li>
            {
                // "disabled": true,
                // "slug": "sustainability_epc_band_current",
                // "type": "text_list",
                // "options": ["A", "B", "C", "D", "E", "F", "G"]
            }
            <li>Display Energy Certificate (DEC)</li>
            {
                // "disabled": true,
                // "slug": "sustainability_dec_band_current",
                // "type": "text_list",
                // "options": ["A", "B", "C", "D", "E", "F", "G"]
            }
            <li>BREEAM Rating</li>
            {
                // "disabled": true,
                // "slug": "sustainability_breeam_rating",
                // "type": "number",
                // "step": 1
            }
            <li>Year of last significant retrofit</li>
            {
                // "disabled": true,
                // "slug": "sustainability_last_retrofit_date",
                // "type": "number",
                // "step": 1
            }
            <li>Embodied carbon estimation (for discussion)</li>
            {
                // "slug": "sustainability_embodied_carbon",
                // "type": "text",
                // "disabled": true
            }
            <li>Adaptability/repairability rating (for discussion)</li>
            {
                // "slug": "sustainability_adaptability_rating",
                // "type": "text",
                // "disabled": true
            }
            <li>Expected lifespan (for discussion)</li>
            {
                // "slug": "sustainability_expected_lifespan",
                // "type": "number",
                // "step": 1,
                // "disabled": true
            }
        </ul>
    </Fragment>
)
const SustainabilityContainer = withCopyEdit(SustainabilityView);

export default SustainabilityContainer;
