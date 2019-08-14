import React from 'react';

import withCopyEdit from '../data-container';
import DataEntry from '../data-components/data-entry';

/**
* Community view/edit section
*/
const CommunityView = (props) => (
    <dl className="data-list">

    </dl>
)
const CommunityContainer = withCopyEdit(CommunityView);

export default CommunityContainer;
