import React from 'react';

import withCopyEdit from '../data-container';
import UserOpinionEntry from '../data-components/user-opinion-data-entry';
import { MultiSelectDataEntry } from '../data-components/multi-select-data-entry';

import { CategoryViewProps } from './category-view-props';
import InfoBox from '../../components/info-box';
import { LogicalDataEntry } from '../data-components/logical-data-entry/logical-data-entry';
import { buildingUserFields, dataFields } from '../../config/data-fields-config';

import './community.css';

/**
* Community view/edit section
*/
const CommunityView: React.FunctionComponent<CategoryViewProps> = (props) => {
    const worthKeepingReasonsNonEmpty = Object.values(props.building.community_type_worth_keeping_reasons ?? {}).some(x => x);
    return <>
        <div className='community-opinion-pane'>
            <InfoBox>
                Can you share your opinion on how well the building works?
            </InfoBox>
            <UserOpinionEntry
                slug='community_like'
                title={buildingUserFields.community_like.title}

                userValue={props.building.community_like}
                aggregateValue={props.building.likes_total}
                aggregationDescriptions={dataFields.likes_total.aggregationDescriptions}

                onChange={props.onSaveChange}
                mode={props.mode}
                copy={props.copy}
            />
            <LogicalDataEntry
                slug='community_type_worth_keeping'
                title={buildingUserFields.community_type_worth_keeping.title}

                value={props.building.community_type_worth_keeping}
                disallowFalse={worthKeepingReasonsNonEmpty}
                disallowNull={worthKeepingReasonsNonEmpty}

                onChange={props.onSaveChange}
                mode={props.mode}
                copy={props.copy}
            />
            {
                props.building.community_type_worth_keeping !== false &&
                <MultiSelectDataEntry
                    slug='community_type_worth_keeping_reasons'
                    title={buildingUserFields.community_type_worth_keeping_reasons.title}
                    value={props.building.community_type_worth_keeping_reasons}
                    disabled={!props.building.community_type_worth_keeping}
                    onChange={props.onSaveChange}
                    options={
                        Object.entries(buildingUserFields.community_type_worth_keeping_reasons.fields)
                        .map(([key, definition]) => ({
                            key,
                            label: definition.title
                        }))
                    }
                    mode={props.mode}
                />
            }
            

            <UserOpinionEntry
                slug='community_local_significance'
                title={buildingUserFields.community_local_significance.title}
                
                userValue={props.building.community_local_significance}
                aggregateValue={props.building.community_local_significance_total}
                aggregationDescriptions={dataFields.community_local_significance_total.aggregationDescriptions}

                onChange={props.onSaveChange}
                mode={props.mode}
                copy={props.copy}
            />
        </div>

        <InfoBox>Can you help add information about public ownership of the building?</InfoBox>
        {/* <LogicalDataEntry
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
};
const CommunityContainer = withCopyEdit(CommunityView);

export default CommunityContainer;
