import React from 'react';

import { withCopyEdit } from '../building-view';

/**
* Community view/edit section
*/
const CommunityView = (props) => (
    <dl className="data-list">

    </dl>
)
const CommunityContainer = withCopyEdit(CommunityView);

export default CommunityContainer;
