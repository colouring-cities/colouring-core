import React, { Fragment } from 'react';

import '../../map/map-button.css';
import { buildingUserFields, dataFields } from '../../config/data-fields-config';
import { MultiDataEntry } from '../data-components/multi-data-entry/multi-data-entry';
import { DataEntryGroup } from '../data-components/data-entry-group';
import { Link } from 'react-router-dom';
import { Category } from '../../config/categories-config';
import NumericDataEntry from '../data-components/numeric-data-entry';
import SelectDataEntry from '../data-components/select-data-entry';
import Verification from '../data-components/verification';
import withCopyEdit from '../data-container';
import DataEntry from '../data-components/data-entry';
import InfoBox from '../../components/info-box';

import { CategoryViewProps } from './category-view-props';
import { LogicalDataEntry } from '../data-components/logical-data-entry/logical-data-entry';
import { useDisplayPreferences } from '../../displayPreferences-context';
import PlanningDataOfficialDataEntry from '../data-components/planning-data-entry';
import UserOpinionEntry from '../data-components/user-opinion-data-entry';
import NumericDataEntryWithFormattedLink from '../data-components/numeric-data-entry-with-formatted-link';

const currentTimestamp = new Date().valueOf();
const milisecondsInYear = 1000 * 60 * 60 * 24 * 365;

// there is already "parseDate" in helpers
// but it is using timestamp as input, while this one
// uses lower accuracy (as actual data is using the same accuracy)
function parseDateSpecifiedWithDailyAccuracy(isoUtcDate: string): Date {
    const [year, month, day] = isoUtcDate.match(/^(\d{4})-(\d\d)-(\d\d)$/)
        .splice(1)
        .map(x => parseInt(x, 10));
    return new Date(Date.UTC(year, month-1, day));
}

function isArchived(item) {
    const decisionDate = item.decision_date;
    if(decisionDate != null) {
        if ((currentTimestamp - parseDateSpecifiedWithDailyAccuracy(decisionDate).valueOf()) > milisecondsInYear) {
            return true;
        }
    }
    if(item.registered_with_local_authority_date != null) {
        if ((currentTimestamp - parseDateSpecifiedWithDailyAccuracy(item.registered_with_local_authority_date).valueOf()) > milisecondsInYear) {
            return true;
        }
    }
    return false;
}

