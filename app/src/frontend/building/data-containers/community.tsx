import './community.css';
import '../../map/map-button.css';
import React, { Fragment } from 'react';
import withCopyEdit from '../data-container';
import UserOpinionEntry from '../data-components/user-opinion-data-entry';
import { MultiSelectDataEntry } from '../data-components/multi-select-data-entry';
import { DataEntryGroup } from '../data-components/data-entry-group';
import { CategoryViewProps } from './category-view-props';
import { LogicalDataEntry, LogicalDataEntryYesOnlyWithExplanation } from '../data-components/logical-data-entry/logical-data-entry';
import { buildingUserFields, dataFields } from '../../config/data-fields-config';
import SelectDataEntry from '../data-components/select-data-entry';
import Verification from '../data-components/verification';
import { MultiDataEntry } from '../data-components/multi-data-entry/multi-data-entry';
import SliderDataEntry from '../data-components/slider-data-entry';

/**
* Community view/edit section
*/
const CommunityView: React.FunctionComponent<CategoryViewProps> = (props) => {
    const switchToLikesMapStyle = (e) => {
        e.preventDefault();
        props.onMapColourScale('typology_likes')
    }
    const switchToLocalSignificanceMapStyle = (e) => {
        e.preventDefault();
        props.onMapColourScale('community_local_significance_total')
    }
   const switchToExpectedApplicationMapStyle = (e) => {
        e.preventDefault();
        props.onMapColourScale('community_expected_planning_application_total')
    }
    const switchToPublicOwnershipMapStyle = (e) => {
        e.preventDefault();
        props.onMapColourScale('community_in_public_ownership')
    }
    
    const worthKeepingReasonsNonEmpty = Object.values(props.building.community_type_worth_keeping_reasons ?? {}).some(x => x);

    const queryParameters = new URLSearchParams(window.location.search);
    const subcat = queryParameters.get("sc");

    return (
        <Fragment>
            <DataEntryGroup name="Community views on buildings" collapsed={subcat==null || subcat!="1"}>
                <div className={`alert alert-dark`} role="alert" style={{ fontSize: 14, backgroundColor: "#f6f8f9" }}>
                    <i className="source-url">Click <a href={"/"+props.mode+"/planning/"+props.building.building_id}>here</a> for 'Planning Controls' to see status of planning applications or to record if you think this building is likely to be demolished/significantly altered.</i>
                </div>
                <label>
                    What do you feel about the exterior of this building?
                </label>
                <SliderDataEntry
                    slug="community_building_hominess"
                    title={buildingUserFields.community_building_hominess.title}
                    tooltip={buildingUserFields.community_building_hominess.tooltip}
                    value={props.building.community_building_hominess}
                    votes={props.building.community_building_hominess_count}
                    average={props.building.community_building_hominess_avg}
                    min={1}
                    max={5}
                    dots={true}
                    onChange={props.onChange}
                    mode={props.mode}
                />
                <SliderDataEntry
                    slug="community_building_coherence"
                    title={buildingUserFields.community_building_coherence.title}
                    tooltip={buildingUserFields.community_building_coherence.tooltip}
                    value={props.building.community_building_coherence}
                    votes={props.building.community_building_coherence_count}
                    average={props.building.community_building_coherence_avg}
                    min={1}
                    max={5}
                    dots={true}
                    onChange={props.onChange}
                    mode={props.mode}

                />
                <SliderDataEntry
                    slug="community_building_fascination"
                    title={buildingUserFields.community_building_fascination.title}
                    tooltip={buildingUserFields.community_building_fascination.tooltip}
                    value={props.building.community_building_fascination}
                    votes={props.building.community_building_fascination_count}
                    average={props.building.community_building_fascination_avg}
                    min={1}
                    max={5}
                    dots={true}
                    onChange={props.onChange}
                    mode={props.mode}
                />
                {(props.mapColourScale != "community_local_significance_total") ? 
                    <button className={`map-switcher-inline enabled-state btn btn-outline btn-outline-dark key-button`} onClick={switchToLocalSignificanceMapStyle}>
                        {'Click to show buildings of local interest.'}
                    </button>
                    :
                    <></>
                }
                <hr />
                <UserOpinionEntry
                    slug='community_expected_planning_application'
                    title={buildingUserFields.community_expected_planning_application.title}
                    tooltip={buildingUserFields.community_expected_planning_application.tooltip}
                    userValue={props.building.community_expected_planning_application}

                        onChange={props.onSaveChange}
                        mode={props.mode}

                />
                {(props.mapColourScale != "typology_likes") ? 
                    <button className={`map-switcher-inline enabled-state btn btn-outline btn-outline-dark key-button`} onClick={switchToLikesMapStyle}>
                        {'Click to show liked typologies.'}
                    </button>
                    :
                    <></>
                }
                {
                    props.building.community_type_worth_keeping === true &&
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
                <hr />
                <div className={`alert alert-dark`} role="alert" style={{ fontSize: 13, backgroundColor: "#f6f8f9" }}>
                    <i>
                        Thank you for for your feedback! Your answers will help planners, designers and developers better understand how the form and decoration of buildings and streetscapes make people feel.
                    </i>
                </div>
            </DataEntryGroup>
            <DataEntryGroup name="Community views on streetscapes" collapsed={subcat==null || subcat!="2"}>
                <label>
                    What do you feel about the exterior of this building?
                </label>
                <SliderDataEntry
                    slug="community_streetscape_hominess"
                    title={buildingUserFields.community_streetscape_hominess.title}
                    tooltip={buildingUserFields.community_streetscape_hominess.tooltip}
                    value={props.building.community_streetscape_hominess}
                    votes={props.building.community_streetscape_hominess_count}
                    average={props.building.community_streetscape_hominess_avg}
                    min={1}
                    max={5}
                    dots={true}
                    onChange={props.onChange}
                    mode={props.mode}
                />
                <SliderDataEntry
                    slug="community_streetscape_coherence"
                    title={buildingUserFields.community_streetscape_coherence.title}
                    tooltip={buildingUserFields.community_streetscape_coherence.tooltip}
                    value={props.building.community_streetscape_coherence}
                    votes={props.building.community_streetscape_coherence_count}
                    average={props.building.community_streetscape_coherence_avg}
                    min={1}
                    max={5}
                    dots={true}
                    onChange={props.onChange}
                    mode={props.mode}
                />
                <SliderDataEntry
                    slug="community_streetscape_fascination"
                    title={buildingUserFields.community_streetscape_fascination.title}
                    tooltip={buildingUserFields.community_streetscape_fascination.tooltip}
                    value={props.building.community_streetscape_fascination}
                    votes={props.building.community_streetscape_fascination_count}
                    average={props.building.community_streetscape_fascination_avg}
                    min={1}
                    max={5}
                    dots={true}
                    onChange={props.onChange}
                    mode={props.mode}
                />
                <div className={`alert alert-dark`} role="alert" style={{ fontSize: 13, backgroundColor: "#f6f8f9" }}>
                    <i>
                        For more information on current planning applications, refer to the Planning Controls category.
                    </i>
                </div>
                {(props.mapColourScale != "community_expected_planning_application_total") ? 
                    <button className={`map-switcher-inline enabled-state btn btn-outline btn-outline-dark key-button`} onClick={switchToExpectedApplicationMapStyle}>
                        {'Click to show expected planning applications.'}
                    </button>
                    :
                    <></>
                }
            </DataEntryGroup>
            <DataEntryGroup name="Buildings in community use" collapsed={subcat==null || subcat!="2"}>
                <div className={`alert alert-dark`} role="alert" style={{ fontSize: 13, backgroundColor: "#f6f8f9" }}>
                    <i>
                        Here we are collecting information on the location of buildings used for community activities so we can track loss of/additions to community space over time.
                    </i>
                </div>
                {(props.mapColourScale != "community_in_public_ownership") ? 
                    <button className={`map-switcher-inline enabled-state btn btn-outline btn-outline-dark key-button`} onClick={switchToPublicOwnershipMapStyle}>
                        {'Click to show building ownership status.'}
                    </button>
                    :
                    <></>
                }
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
                <SelectDataEntry
                    slug='community_public_ownership'
                    title={dataFields.community_public_ownership.title}
                    value={props.building.community_public_ownership}
                    options={dataFields.community_public_ownership.items}
                    tooltip={dataFields.community_public_ownership.tooltip}
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
                    tooltip={dataFields.community_public_ownership_sources.tooltip}
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
            </DataEntryGroup>
        </Fragment>
    );
};
const CommunityContainer = withCopyEdit(CommunityView);

export default CommunityContainer;
