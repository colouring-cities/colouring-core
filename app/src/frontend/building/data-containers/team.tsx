import React, { Fragment } from 'react';

import withCopyEdit from '../data-container';
import DataEntry from '../data-components/data-entry';

/**
* Team view/edit section
*/
const TeamView = (props) => (
    <Fragment>
        <p className="data-intro">{props.intro}</p>
        <ul>
            <li>Construction and design team (original building)</li>
            {
                // "disabled": true,
                // "slug": "team_original",
                // "type": "text"
            }
            <li>Construction and design team (significant additional works)</li>
            {
                // "disabled": true,
                // "slug": "team_after_original",
                // "type": "text_multi"
            }
        </ul>
    </Fragment>
)
const TeamContainer = withCopyEdit(TeamView);

export default TeamContainer;
