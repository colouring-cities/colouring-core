import React, { Fragment } from 'react';

import withCopyEdit from '../data-container';

/**
* Community view/edit section
*/
const CommunityView = (props) => (
    <Fragment>
        <p className="data-intro">{props.intro}</p>
        <ul className="data-list">
            <li>Is this a publicly owned building?</li>
            {
            // "slug": "community_publicly_owned",
            // "type": "checkbox"
            }
            <li>Has this building ever been used for community or public services activities?</li>
            {
            // "slug": "community_past_public",
            // "type": "checkbox"
            }
            <li>Would you describe this building as a community asset?</li>
            {
            // "slug": "community_asset",
            // "type": "checkbox"
            }
        </ul>
    </Fragment>
)
const CommunityContainer = withCopyEdit(CommunityView);

export default CommunityContainer;