/**
* Planning & Conservation view/edit section
*/
const PlanningConservationView: React.FunctionComponent<CategoryViewProps> = (props) => {
    const queryParameters = new URLSearchParams(window.location.search);
    const subcat = queryParameters.get("sc");
    
    const switchToExpectedApplicationMapStyle = (e) => {
        e.preventDefault();
        props.onMapColourScale('community_expected_planning_application_total')
    }
    const switchToBuildingProtectionMapStyle = (e) => {
        e.preventDefault();
        props.onMapColourScale('planning_combined')
    }
    const switchToAllPlanningApplicationsMapStyle = (e) => {
        e.preventDefault();
        props.onMapColourScale('planning_applications_status_all')
    }
    const switchToLastTwelveMonthsMapStyle = (e) => {
        e.preventDefault();
        props.onMapColourScale('planning_applications_status_recent')
    }
    const switchToLastThirtyDaysMapStyle = (e) => {
        e.preventDefault();
        props.onMapColourScale('planning_applications_status_very_recent')
    }
    const switchToLocalSignificanceMapStyle = (e) => {
        e.preventDefault();
        props.onMapColourScale('community_local_significance_total')
    }

    const { housing, housingSwitchOnClick, creative, creativeSwitchOnClick, vista, vistaSwitchOnClick, conservation, conservationSwitchOnClick, darkLightTheme } = useDisplayPreferences();
    
    const communityLinkUrl = `/${props.mode}/${Category.Community}/${props.building.building_id}`;
    const currentYear = new Date().getFullYear();

    return (
         <Fragment>
            <DataEntryGroup name="Planning" collapsed={subcat==null || (subcat!="1" && subcat!="2" && subcat!="3")}>
                <DataEntryGroup name="Current Planning Applications" collapsed={subcat==null || (subcat!="1" && subcat!="2" && subcat!="3")}>
                    <DataEntryGroup name="Official Data" collapsed={subcat==null || subcat!="1"}>
                        <InfoBox>
                            This section provides data on active applications. We define these as applications with any activity in the last year.
                            <br />
                            To comment on an application follow the application link if provided, or visit the relevant local authority's planning page.
                        </InfoBox>
                        {props.mapColourScale != "planning_applications_status_all" ?
                            <button className={`map-switcher-inline disabled-state btn btn-outline btn-outline-dark key-button sub-subcategory-button`} onClick={switchToAllPlanningApplicationsMapStyle}>
                                {'Click to view official planning application data'}
                            </button>
                            :
                            <></>
                        }
                        {props.building.planning_data ?
                            <PlanningDataOfficialDataEntry  
                                shownData={props.building.planning_data.filter(item => isArchived(item) == false)}
                                messageOnMissingData={
                                    props.building.planning_data.length > 0 ?
                                        "Only past application data is currently available for this site"
                                        :
                                        "No live planning data are currently available for this building from the Planning London Datahub."
                                }
                            />
                        : <></>
                        }
                    </DataEntryGroup>
                    <DataEntryGroup name="Year of Completion" collapsed={subcat==null || subcat!="2"}>
                        <LogicalDataEntry
                            slug='planning_crowdsourced_site_completion_status'
                            title={dataFields.planning_crowdsourced_site_completion_status.title}
                            tooltip={dataFields.planning_crowdsourced_site_completion_status.tooltip}
                            value={props.building.planning_crowdsourced_site_completion_status}
                            copy={props.copy}
                            onChange={props.onChange}
                            mode={props.mode}
                        />
                        <Verification
                            slug="planning_crowdsourced_site_completion_status"
                            allow_verify={props.user !== undefined && props.building.planning_crowdsourced_site_completion_status !== null && !props.edited}
                            onVerify={props.onVerify}
                            user_verified={props.user_verified.hasOwnProperty("planning_crowdsourced_site_completion_status")}
                            user_verified_as={props.user_verified.planning_crowdsourced_site_completion_status}
                            verified_count={props.building.verified.planning_crowdsourced_site_completion_status}
                        />
                        {props.building.planning_crowdsourced_site_completion_status == null ? <></> :
                            <>
                                <NumericDataEntry
                                    title={dataFields.planning_crowdsourced_site_completion_year.title}
                                    slug="planning_crowdsourced_site_completion_year"
                                    value={props.building.planning_crowdsourced_site_completion_year}
                                    mode={props.mode}
                                    copy={props.copy}
                                    onChange={props.onChange}
                                    step={1}
                                    min={1}
                                    max={currentYear}
                                    tooltip={dataFields.planning_crowdsourced_site_completion_year.tooltip}
                                    />
                                <Verification
                                    slug="planning_crowdsourced_site_completion_year"
                                    allow_verify={props.user !== undefined && props.building.planning_crowdsourced_site_completion_year !== null && !props.edited}
                                    onVerify={props.onVerify}
                                    user_verified={props.user_verified.hasOwnProperty("planning_crowdsourced_site_completion_year")}
                                    user_verified_as={props.user_verified.planning_crowdsourced_site_completion_year}
                                    verified_count={props.building.verified.planning_crowdsourced_site_completion_year}
                                    />
                                <SelectDataEntry
                                    title={dataFields.planning_crowdsourced_site_completion_source_type.title}
                                    slug="planning_crowdsourced_site_completion_source_type"
                                    value={props.building.planning_crowdsourced_site_completion_source_type}
                                    mode={props.mode}
                                    copy={props.copy}
                                    onChange={props.onChange}
                                    tooltip={dataFields.planning_crowdsourced_site_completion_source_type.tooltip}
                                    options={dataFields.planning_crowdsourced_site_completion_source_type.items}
                                    placeholder={dataFields.planning_crowdsourced_site_completion_source_type.example}
                                />
                                {(props.building.planning_crowdsourced_site_completion_source_type == dataFields.planning_crowdsourced_site_completion_source_type.items[0] ||
                                    props.building.planning_crowdsourced_site_completion_source_type == dataFields.planning_crowdsourced_site_completion_source_type.items[1] ||
                                    props.building.planning_crowdsourced_site_completion_source_type == null) ? <></> :
                                    <>
                                        <MultiDataEntry
                                            title={dataFields.planning_crowdsourced_site_completion_source_links.title}
                                            slug="planning_crowdsourced_site_completion_source_links"
                                            value={props.building.planning_crowdsourced_site_completion_source_links}
                                            mode={props.mode}
                                            copy={props.copy}
                                            onChange={props.onChange}
                                            tooltip={dataFields.planning_crowdsourced_site_completion_source_links.tooltip}
                                            placeholder="https://..."
                                            editableEntries={true}
                                            isUrl={true}
                                        />
                                    </>
                                }
                            </>
                        }   
                    </DataEntryGroup>
                    <DataEntryGroup name="Incomplete/Missing Data" collapsed={subcat==null || subcat!="3"}>
                        <LogicalDataEntry
                            slug='planning_missing_data'
                            title={dataFields.planning_missing_data.title}
                            tooltip={dataFields.planning_missing_data.tooltip}
                            value={props.building.planning_missing_data}
                            copy={props.copy}
                            onChange={props.onChange}
                            mode={props.mode}
                        />
                        <Verification
                            slug="planning_missing_data"
                            allow_verify={props.user !== undefined && props.building.planning_missing_data !== null && !props.edited}
                            onVerify={props.onVerify}
                            user_verified={props.user_verified.hasOwnProperty("planning_missing_data")}
                            user_verified_as={props.user_verified.planning_missing_data}
                            verified_count={props.building.verified.planning_missing_data}
                        />
                        {props.building.planning_missing_data == null ? <></> :
                            <>
                                <MultiDataEntry
                                    title={dataFields.planning_missing_data_links.title}
                                    slug="planning_missing_data_links"
                                    value={props.building.planning_missing_data_links}
                                    mode={props.mode}
                                    copy={props.copy}
                                    onChange={props.onChange}
                                    tooltip={dataFields.planning_missing_data_links.tooltip}
                                    placeholder="https://..."
                                    editableEntries={true}
                                    isUrl={true}
                                />
                            </>
                        }
                        <InfoBox>
                            If you feel there are incorrect or missing data relating to this building please contact:  
                            planningdata@London.gov.uk
                        </InfoBox>
                    </DataEntryGroup>
                </DataEntryGroup>
                <DataEntryGroup name="Past Applications" collapsed={subcat==null || subcat!="4"}>
                    <InfoBox>
                        This section provides data on past applications where available from the GLA, including those with no decision in over a year
                    </InfoBox>
                    {props.mapColourScale != "planning_applications_status_recent" ?
                        <button className={`map-switcher-inline disabled-state btn btn-outline btn-outline-dark key-button no-left-margin`} onClick={switchToLastTwelveMonthsMapStyle}>
                            {'Click to view planning applications from the last 12 months'}
                        </button>
                        :
                        <></>
                    }
                    {props.mapColourScale != "planning_applications_status_very_recent" ?
                        <button className={`map-switcher-inline disabled-state btn btn-outline btn-outline-dark key-button no-left-margin`} onClick={switchToLastThirtyDaysMapStyle}>
                            {'Click to view planning applications from the last 30 days'}
                        </button>
                        :
                        <></>
                    }
                    {props.building.planning_data ?
                        <PlanningDataOfficialDataEntry  
                            shownData={props.building.planning_data.filter(item => isArchived(item))}
                            messageOnMissingData={
                                props.building.planning_data.length > 0 ?
                                    "Only current application data is currently available for this site"
                                    :
                                    "No live planning data are currently available for this building from the Planning London Datahub."
                            }
                        />
                    : <></>
                    }
                </DataEntryGroup>
                <DataEntryGroup name="Possible Future Applications" collapsed={subcat==null || subcat!="5"}>
                    <InfoBox type='info'>Click and colour buildings here if you think they may be subject to a future planning application involving demolition. To add your opinion on how well this building works, please also visit the <Link to={communityLinkUrl}>Community</Link> section.</InfoBox>
                    <UserOpinionEntry
                        slug='community_expected_planning_application'
                        title={buildingUserFields.community_expected_planning_application.title}
                        tooltip={buildingUserFields.community_expected_planning_application.tooltip}
                        userValue={props.building.community_expected_planning_application}
                        onChange={props.onSaveChange}
                        mode={props.mode}
                    />
                    {props.mapColourScale != "community_expected_planning_application_total" ?
                        <button className={`map-switcher-inline disabled-state btn btn-outline btn-outline-dark key-button`} onClick={switchToExpectedApplicationMapStyle}>
                            {'Click to view possible locations of future applications'}
                        </button>
                        :
                        <></>
                    }
                    <hr/>
                    <UserOpinionEntry
                        slug='community_local_significance'
                        title={buildingUserFields.community_local_significance.title}
                        tooltip={buildingUserFields.community_local_significance.tooltip}
                        userValue={props.building.community_local_significance}

                        onChange={props.onSaveChange}
                        mode={props.mode}
                    />
                    {(props.mapColourScale != "community_local_significance_total") ? 
                        <button className={`map-switcher-inline enabled-state btn btn-outline btn-outline-dark key-button`} onClick={switchToLocalSignificanceMapStyle}>
                            {'Click to show buildings of local interest.'}
                        </button>
                        :
                        <></>
                    }
                </DataEntryGroup>
                <DataEntryGroup name="Planning Zones" collapsed={subcat==null || subcat!="6"}>
                    <InfoBox>
                        To view planning zone data for London click the buttons below. You may need to <u>zoom out</u>.
                        Information on whether a specific building is in a zone will be added automatically in future.
                    </InfoBox>
                    <div className={`alert alert-dark`} role="alert" style={{ fontSize: 13, backgroundColor: "#f6f8f9" }}>
                        <i>
                            Data in this section comes from <a href="https://www.london.gov.uk/programmes-strategies/planning/digital-planning/planning-london-datahub">the Greater London Authority's Planning London Datahub</a>. Please check the original GLA source when using for planning purposes.
                            <br />
                            Specific sources are mentioned in the footer of map for currently enabled layers.
                        </i>
                    </div>
                    <LogicalDataEntry
                        slug='planning_housing_zone'
                        title={dataFields.planning_housing_zone.title}
                        tooltip={dataFields.planning_housing_zone.tooltip}
                        value={props.building.planning_housing_zone}
                        copy={props.copy}
                        onChange={props.onChange}
                        mode={props.mode}
                        disabled={true}
                    />
                    <button className={`map-switcher-inline ${housing}-state btn btn-outline btn-outline-dark ${darkLightTheme}`} onClick={housingSwitchOnClick}>
                        {(housing === 'enabled')? 'Click to hide Housing Zones' : 'Click to see Housing Zones mapped'}
                    </button>
                    <LogicalDataEntry
                        slug='planning_enterprise_zone'
                        title={dataFields.planning_enterprise_zone.title}
                        tooltip={dataFields.planning_enterprise_zone.tooltip}
                        value={props.building.planning_enterprise_zone}
                        copy={props.copy}
                        onChange={props.onChange}
                        mode={props.mode}
                        disabled={true}
                    />
                    <button className={`map-switcher-inline ${creative}-state btn btn-outline btn-outline-dark ${darkLightTheme}`} onClick={creativeSwitchOnClick}>
                        {(creative === 'enabled')? 'Click to hide Creative Enterprise Zones' : 'Click to see Creative Enterprise Zones'}
                    </button>
                    <LogicalDataEntry
                        slug='planning_protected_vista'
                        title={dataFields.planning_protected_vista.title}
                        tooltip={dataFields.planning_protected_vista.tooltip}
                        value={props.building.planning_protected_vista}
                        copy={props.copy}
                        onChange={props.onChange}
                        mode={props.mode}
                        disabled={true}
                    />
                    <button className={`map-switcher-inline ${vista}-state btn btn-outline btn-outline-dark ${darkLightTheme}`} onClick={vistaSwitchOnClick}>
                        {(vista === 'enabled')? 'Click to hide Protected Vistas' : 'Click to see Protected Vistas'}
                    </button>
                    {/*
                        <DataEntry
                        title={dataFields.planning_glher_url.title}
                        slug="planning_glher_url"
                        value={props.building.planning_glher_url}
                        mode={props.mode}
                        copy={props.copy}
                        onChange={props.onChange}
                        isUrl={true}
                        placeholder="Please add relevant link here"
                        />
                    <Verification
                        slug="planning_glher_url"
                        allow_verify={props.user !== undefined && props.building.planning_glher_url !== null && !props.edited}
                        onVerify={props.onVerify}
                        user_verified={props.user_verified.hasOwnProperty("planning_glher_url")}
                        user_verified_as={props.user_verified.planning_glher_url}
                        verified_count={props.building.verified.planning_glher_url}
                        />
                    */}
                </DataEntryGroup>    
            </DataEntryGroup>
            <DataEntryGroup name="Heritage Assets & Building Protection" collapsed={subcat==null || subcat!="7"}>
                <InfoBox>
                Help us produce the most accurate map possible for London's designated/protected buildings. Please add data if missing or click "Verify" where entries are correct.
                </InfoBox>
                <div className={`alert alert-dark`} role="alert" style={{ fontSize: 13, backgroundColor: "#f6f8f9" }}>
                    <i><div><u>Disclaimer</u>:  Data for designated heritage assets has been accessed from the <a href="https://historicengland.org.uk/listing/the-list/">National Heritage List for England</a>. Source information for Conservation Area data can be accessed <a href="http://www.bedfordpark.net/leo/planning/">here</a>. Please note all data should be double checked against official sources where used for planning purposes'.</div></i>
                </div>
                {props.mapColourScale != "planning_combined" ?
                    <button className={`map-switcher-inline disabled-state btn btn-outline btn-outline-dark key-button`} onClick={switchToBuildingProtectionMapStyle}>
                        {'Click to see individual protected buildings mapped'}
                    </button>
                    :
                    <></>
                }
                <button className={`map-switcher-inline ${conservation}-state btn btn-outline btn-outline-dark ${darkLightTheme}`} onClick={conservationSwitchOnClick}>
                    {(conservation === 'enabled')? 'Click to hide Conservation Areas' : 'Click to see Conservation Areas'}
                </button>
                <hr/>
                <LogicalDataEntry
                    slug='planning_heritage_at_risk'
                    title={dataFields.planning_heritage_at_risk.title}
                    tooltip={dataFields.planning_heritage_at_risk.tooltip}
                    value={props.building.planning_heritage_at_risk}
                    copy={props.copy}
                    onChange={props.onChange}
                    mode={props.mode}
                />
                <Verification
                    slug="planning_heritage_at_risk"
                    allow_verify={props.user !== undefined && props.building.planning_heritage_at_risk !== null && !props.edited}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("planning_heritage_at_risk")}
                    user_verified_as={props.user_verified.planning_heritage_at_risk}
                    verified_count={props.building.verified.planning_heritage_at_risk}
                />
                {(props.building.planning_heritage_at_risk == null || props.building.planning_heritage_at_risk == false) ? <></> :
                    <>
                        <DataEntry
                            title={dataFields.planning_heritage_at_risk_url.title}
                            slug="planning_heritage_at_risk_url"
                            value={props.building.planning_heritage_at_risk_url}
                            tooltip={dataFields.planning_heritage_at_risk_url.tooltip}
                            mode={props.mode}
                            copy={props.copy}
                            onChange={props.onChange}
                            placeholder="Please add relevant link here"
                            isUrl={true}
                            />
                        <Verification
                            slug="planning_heritage_at_risk_url"
                            allow_verify={props.user !== undefined && props.building.planning_heritage_at_risk_url !== null && !props.edited}
                            onVerify={props.onVerify}
                            user_verified={props.user_verified.hasOwnProperty("planning_heritage_at_risk_url")}
                            user_verified_as={props.user_verified.planning_heritage_at_risk_url}
                            verified_count={props.building.verified.planning_heritage_at_risk_url}
                            />
                    </>
                }
                <hr/>
                <LogicalDataEntry
                    slug='planning_world_heritage_site'
                    title={dataFields.planning_world_heritage_site.title}
                    tooltip={dataFields.planning_world_heritage_site.tooltip}
                    value={props.building.planning_world_heritage_site}
                    copy={props.copy}
                    onChange={props.onChange}
                    mode={props.mode}
                />
                <Verification
                    slug="planning_world_heritage_site"
                    allow_verify={props.user !== undefined && props.building.planning_world_heritage_site !== null && !props.edited}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("planning_world_heritage_site")}
                    user_verified_as={props.user_verified.planning_world_heritage_site}
                    verified_count={props.building.verified.planning_world_heritage_site}
                />
                {(props.building.planning_world_heritage_site == null || props.building.planning_world_heritage_site == false) ? <></> :
                    <>
                        <NumericDataEntryWithFormattedLink
                            title={dataFields.planning_world_list_id.title}
                            slug="planning_world_list_id"
                            value={props.building.planning_world_list_id}
                            tooltip={dataFields.planning_world_list_id.tooltip}
                            mode={props.mode}
                            copy={props.copy}
                            onChange={props.onChange}
                            placeholder="add ID here"
                            linkTargetFunction={(id: String) => { return "https://whc.unesco.org/en/list/" + id } }
                            linkDescriptionFunction={(id: String) => { return "UNESCO Link" } }
                        />
                        <Verification
                            slug="planning_world_list_id"
                            allow_verify={props.user !== undefined && props.building.planning_world_list_id !== null && !props.edited}
                            onVerify={props.onVerify}
                            user_verified={props.user_verified.hasOwnProperty("planning_world_list_id")}
                            user_verified_as={props.user_verified.planning_world_list_id}
                            verified_count={props.building.verified.planning_world_list_id}
                        />
                    </>
                }
                <hr/>
                <LogicalDataEntry
                    slug='planning_listed'
                    title={dataFields.planning_listed.title}
                    tooltip={dataFields.planning_listed.tooltip}
                    value={props.building.planning_listed}
                    copy={props.copy}
                    onChange={props.onChange}
                    mode={props.mode}
                />
                <Verification
                    slug="planning_listed"
                    allow_verify={props.user !== undefined && props.building.planning_listed !== null && !props.edited}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("planning_listed")}
                    user_verified_as={props.user_verified.planning_listed}
                    verified_count={props.building.verified.planning_listed}
                />
                {(props.building.planning_listed == null || props.building.planning_listed == false) ? <></> :
                    <>
                        <SelectDataEntry
                            title={dataFields.planning_list_grade.title}
                            slug="planning_list_grade"
                            value={props.building.planning_list_grade}
                            mode={props.mode}
                            copy={props.copy}
                            onChange={props.onChange}
                            tooltip={dataFields.planning_list_grade.tooltip}
                            options={dataFields.planning_list_grade.items}
                        />
                        <NumericDataEntryWithFormattedLink
                            title={dataFields.planning_list_id.title}
                            slug="planning_list_id"
                            value={props.building.planning_list_id}
                            tooltip={dataFields.planning_list_id.tooltip}
                            mode={props.mode}
                            copy={props.copy}
                            onChange={props.onChange}
                            placeholder="add ID here"
                            linkTargetFunction={(id: String) => { return "https://historicengland.org.uk/listing/the-list/list-entry/" + id } }
                            linkDescriptionFunction={(id: String) => { return "Historic England Link" } }
                        />
                    </>
                }
                <hr/>
                <LogicalDataEntry
                    slug='planning_local_list'
                    title={dataFields.planning_local_list.title}
                    tooltip={dataFields.planning_local_list.tooltip}
                    value={props.building.planning_local_list}
                    copy={props.copy}
                    onChange={props.onChange}
                    mode={props.mode}
                />
                <Verification
                    slug="planning_local_list"
                    allow_verify={props.user !== undefined && props.building.planning_local_list !== null && !props.edited}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("planning_local_list")}
                    user_verified_as={props.user_verified.planning_local_list}
                    verified_count={props.building.verified.planning_local_list}
                />
                {(props.building.planning_local_list == null || props.building.planning_local_list == false) ? <></> :
                    <>
                        <DataEntry
                            title={dataFields.planning_local_list_url.title}
                            slug="planning_local_list_url"
                            value={props.building.planning_local_list_url}
                            tooltip={dataFields.planning_local_list_url.tooltip}
                            mode={props.mode}
                            copy={props.copy}
                            onChange={props.onChange}
                            isUrl={true}
                            placeholder="Please add relevant link here"
                            />
                        <Verification
                            slug="planning_local_list_url"
                            allow_verify={props.user !== undefined && props.building.planning_local_list_url !== null && !props.edited}
                            onVerify={props.onVerify}
                            user_verified={props.user_verified.hasOwnProperty("planning_local_list_url")}
                            user_verified_as={props.user_verified.planning_local_list_url}
                            verified_count={props.building.verified.planning_local_list_url}
                            />
                    </>
                }
                <hr/>
                <LogicalDataEntry
                    slug='planning_in_conservation_area'
                    title={dataFields.planning_in_conservation_area.title}
                    tooltip={dataFields.planning_in_conservation_area.tooltip}
                    value={props.building.planning_in_conservation_area}
                    copy={props.copy}
                    onChange={props.onChange}
                    mode={props.mode}
                />
                <Verification
                    slug="planning_in_conservation_area"
                    allow_verify={props.user !== undefined && props.building.planning_in_conservation_area !== null && !props.edited}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("planning_in_conservation_area")}
                    user_verified_as={props.user_verified.planning_in_conservation_area}
                    verified_count={props.building.verified.planning_in_conservation_area}
                />
                {(props.building.planning_in_conservation_area == null || props.building.planning_in_conservation_area == false) ? <></> :
                    <>
                        <DataEntry
                            title={dataFields.planning_in_conservation_area_url.title}
                            slug="planning_in_conservation_area_url"
                            value={props.building.planning_in_conservation_area_url}
                            tooltip={dataFields.planning_in_conservation_area_url.tooltip}
                            mode={props.mode}
                            copy={props.copy}
                            onChange={props.onChange}
                            isUrl={true}
                            placeholder="Please add CA appraisal link here"
                            />
                        {props.building.planning_in_conservation_area_url === "" ? "Our CA map records this building as not being within a CA. To help us verify this, please click ‘verify’ or, if info is incorrect, please add the local authority’s CA appraisal link." : "" }
                        {props.building.planning_in_conservation_area_url === "identified as listed: please replace with links" ? "Our CA map records this building as being within a CA. To help us verify this information please add the local authority’s CA appraisal link and then click ‘verify’." : "" }
                        <Verification
                            slug="planning_in_conservation_area_url"
                            allow_verify={props.user !== undefined && props.building.planning_in_conservation_area_url !== null && !props.edited}
                            onVerify={props.onVerify}
                            user_verified={props.user_verified.hasOwnProperty("planning_in_conservation_area_url")}
                            user_verified_as={props.user_verified.planning_in_conservation_area_url}
                            verified_count={props.building.verified.planning_in_conservation_area_url}
                        />
                    </>
                }
                <hr/>
                <LogicalDataEntry
                    slug='planning_in_apa'
                    title={dataFields.planning_in_apa.title}
                    tooltip={dataFields.planning_in_apa.tooltip}
                    value={props.building.planning_in_apa}
                    copy={props.copy}
                    onChange={props.onChange}
                    mode={props.mode}
                />
                <Verification
                    slug="planning_in_apa"
                    allow_verify={props.user !== undefined && props.building.planning_in_apa !== null && !props.edited}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("planning_in_apa")}
                    user_verified_as={props.user_verified.planning_in_apa}
                    verified_count={props.building.verified.planning_in_apa}
                />
                {(props.building.planning_in_apa == null || props.building.planning_in_apa == false) ? <></> :
                    <>
                        <DataEntry
                            title={dataFields.planning_in_apa_url.title}
                            slug="planning_in_apa_url"
                            value={props.building.planning_in_apa_url}
                            tooltip={dataFields.planning_in_apa_url.tooltip}
                            mode={props.mode}
                            copy={props.copy}
                            onChange={props.onChange}
                            isUrl={true}
                            placeholder="Please add relevant link here"
                            />
                        <Verification
                            slug="planning_in_apa_url"
                            allow_verify={props.user !== undefined && props.building.planning_in_apa_url !== null && !props.edited}
                            onVerify={props.onVerify}
                            user_verified={props.user_verified.hasOwnProperty("planning_in_apa_url")}
                            user_verified_as={props.user_verified.planning_in_apa_url}
                            verified_count={props.building.verified.planning_in_apa_url}
                            />
                    </>
                }
                <hr/>
                <LogicalDataEntry
                    slug='planning_scientific_interest'
                    title={dataFields.planning_scientific_interest.title}
                    tooltip={dataFields.planning_scientific_interest.tooltip}
                    value={props.building.planning_scientific_interest}
                    copy={props.copy}
                    onChange={props.onChange}
                    mode={props.mode}
                />
                <Verification
                    slug="planning_scientific_interest"
                    allow_verify={props.user !== undefined && props.building.planning_scientific_interest !== null && !props.edited}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("planning_scientific_interest")}
                    user_verified_as={props.user_verified.planning_scientific_interest}
                    verified_count={props.building.verified.planning_scientific_interest}
                />
                {(props.building.planning_scientific_interest == null || props.building.planning_scientific_interest == false) ? <></> :
                    <>
                        {/*<SelectDataEntry
                            title={dataFields.planning_scientific_interest_source_type.title}
                            slug="planning_scientific_interest_source_type"
                            value={props.building.planning_scientific_interest_source_type}
                            mode={props.mode}
                            copy={props.copy}
                            onChange={props.onChange}
                            tooltip={dataFields.planning_scientific_interest_source_type.tooltip}
                            options={dataFields.planning_scientific_interest_source_type.items}
                            placeholder={dataFields.planning_scientific_interest_source_type.example}
                        />
                        {(props.building.planning_scientific_interest_source_type == dataFields.planning_scientific_interest_source_type.items[0] ||
                            props.building.planning_scientific_interest_source_type == dataFields.planning_scientific_interest_source_type.items[1] ||
                            props.building.planning_scientific_interest_source_type == null) ? <></> :
                            <>
                        */}
                                <MultiDataEntry
                                    title={dataFields.planning_scientific_interest_source_links.title}
                                    slug="planning_scientific_interest_source_links"
                                    value={props.building.planning_scientific_interest_source_links}
                                    mode={props.mode}
                                    copy={props.copy}
                                    onChange={props.onChange}
                                    tooltip={dataFields.planning_scientific_interest_source_links.tooltip}
                                    placeholder="https://..."
                                    editableEntries={true}
                                    isUrl={true}
                                />
                            {/* </>
                        }*/}
                    </>
                }
                <hr/>
                <LogicalDataEntry
                    slug='planning_historic_area_assessment'
                    title={dataFields.planning_historic_area_assessment.title}
                    tooltip={dataFields.planning_historic_area_assessment.tooltip}
                    value={props.building.planning_historic_area_assessment}
                    copy={props.copy}
                    onChange={props.onChange}
                    mode={props.mode}
                />
                <Verification
                    slug="planning_historic_area_assessment"
                    allow_verify={props.user !== undefined && props.building.planning_historic_area_assessment !== null && !props.edited}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("planning_historic_area_assessment")}
                    user_verified_as={props.user_verified.planning_historic_area_assessment}
                    verified_count={props.building.verified.planning_historic_area_assessment}
                />
                {(props.building.planning_historic_area_assessment == null || props.building.planning_historic_area_assessment == false) ? <></> :
                    <>
                        <DataEntry
                            title={dataFields.planning_historic_area_assessment_url.title}
                            slug="planning_historic_area_assessment_url"
                            value={props.building.planning_historic_area_assessment_url}
                            tooltip={dataFields.planning_historic_area_assessment_url.tooltip}
                            mode={props.mode}
                            copy={props.copy}
                            onChange={props.onChange}
                            isUrl={true}
                            placeholder="Please add relevant link here"
                            />
                        <Verification
                            slug="planning_historic_area_assessment_url"
                            allow_verify={props.user !== undefined && props.building.planning_historic_area_assessment_url !== null && !props.edited}
                            onVerify={props.onVerify}
                            user_verified={props.user_verified.hasOwnProperty("planning_historic_area_assessment_url")}
                            user_verified_as={props.user_verified.planning_historic_area_assessment_url}
                            verified_count={props.building.verified.planning_historic_area_assessment_url}
                            />
                    </>
                }
            </DataEntryGroup>  
        </Fragment>
    );
};
const PlanningConservationContainer = withCopyEdit(PlanningConservationView);

export default PlanningConservationContainer;
