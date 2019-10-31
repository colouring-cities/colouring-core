import React, { Fragment } from 'react';

import withCopyEdit from '../data-container';
import { CategoryViewProps } from './category-view-props';

/**
* Streetscape view/edit section
*/
const StreetscapeView: React.FunctionComponent<CategoryViewProps> = (props) => (
    <Fragment>
        <p className="data-intro">{props.intro}</p>
        <ul className="data-list">
            <li>Gardens</li>
            <li>Trees</li>
            <li>Green walls</li>
            <li>Green roof</li>
            <li>Proximity to parks and open greenspace</li>
            <li>Building shading</li>
        </ul>
    </Fragment>
)
const StreetscapeContainer = withCopyEdit(StreetscapeView);

export default StreetscapeContainer;
