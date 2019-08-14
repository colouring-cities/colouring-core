import React from 'react';

import { withCopyEdit } from '../building-view';

/**
* Construction view/edit section
*/
const ConstructionView = (props) => (
    <dl className="data-list">

    </dl>
)
const ConstructionContainer = withCopyEdit(ConstructionView);

export default ConstructionContainer;
