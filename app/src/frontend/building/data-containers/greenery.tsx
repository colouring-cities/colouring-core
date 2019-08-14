import React from 'react';

import { withCopyEdit } from '../building-view';

/**
* Greenery view/edit section
*/
const GreeneryView = (props) => (
    <dl className="data-list">

    </dl>
)
const GreeneryContainer = withCopyEdit(GreeneryView);

export default GreeneryContainer;
