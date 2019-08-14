import React from 'react';

import withCopyEdit from '../data-container';
import DataEntry from '../data-components/data-entry';

/**
* Type view/edit section
*/
const TypeView = (props) => (
    <dl className="data-list">

    </dl>
)
const TypeContainer = withCopyEdit(TypeView);

export default TypeContainer;
