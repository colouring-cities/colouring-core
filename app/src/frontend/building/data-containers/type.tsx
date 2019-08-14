import React from 'react';

import { withCopyEdit } from '../building-view';

/**
* Type view/edit section
*/
const TypeView = (props) => (
    <dl className="data-list">

    </dl>
)
const TypeContainer = withCopyEdit(TypeView);

export default TypeContainer;
