import React from 'react';

import withCopyEdit from '../data-container';
import DataEntry from '../data-components/data-entry';

/**
* Age view/edit section
*/
const AgeView = (props) => (
    <dl className="data-list">

    </dl>
)
const AgeContainer = withCopyEdit(AgeView);

export default AgeContainer;
