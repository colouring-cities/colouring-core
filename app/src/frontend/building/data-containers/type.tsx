import React, { Fragment } from 'react';

import withCopyEdit from '../data-container';

/**
* Type view/edit section
*/
const TypeView = (props) => (
    <Fragment>
        <p className="data-intro">{props.intro}</p>
        <ul>
            <li>Original use (as constructed)</li>
            {
                // "disabled": true,
                // "slug": "use_type_original",
                // "type": "text"
            }
        </ul>
    </Fragment>
)
const TypeContainer = withCopyEdit(TypeView);

export default TypeContainer;
