import React, { Fragment } from 'react';

import withCopyEdit from '../data-container';
import LikeDataEntry from '../data-components/like-data-entry';

/**
* Like view/edit section
*/
const LikeView = (props) => (
    <Fragment>
        <LikeDataEntry
            value={props.building.likes_total}
            mode={props.mode}
            onLike={props.onLike}
            building_like={props.building_like}
            />
    </Fragment>
)
const LikeContainer = withCopyEdit(LikeView);

export default LikeContainer;
