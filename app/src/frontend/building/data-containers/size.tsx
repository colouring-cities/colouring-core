import React from 'react';

import { withCopyEdit } from '../building-view';

/**
* Size view/edit section
*/
const SizeView = (props) => (
    <dl className="data-list">

    </dl>
)
const SizeContainer = withCopyEdit(SizeView);

export default SizeContainer;
