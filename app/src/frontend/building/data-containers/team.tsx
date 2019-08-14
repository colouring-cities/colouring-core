import React from 'react';

import { withCopyEdit } from '../building-view';

/**
* Team view/edit section
*/
const TeamView = (props) => (
    <dl className="data-list">

    </dl>
)
const TeamContainer = withCopyEdit(TeamView);

export default TeamContainer;
