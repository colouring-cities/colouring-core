import React from 'react';

import withCopyEdit from '../data-container';
import DataEntry from '../data-components/data-entry';

/**
* Planning view/edit section
*/
const PlanningView = (props) => (
    <dl className="data-list">

    </dl>
)
const PlanningContainer = withCopyEdit(PlanningView);

export default PlanningContainer
