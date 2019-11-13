import React, { Fragment } from 'react';

import withCopyEdit from '../data-container';

/**
* Construction view/edit section
*/
const ConstructionView = (props) => (
    <Fragment>
        <p className="data-intro">{props.intro}</p>
        <ul>
            <li>Construction system</li>
            {
                // "disabled": true,
                // "slug": "construction_system",
                // "type": "text"
            }
            <li>Primary materials</li>
            {
                // "disabled": true,
                // "slug": "construction_primary_material",
                // "type": "text"
            }
            <li>Secondary materials</li>
            {
                // "disabled": true,
                // "slug": "construction_secondary_material",
                // "type": "text"
            }
            <li>Roofing material</li>
            {
                // "disabled": true,
                // "slug": "construction_roofing_material",
                // "type": "text"
            }
            <li>Percentage of facade glazed</li>
            {
                // "disabled": true,
                // "slug": "construction_facade_percentage_glazed",
                // "type": "number",
                // "step": 5
            }
            <li>BIM reference or link</li>
            {
                // "disabled": true,
                // "slug": "construction_bim_reference",
                // "type": "text",
                // "placeholder": "https://..."
            }
        </ul>
    </Fragment>
);
const ConstructionContainer = withCopyEdit(ConstructionView);

export default ConstructionContainer;
