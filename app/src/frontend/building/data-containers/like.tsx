import React from 'react';

import withCopyEdit from '../data-container';
import LikeDataEntry from '../data-components/like-data-entry';

/**
* Like view/edit section
*/
const LikeView = (props) => (
    <dl className="data-list">
        <LikeDataEntry
            value={props.building.likes_total}
            user_building_like={props.building_like}
            />
    </dl>
)
const LikeContainer = withCopyEdit(LikeView);

export default LikeContainer;
