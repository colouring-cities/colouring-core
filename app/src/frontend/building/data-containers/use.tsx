import React from 'react';

import { withCopyEdit } from '../building-view';

/**
 * Use view/edit section
 */
const UseView = (props) => (
    <dl className="data-list">

    </dl>
)
const UseContainer = withCopyEdit(UseView);

export default UseContainer;
