import React from 'react';

import withCopyEdit from '../data-container';
import DataEntry from '../data-components/data-entry';

/**
* Size view/edit section
*/
const SizeView = (props) => (
    <dl className="data-list">

    </dl>
)
const SizeContainer = withCopyEdit(SizeView);

export default SizeContainer;
