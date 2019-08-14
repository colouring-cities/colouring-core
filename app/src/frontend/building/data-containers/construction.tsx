import React from 'react';

import withCopyEdit from '../data-container';
import DataEntry from '../data-components/data-entry';

/**
* Construction view/edit section
*/
const ConstructionView = (props) => (
    <dl className="data-list">

    </dl>
)
const ConstructionContainer = withCopyEdit(ConstructionView);

export default ConstructionContainer;
