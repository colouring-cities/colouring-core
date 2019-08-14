import React, { Fragment } from 'react';

import withCopyEdit from '../data-container';

/**
 * Use view/edit section
 */
const UseView = (props) => (
    <Fragment>
        <p className="data-intro">{props.intro}</p>
        <ul>
            <li>Single or multiple use?</li>
            {
                // "disabled": true,
                // "slug": "use_multi",
                // "type": "checkbox"
            }
            <li>Type of use/s</li>
            {
                // "disabled": true,
                // "slug": "use_type",
                // "type": "text_multi"
            }
            <li>Number of self-contained units</li>
            {
                // "disabled": true,
                // "slug": "use_number_scu",
                // "type": "number",
                // "step": 1
            }
        </ul>
    </Fragment>
)
const UseContainer = withCopyEdit(UseView);

export default UseContainer;
