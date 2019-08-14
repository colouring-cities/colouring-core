import React from 'react';

import withCopyEdit from '../data-container';
import DataEntry from '../data-components/data-entry';

/**
* Like view/edit section
*/
const LikeView = (props) => (
    <dl className="data-list">

    </dl>
)
const LikeContainer = withCopyEdit(LikeView);

export default LikeContainer;
