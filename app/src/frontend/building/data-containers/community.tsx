import React from 'react';

import withCopyEdit from '../data-container';
import UserOpinionEntry from '../data-components/user-opinion-data-entry';
import { MultiSelectDataEntry } from '../data-components/multi-select-data-entry';

import { CategoryViewProps } from './category-view-props';
import InfoBox from '../../components/info-box';
import { LogicalDataEntry } from '../data-components/logical-data-entry/logical-data-entry';
import { buildingUserFields, dataFields } from '../../config/data-fields-config';

import './community.css';
import SelectDataEntry from '../data-components/select-data-entry';
import Verification from '../data-components/verification';
import { MultiDataEntry } from '../data-components/multi-data-entry/multi-data-entry';

/**
* Community view/edit section
*/
const CommunityView: React.FunctionComponent<CategoryViewProps> = (props) => {
    const worthKeepingReasonsNonEmpty = Object.values(props.building.community_type_worth_keeping_reasons ?? {}).some(x => x);
    return <>
        <InfoBox type='warning'>
            We are testing a new feature in this section! Switch between different colour maps by using the dropdown in the legend pane.
        </InfoBox>
        <div className='community-opinion-pane'>
            <InfoBox>
                Can you share your opinion on how well the building works?
            </InfoBox>
            <UserOpinionEntry
                slug='community_like'
                title={buildingUserFields.community_like.title}

                userValue={props.building.community_like}

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

                onChange={props.onSaveChange}
                mode={props.mode}
                copy={props.copy}
            />

            <UserOpinionEntry
                slug='community_expected_planning_application'
                title={buildingUserFields.community_expected_planning_application.title}
                
                userValue={props.building.community_expected_planning_application}

                onChange={props.onSaveChange}
                mode={props.mode}
                copy={props.copy}
            />
        </div>

        <InfoBox>Can you help add information on community use of buildings?</InfoBox>
        <LogicalDataEntry
            slug='community_activities_current'
            title={dataFields.community_activities_current.title}
            tooltip={dataFields.community_activities_current.tooltip}
            value={props.building.community_activities_current}
            copy={props.copy}
            onChange={props.onChange}
            mode={props.mode}
        />
        <LogicalDataEntry
            slug='community_activities'
            title={dataFields.community_activities.title}
            tooltip={dataFields.community_activities.tooltip}
            value={props.building.community_activities}
            copy={props.copy}
            onChange={props.onChange}
            mode={props.mode}
        />
        <LogicalDataEntry
            slug='community_activities_always'
            title={dataFields.community_activities_always.title}
            tooltip={dataFields.community_activities_always.tooltip}
            value={props.building.community_activities_always}
            copy={props.copy}
            onChange={props.onChange}
            mode={props.mode}
        />
        {/* TODO: dates */}
        {
            // props.building.community_activities === true &&
            // <FieldRow>
            //     <div>
            //     </div>
            //     <div>
            //     </div>
            // </FieldRow>
        }
        
        <SelectDataEntry
            slug='community_public_ownership'
            title={dataFields.community_public_ownership.title}
            value={props.building.community_public_ownership}
            options={[
                'Government-owned',
                'Charity-owned',
                'Community-owned/cooperative',
                'Owned by other non-profit body',
                'Not in public/community ownership',
            ]}

            onChange={props.onChange}
            mode={props.mode}
            copy={props.copy}
        />
        <Verification
                slug="community_public_ownership"
                allow_verify={props.user !== undefined && props.building.community_public_ownership !== null && !props.edited}
                onVerify={props.onVerify}
                user_verified={props.user_verified.hasOwnProperty("community_public_ownership")}
                user_verified_as={props.user_verified.community_public_ownership}
                verified_count={props.building.verified.community_public_ownership}
                />
        <MultiDataEntry
            slug='community_public_ownership_sources'
            title={dataFields.community_public_ownership_sources.title}
            isUrl={true}
            placeholder={'https://...'}
            editableEntries={true}
            value={props.building.community_public_ownership_sources}
            onChange={props.onChange}
            mode={props.mode}
            copy={props.copy}
        />
        <Verification
                slug="community_public_ownership_sources"
                allow_verify={props.user !== undefined && props.building.community_public_ownership_sources !== null && !props.edited}
                onVerify={props.onVerify}
                user_verified={props.user_verified.hasOwnProperty("community_public_ownership_sources")}
                user_verified_as={props.user_verified.community_public_ownership_sources}
                verified_count={props.building.verified.community_public_ownership_sources}
                />
    </>
};
const CommunityContainer = withCopyEdit(CommunityView);

export default CommunityContainer;
