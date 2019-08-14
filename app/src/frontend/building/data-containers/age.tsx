import React from 'react';

import { withCopyEdit } from '../building-view';

/**
* Age view/edit section
*/
const AgeView = (props) => (
    <dl className="data-list">

    </dl>
)
const AgeContainer = withCopyEdit(AgeView);

export default AgeContainer;
