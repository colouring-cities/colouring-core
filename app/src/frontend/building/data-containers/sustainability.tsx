import React from 'react';

import { withCopyEdit } from '../building-view';

/**
* Sustainability view/edit section
*/
const SustainabilityView = (props) => (
    <dl className="data-list">

    </dl>
)
const SustainabilityContainer = withCopyEdit(SustainabilityView);

export default SustainabilityContainer;
