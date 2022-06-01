import React, { Fragment } from 'react';
import InfoBox from '../../components/info-box';

import withCopyEdit from '../data-container';

import { CategoryViewProps } from './category-view-props';

/**
* Team view/edit section
*/
const TeamView: React.FunctionComponent<CategoryViewProps> = (props) => (
    <Fragment>
        <InfoBox msg="Can you help us capture information on who built the current building?"></InfoBox>
        <ul>
            <li>Construction and design team (original building)</li>
            {
                // "disabled": true,
                // "slug": "team_original",
                // "type": "text"
            }
            <li>Construction and design team (significant additional works)</li>
            {
                // "disabled": true,
                // "slug": "team_after_original",
                // "type": "text_multi"
            }
            <li>Awards</li>
        </ul>
    </Fragment>
);
const TeamContainer = withCopyEdit(TeamView);

export default TeamContainer;
