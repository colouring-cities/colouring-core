import React, { Fragment } from 'react';

import LikeDataEntry from '../data-components/like-data-entry';
import withCopyEdit from '../data-container';

import { CategoryViewProps } from './category-view-props';

/**
* Like view/edit section
*/
const LikeView: React.FunctionComponent<CategoryViewProps> = (props) => (
    <Fragment>
        <LikeDataEntry
            userLike={props.building_like}
            totalLikes={props.building.likes_total}
            mode={props.mode}
            onLike={props.onLike}
            />
    </Fragment>
);
const LikeContainer = withCopyEdit(LikeView);

export default LikeContainer;
