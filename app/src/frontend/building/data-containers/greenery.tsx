import React from 'react';

import withCopyEdit from '../data-container';
import DataEntry from '../data-components/data-entry';

/**
* Greenery view/edit section
*/
const GreeneryView = (props) => (
    <dl className="data-list">

    </dl>
)
const GreeneryContainer = withCopyEdit(GreeneryView);

export default GreeneryContainer;
