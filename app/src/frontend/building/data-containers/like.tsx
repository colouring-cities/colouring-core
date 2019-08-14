import React from 'react';

import { withCopyEdit } from '../building-view';

/**
* Like view/edit section
*/
const LikeView = (props) => (
    <dl className="data-list">

    </dl>
)
const LikeContainer = withCopyEdit(LikeView);

export default LikeContainer;
