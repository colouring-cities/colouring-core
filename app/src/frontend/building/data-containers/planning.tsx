import React from 'react';

import { withCopyEdit } from '../building-view';

/**
* Planning view/edit section
*/
const PlanningView = (props) => (
    <dl className="data-list">

    </dl>
)
const PlanningContainer = withCopyEdit(PlanningView);

export default PlanningContainer
