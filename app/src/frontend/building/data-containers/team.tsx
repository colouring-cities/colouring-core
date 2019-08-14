import React from 'react';

import withCopyEdit from '../data-container';
import DataEntry from '../data-components/data-entry';

/**
* Team view/edit section
*/
const TeamView = (props) => (
    <dl className="data-list">

    </dl>
)
const TeamContainer = withCopyEdit(TeamView);

export default TeamContainer;
