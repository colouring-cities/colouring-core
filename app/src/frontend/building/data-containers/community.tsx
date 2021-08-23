import React from 'react';

import withCopyEdit from '../data-container';
import LikeDataEntry from '../data-components/like-data-entry';

import { CategoryViewProps } from './category-view-props';
import InfoBox from '../../components/info-box';
import { LogicalDataEntry } from '../data-components/logical-data-entry/logical-data-entry';
import { dataFields } from '../../config/data-fields-config';

/**
* Community view/edit section
*/
const CommunityView: React.FunctionComponent<CategoryViewProps> = (props) => (
    <>
        <InfoBox>
        Can you help add information on how well you think the building works, and on if it is in public ownership?
        </InfoBox>
        <LikeDataEntry
            userValue={props.building.community_like}
            aggregateValue={props.building.likes_total}

            onChange={props.onSaveChange}
            mode={props.mode}
            copy={props.copy}
        />
{/*         
        <LogicalDataEntry
            slug='community_publicly_owned'
            title={dataFields.community_publicly_owned.title}
            value={props.building.community_publicly_owned}
            disallowFalse={props.building.community_public_ownership_form != null}
            disallowNull={props.building.community_public_ownership_form != null}

            onChange={props.onSaveChange}
            mode={props.mode}
            copy={props.copy}
        /> */}
        {/* <p className="data-intro">{props.intro}</p> */}
        {/* <ul className="data-list">
            <li>Is this a publicly owned building?</li>
            {
            // "slug": "community_publicly_owned",
            // "type": "checkbox"
            }
            <li>Has this building ever been used for community or public services activities?</li>
            {
            // "slug": "community_past_public",
            // "type": "checkbox"
            }
            <li>Would you describe this building as a community asset?</li>
            {
            // "slug": "community_asset",
            // "type": "checkbox"
            }
        </ul> */}
    </>
);
const CommunityContainer = withCopyEdit(CommunityView);

export default CommunityContainer;
