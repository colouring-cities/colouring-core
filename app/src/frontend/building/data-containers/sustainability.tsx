import React from 'react';

import withCopyEdit from '../data-container';
import DataEntry from '../data-components/data-entry';

/**
* Sustainability view/edit section
*/
const SustainabilityView = (props) => (
    <dl className="data-list">

    </dl>
)
const SustainabilityContainer = withCopyEdit(SustainabilityView);

export default SustainabilityContainer;
