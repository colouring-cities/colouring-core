import React from 'react';

import withCopyEdit from '../data-container';
import DataEntry from '../data-components/data-entry';

/**
 * Use view/edit section
 */
const UseView = (props) => (
    <dl className="data-list">

    </dl>
)
const UseContainer = withCopyEdit(UseView);

export default UseContainer;
