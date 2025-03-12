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
import { Category } from '../../config/categories-config';

/**
* Community view/edit section
*/
const CommunityView: React.FunctionComponent<CategoryViewProps> = (props) => {
    // const switchToLikesMapStyle = (e) => {
    //     e.preventDefault();
    //     props.onMapColourScale('typology_likes')
    // }
    const switchToPublicOwnershipMapStyle = (e) => {
        e.preventDefault();
        props.onMapColourScale('community_in_public_ownership')
    }
    const switchToBuildingHominessMapStyle = (e) => {
        e.preventDefault();
        props.onMapColourScale('community_building_hominess_avg')
    }
    const switchToBuildingCoherenceMapStyle = (e) => {
        e.preventDefault();
        props.onMapColourScale('community_building_coherence_avg')
    }
    const switchToBuildingFascinationMapStyle = (e) => {
        e.preventDefault();
        props.onMapColourScale('community_building_fascination_avg')
    }
    const switchToBuildingAverageMapStyle = (e) => {
        e.preventDefault();
        props.onMapColourScale('community_building_neuroaesthetic_avg')
    }
    const switchToStreetscapeHominessMapStyle = (e) => {
        e.preventDefault();
        props.onMapColourScale('community_streetscape_hominess_avg')
    }
    const switchToStreetscapeCoherenceMapStyle = (e) => {
        e.preventDefault();
        props.onMapColourScale('community_streetscape_coherence_avg')
    }
    const switchToStreetscapeFascinationMapStyle = (e) => {
        e.preventDefault();
        props.onMapColourScale('community_streetscape_fascination_avg')
    }
    const switchToStreetscapeAverageMapStyle = (e) => {
        e.preventDefault();
        props.onMapColourScale('community_streetscape_neuroaesthetic_avg')
    }
    
    //const worthKeepingReasonsNonEmpty = Object.values(props.building.community_type_worth_keeping_reasons ?? {}).some(x => x);
    const buildingWorthKeepingReasonsNonEmpty = Object.values(props.building.community_building_worth_keeping_reasons ?? {}).some(x => x);
    const streetscapeWorthKeepingReasonsNonEmpty = Object.values(props.building.community_streetscape_worth_keeping_reasons ?? {}).some(x => x);

    let buildingResponseRequired = 
        props.building.community_building_hominess > 0 || props.building.community_building_fascination > 0 || props.building.community_building_coherence > 0 ||
        props.building.community_building_worth_keeping != null;
    let streetscapeResponseRequired = 
        props.building.community_streetscape_hominess > 0 || props.building.community_streetscape_fascination > 0 || props.building.community_streetscape_coherence > 0 ||
        props.building.community_streetscape_worth_keeping != null;

    const queryParameters = new URLSearchParams(window.location.search);
    const subcat = queryParameters.get("sc");

    return (
        <Fragment>
            <DataEntryGroup name="Community Views On Buildings & Streetscapes" collapsed={subcat==null || subcat!="1"}>
                <div className={`alert alert-dark`} role="alert" style={{ fontSize: 14, backgroundColor: "#f6f8f9" }}>
                    <i>
                        This section collects data on what people feel about the exterior of a building and the surrounding streetscape.
                    </i>
                </div>
                <SelectDataEntry
                    slug='community_building_worth_keeping_based_on'
                    title={buildingUserFields.community_building_worth_keeping_based_on.title}
                    value={props.building.community_building_worth_keeping_based_on}
                    options={buildingUserFields.community_building_worth_keeping_based_on.items}
                    tooltip={buildingUserFields.community_building_worth_keeping_based_on.tooltip}
                    onChange={props.onChange}
                    mode={props.mode}
                    copy={props.copy}
                    required={buildingResponseRequired}
                />
                <hr/>
                <h4 className="subtitle">Hominess</h4>
                <label>
                    How homey and relaxing does the exterior of this building feel to you? 
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
                {(props.mapColourScale != "community_building_hominess_avg") ? 
                    <button className={`map-switcher-inline enabled-state btn btn-outline btn-outline-dark key-button`} onClick={switchToBuildingHominessMapStyle}>
                        {'Click to show building hominess.'}
                    </button>
                    :
                    <button disabled className={`map-switcher-inline enabled-state btn btn-outline btn-outline-dark key-button-disabled`}>
                        {'Showing building hominess.'}
                    </button>
                }
                <hr />
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
                {(props.mapColourScale != "community_streetscape_hominess_avg") ? 
                    <button className={`map-switcher-inline enabled-state btn btn-outline btn-outline-dark key-button`} onClick={switchToStreetscapeHominessMapStyle}>
                        {'Click to show streetscape hominess.'}
                    </button>
                    :
                    <button disabled className={`map-switcher-inline enabled-state btn btn-outline btn-outline-dark key-button-disabled`}>
                        {'Showing building streetscape hominess.'}
                    </button>
                }
                <hr/>
                <h4 className="subtitle">Coherence</h4>
                <label>
                    How coherent and well-organized does the exterior of this building feel to you?
                </label>
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
                {(props.mapColourScale != "community_building_coherence_avg") ? 
                    <button className={`map-switcher-inline enabled-state btn btn-outline btn-outline-dark key-button`} onClick={switchToBuildingCoherenceMapStyle}>
                        {'Click to show building coherence.'}
                    </button>
                    :
                    <button disabled className={`map-switcher-inline enabled-state btn btn-outline btn-outline-dark key-button-disabled`}>
                        {'Showing building coherence.'}
                    </button>
                }
                <hr />
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
                {(props.mapColourScale != "community_streetscape_coherence_avg") ? 
                    <button className={`map-switcher-inline enabled-state btn btn-outline btn-outline-dark key-button`} onClick={switchToStreetscapeCoherenceMapStyle}>
                        {'Click to show streetscape coherence.'}
                    </button>
                    :
                    <button disabled className={`map-switcher-inline enabled-state btn btn-outline btn-outline-dark key-button-disabled`}>
                        {'Showing streetscape coherence.'}
                    </button>
                }
                <hr />
                <h4 className="subtitle">Fascination</h4>
                <label>
                    How fascinating and complex does the exterior of this building feel to you?
                </label>
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
                {(props.mapColourScale != "community_building_fascination_avg") ? 
                    <button className={`map-switcher-inline enabled-state btn btn-outline btn-outline-dark key-button`} onClick={switchToBuildingFascinationMapStyle}>
                        {'Click to show building fascination.'}
                    </button>
                    :
                    <button disabled className={`map-switcher-inline enabled-state btn btn-outline btn-outline-dark key-button-disabled`}>
                        {'Showing building fascination.'}
                    </button>
                }
                <hr/>
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
                {(props.mapColourScale != "community_streetscape_fascination_avg") ? 
                    <button className={`map-switcher-inline enabled-state btn btn-outline btn-outline-dark key-button`} onClick={switchToBuildingFascinationMapStyle}>
                        {'Click to show streetscape fascination.'}
                    </button>
                    :
                    <button disabled className={`map-switcher-inline enabled-state btn btn-outline btn-outline-dark key-button-disabled`}>
                        {'Showing streetscape fascination.'}
                    </button>
                }
                <hr/>
                <LogicalDataEntryYesOnlyWithExplanation
                    slug='community_building_worth_keeping'
                    title={buildingUserFields.community_building_worth_keeping.title}
                    tooltip={buildingUserFields.community_building_worth_keeping.tooltip}
                    value={props.building.community_building_worth_keeping}
                    disallowFalse={buildingWorthKeepingReasonsNonEmpty}
                    disallowNull={buildingWorthKeepingReasonsNonEmpty}

                    onChange={props.onChange}
                    mode={props.mode}

                />
                {
                    props.building.community_building_worth_keeping === true &&
                    <>
                        <MultiSelectDataEntry
                            slug='community_building_worth_keeping_reasons'
                            title={buildingUserFields.community_building_worth_keeping_reasons.title}
                            value={props.building.community_building_worth_keeping_reasons}
                            disabled={!props.building.community_building_worth_keeping}
                            onChange={props.onChange}
                            options={
                                Object.entries(buildingUserFields.community_building_worth_keeping_reasons.fields)
                                .map(([key, definition]) => ({
                                    key,
                                    label: definition.title
                                }))
                            }
                            
                            mode={props.mode}
                        />
                    </>
                }
                <hr/>
                <LogicalDataEntryYesOnlyWithExplanation
                    slug='community_streetscape_worth_keeping'
                    title={buildingUserFields.community_streetscape_worth_keeping.title}
                    tooltip={buildingUserFields.community_streetscape_worth_keeping.tooltip}
                    value={props.building.community_streetscape_worth_keeping}
                    disallowFalse={streetscapeWorthKeepingReasonsNonEmpty}
                    disallowNull={streetscapeWorthKeepingReasonsNonEmpty}

                    onChange={props.onChange}
                    mode={props.mode}

                />
                {
                    props.building.community_streetscape_worth_keeping === true &&
                    <>
                        <MultiSelectDataEntry
                            slug='community_streetscape_worth_keeping_reasons'
                            title={buildingUserFields.community_streetscape_worth_keeping_reasons.title}
                            value={props.building.community_streetscape_worth_keeping_reasons}
                            disabled={!props.building.community_streetscape_worth_keeping}
                            onChange={props.onChange}
                            options={
                                Object.entries(buildingUserFields.community_streetscape_worth_keeping_reasons.fields)
                                .map(([key, definition]) => ({
                                    key,
                                    label: definition.title
                                }))
                            }
                            
                            mode={props.mode}
                        />
                    </>
                }
                <hr/>
                <LogicalDataEntryYesOnlyWithExplanation
                    slug='community_school_project_data'
                    title={buildingUserFields.community_school_project_data.title}
                    tooltip={buildingUserFields.community_school_project_data.tooltip}
                    value={props.building.community_school_project_data}
                    onChange={props.onChange}
                    mode={props.mode}
                />
                <hr/>
                <div className={`alert alert-dark`} role="alert" style={{ fontSize: 14, backgroundColor: "#f6f8f9" }}>
                    <i className="source-url">Click <a href={"/"+props.mode+"/"+Category.PlanningConservation+"/"+props.building.building_id}>here</a> for 'Planning Controls' to see status of planning applications or to record if you think this building is likely to be demolished/significantly altered.</i>
                </div>
                {/* <label className='average-score'>
                    Average neuroaesthetic score for this building: <span className='float-right'><strong>{props.building.community_building_neuroaesthetic_avg}</strong></span>
                </label>
                {(props.mapColourScale != "community_building_neuroaesthetic_avg") ? 
                    <button className={`map-switcher-inline enabled-state btn btn-outline btn-outline-dark key-button`} onClick={switchToBuildingAverageMapStyle}>
                        {"Click to show the building's average score."}
                    </button>
                    :
                    <></>
                }
                <hr/> */}
                {/* 
                }
                <hr />
                {<label className='average-score'>
                    Average neuroaesthetic score for the streetscape: <span className='float-right'><strong>{props.building.community_streetscape_neuroaesthetic_avg}</strong></span>
                </label>
                {(props.mapColourScale != "community_streetscape_neuroaesthetic_avg") ? 
                    <button className={`map-switcher-inline enabled-state btn btn-outline btn-outline-dark key-button`} onClick={switchToStreetscapeAverageMapStyle}>
                        {"Click to show the screetscape's average score."}
                    </button>
                    :
                    <></>
                } 
                <hr/>
                {/* <SelectDataEntry
                    slug='community_streetscape_worth_keeping_based_on'
                    title={buildingUserFields.community_streetscape_worth_keeping_based_on.title}
                    value={props.building.community_streetscape_worth_keeping_based_on}
                    options={buildingUserFields.community_streetscape_worth_keeping_based_on.items}
                    tooltip={buildingUserFields.community_streetscape_worth_keeping_based_on.tooltip}
                    onChange={props.onChange}
                    mode={props.mode}
                    copy={props.copy}
                    required={streetscapeResponseRequired}
                /> */}
            </DataEntryGroup>
            <DataEntryGroup name="Building in Community Use/Ownership" collapsed={subcat==null || subcat!="2"}>
                <div className={`alert alert-dark`} role="alert" style={{ fontSize: 14, backgroundColor: "#f6f8f9" }}>
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
                {
                    props.building.community_activities_current === false &&
                    <>
                        <LogicalDataEntry
                            slug='community_activities'
                            title={dataFields.community_activities.title}
                            tooltip={dataFields.community_activities.tooltip}
                            value={props.building.community_activities}
                            copy={props.copy}
                            onChange={props.onChange}
                            mode={props.mode}
                        />
                    </>
                }
                {
                    props.building.community_activities_current === true &&
                    <>
                        <LogicalDataEntry
                            slug='community_activities_always'
                            title={dataFields.community_activities_always.title}
                            tooltip={dataFields.community_activities_always.tooltip}
                            value={props.building.community_activities_always}
                            copy={props.copy}
                            onChange={props.onChange}
                            mode={props.mode}
                        />
                    </>
                }
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
