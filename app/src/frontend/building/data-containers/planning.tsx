import React, { Fragment } from 'react';

import '../../map/map-button.css';
import { Link } from 'react-router-dom';
import InfoBox from '../../components/info-box';
import NumericDataEntryWithFormattedLink from '../data-components/numeric-data-entry-with-formatted-link';
import { buildingUserFields, dataFields } from '../../config/data-fields-config';
import NumericDataEntry from '../data-components/numeric-data-entry';
import UserOpinionEntry from '../data-components/user-opinion-data-entry';

import DataEntry from '../data-components/data-entry';
import { LogicalDataEntry } from '../data-components/logical-data-entry/logical-data-entry';
import { DataEntryGroup } from '../data-components/data-entry-group';
import SelectDataEntry from '../data-components/select-data-entry';
import Verification from '../data-components/verification';
import withCopyEdit from '../data-container';
import PlanningDataOfficialDataEntry from '../data-components/planning-data-entry';
import { CategoryViewProps } from './category-view-props';
import { Category } from '../../config/categories-config';
import { useDisplayPreferences } from '../../displayPreferences-context';
import { processParam } from '../../../api/parameters';
import { MultiDataEntry } from '../data-components/multi-data-entry/multi-data-entry';
import YearDataEntry from '../data-components/year-data-entry';
import { t } from 'i18next';

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

const PlanningView: React.FunctionComponent<CategoryViewProps> = (props) => {
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
    const { flood, floodSwitchOnClick, housing, housingSwitchOnClick, creative, creativeSwitchOnClick, vista, vistaSwitchOnClick, parcel, parcelSwitchOnClick, conservation, conservationSwitchOnClick, darkLightTheme } = useDisplayPreferences();
    const communityLinkUrl = `/${props.mode}/${Category.Community}/${props.building.building_id}`;
    return (
    <Fragment>
        <DataEntryGroup name={t("Current planning applications")} collapsed={true} >
            <DataEntryGroup name={t("Official data")}>
                <InfoBox>
                    {t("This section provides data on active applications. We define these as applications with any activity in the last year.")}
                    <br />
                    {t("To comment on an application follow the application link if provided, or visit the relevant local authority's planning page.")}
                </InfoBox>
                {props.building.planning_data ?
                    <PlanningDataOfficialDataEntry  
                        shownData={props.building.planning_data.filter(item => isArchived(item) == false)}
                        messageOnMissingData={
                            props.building.planning_data.length > 0 ?
                                t("Only past application data is currently available for this site")
                                :
                                t("No live planning data are currently available for this building from the Planning London Datahub.")
                        }
                    />
                : <></>
                }
            </DataEntryGroup>
            <DataEntryGroup name={t("Year of completion")} collapsed={true} >
                <DataEntry
                    title={t("Was the building completed?")}
                    slug=""
                    value=""
                    mode='view'
                    tooltip={t('Coming Soon')}
                />
                <DataEntry
                    title={t("Year of completion")}
                    slug=""
                    value=""
                    mode='view'
                    tooltip={t('Coming Soon')}
                />
            </DataEntryGroup>
            <DataEntryGroup name={t("Incomplete/missing data")} collapsed={true} >
                <DataEntry
                    title={t("Is information on a planning application relating to this building missing?")}
                    slug=""
                    value=""
                    mode='view'
                    tooltip={t('Coming Soon')}
                />
                <DataEntry
                    title={t("Link (to correct data)")}
                    slug=""
                    value=""
                    mode='view'
                    tooltip={t('Coming Soon')}
                />
                <InfoBox>
                    {t("If you feel there are incorrect or missing data relating to this building please contact: planningdata@London.gov.uk")}
                </InfoBox>
            </DataEntryGroup>
        </DataEntryGroup>
        <DataEntryGroup name={t("Past applications")} collapsed={true} >
            <InfoBox>
                {t("This section provides data on past applications where available from the GLA, including those with no decision in over a year")}
            </InfoBox>
            {props.building.planning_data ?
                <PlanningDataOfficialDataEntry  
                    shownData={props.building.planning_data.filter(item => isArchived(item))}
                    messageOnMissingData={
                        props.building.planning_data.length > 0 ?
                           t("Only current application data is currently available for this site")
                            :
                            t("No live planning data are currently available for this building from the Planning London Datahub.")
                    }
                />
            : <></>
            }
        </DataEntryGroup>
        <DataEntryGroup name={t("Possible future applications")} collapsed={true} >
            <InfoBox type='info'>{t("Click and colour buildings here if you think they may be subject to a future planning application involving demolition. To add your opinion on how well this building works, please also visit the")} <Link to={communityLinkUrl}>{t("Community")}</Link></InfoBox>
            {
            props.mapColourScale != "community_expected_planning_application_total" ?
                <button className={`map-switcher-inline disabled-state btn btn-outline btn-outline-dark ${darkLightTheme}`} onClick={switchToExpectedApplicationMapStyle}>
                {t('Click here to view possible locations of future applications')}
                </button>
            :
                <button className={`map-switcher-inline enabled-state btn btn-outline btn-outline-dark ${darkLightTheme}`} onClick={switchToAllPlanningApplicationsMapStyle}>
                {t('Click to see planning applications')}
                </button>
            }
            <UserOpinionEntry
                slug='community_expected_planning_application'
                title={t(buildingUserFields.community_expected_planning_application.title)}
                userValue={props.building.community_expected_planning_application}

                onChange={props.onSaveChange}
                mode={props.mode}
                copy={props.copy}
            />
            <InfoBox type='warning'>
                {t("Further improvements to this feature are currently being made.")}
            </InfoBox>
        </DataEntryGroup>
        <DataEntryGroup name={t("Planning zones")} collapsed={true} >
            <InfoBox>
                {t("To view planning zone data for London click the buttons below. You may need to zoom out Information on whether a specific building is in a zone will be added automatically in future.")}   
            </InfoBox>
            <LogicalDataEntry
            title={t("Is the building inside a Flood Zone?")}
            slug="planning_live_application"
            value={null}
            disabled={true}
            tooltip={t("the GLA official description: \"All areas with more than a 1 in 1,000 annual probability of either river or sea flooding.\"")}
            />
            <button className={`map-switcher-inline ${flood}-state btn btn-outline btn-outline-dark ${darkLightTheme}`} onClick={floodSwitchOnClick}>
                {(flood === 'enabled')? t('Click to hide Flood Zones') : t('Click to see Flood Zones mapped')}
            </button>
            <LogicalDataEntry
            title={t("Is the building in a Housing Zone?")}
            slug="planning_live_application"
            value={null}
            disabled={true}
            tooltip={t("the GLA official description: \"Housing zones are areas funded by the Mayor and government to attract developers and relevant partners to build new homes.\"")}
            />
            <button className={`map-switcher-inline ${housing}-state btn btn-outline btn-outline-dark ${darkLightTheme}`} onClick={housingSwitchOnClick}>
                {(housing === 'enabled')? t('Click to hide Housing Zones') : t('Click to see Housing Zones mapped')}
            </button>
            <LogicalDataEntry
            title={t("Is the building in a Creative Enterprise Zone?")}
            slug="planning_live_application"
            value={null}
            disabled={true}
            tooltip={t("GLA official description: \"Creative Enterprise Zones are a new Mayoral initiative to designate areas of London where artists and creative businesses can find permanent affordable space to work; are supported to start-up and grow; and where local people are helped to learn creative sector skills and find new jobs.\"")}
            />
            <button className={`map-switcher-inline ${creative}-state btn btn-outline btn-outline-dark ${darkLightTheme}`} onClick={creativeSwitchOnClick}>
                {(creative === 'enabled')? t('Click to hide Creative Enterprise Zones') : t('Click to see Creative Enterprise Zones')}
            </button>
            <LogicalDataEntry
            title={t("Is the building within a Protected Vista?")}
            slug="planning_live_application"
            value={null}
            disabled={true}
            tooltip={t("GLA official description: \"The Protected Vistas are established in the London Plan with more detailed guidance provided in the London View Management Framework (LVMF). The London Plan seeks to protect the significant views which help to define London, including the panoramas, linear views and townscape views in this layer.\"")}
            />
            <button className={`map-switcher-inline ${vista}-state btn btn-outline btn-outline-dark ${darkLightTheme}`} onClick={vistaSwitchOnClick}>
                {(vista === 'enabled')? t('Click to hide Protected Vistas') : t('Click to see Protected Vistas')}
            </button>
            {/*
                <DataEntry
                title={t(dataFields.planning_glher_url.title)}
                slug="planning_glher_url"
                value={props.building.planning_glher_url}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
                isUrl={true}
                placeholder={t("Please add relevant link here"
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
        <DataEntryGroup name={t("Heritage assets and building protection")} collapsed={true} >
            <InfoBox>
            {t('Help us produce the most accurate map possible for London\'s designated/protected buildings. Please add data if missing or click "Verify" where entries are correct.')}
            </InfoBox>
            {
                props.mapColourScale != "planning_combined" ?
                    <button className={`map-switcher-inline disabled-state btn btn-outline btn-outline-dark ${darkLightTheme}`} onClick={switchToBuildingProtectionMapStyle}>
                    {t('Click to see individual protected buildings mapped')}
                    </button>
                :
                    <button className={`map-switcher-inline enabled-state btn btn-outline btn-outline-dark ${darkLightTheme}`} onClick={switchToAllPlanningApplicationsMapStyle}>
                    {t('Click to see planning applications')}
                    </button>
            }
            <button className={`map-switcher-inline ${conservation}-state btn btn-outline btn-outline-dark ${darkLightTheme}`} onClick={conservationSwitchOnClick}>
                {(conservation === 'enabled')? t('Click to hide Conservation Areas') : t('Click to see Conservation Areas')}
                </button>
            <NumericDataEntryWithFormattedLink
                title={t(dataFields.planning_list_id.title)}
                slug="planning_list_id"
                value={props.building.planning_list_id}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
                placeholder={t("add ID here")}
                linkTargetFunction={(id: String) => { return "https://historicengland.org.uk/listing/the-list/list-entry/" + id + "?section=official-list-entry" } }
                linkDescriptionFunction={(id: String) => { return "ID Link" } }
            />
            <Verification
                slug="planning_list_id"
                allow_verify={props.user !== undefined && props.building.planning_list_id !== null && !props.edited}
                onVerify={props.onVerify}
                user_verified={props.user_verified.hasOwnProperty("planning_list_id")}
                user_verified_as={props.user_verified.planning_list_id}
                verified_count={props.building.verified.planning_list_id}
                />
            <SelectDataEntry
                title={t(dataFields.planning_list_grade.title)}
                slug="planning_list_grade"
                value={props.building.planning_list_grade}
                mode={props.mode}
                disabled={false}
                copy={props.copy}
                onChange={props.onChange}
                options={[
                    "I",
                    "II*",
                    "II",
                    "None"
                ]}
                />
            <Verification
                slug="planning_list_grade"
                allow_verify={props.user !== undefined && props.building.planning_list_grade !== null && !props.edited}
                onVerify={props.onVerify}
                user_verified={props.user_verified.hasOwnProperty("planning_list_grade")}
                user_verified_as={props.user_verified.planning_list_grade}
                verified_count={props.building.verified.planning_list_grade}
                />
            <DataEntry
                title={t(dataFields.planning_heritage_at_risk_url.title)}
                slug="planning_heritage_at_risk_url"
                value={props.building.planning_heritage_at_risk_url}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
                placeholder={t("Please add relevant link here")}
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
            <NumericDataEntryWithFormattedLink
                title={t(dataFields.planning_world_list_id.title)}
                slug="planning_world_list_id"
                value={props.building.planning_world_list_id}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
                placeholder={t("add ID here")}
                linkTargetFunction={(id: String) => { return "https://whc.unesco.org/en/list/" + id } }
                linkDescriptionFunction={(id: String) => { return "ID Link" } }
                />
            <Verification
                slug="planning_world_list_id"
                allow_verify={props.user !== undefined && props.building.planning_world_list_id !== null && !props.edited}
                onVerify={props.onVerify}
                user_verified={props.user_verified.hasOwnProperty("planning_world_list_id")}
                user_verified_as={props.user_verified.planning_world_list_id}
                verified_count={props.building.verified.planning_world_list_id}
                />
            <DataEntry
                title={t(dataFields.planning_local_list_url.title)}
                slug="planning_local_list_url"
                value={props.building.planning_local_list_url}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
                isUrl={true}
                placeholder={t("Please add relevant link here")}
                />
            <Verification
                slug="planning_local_list_url"
                allow_verify={props.user !== undefined && props.building.planning_local_list_url !== null && !props.edited}
                onVerify={props.onVerify}
                user_verified={props.user_verified.hasOwnProperty("planning_local_list_url")}
                user_verified_as={props.user_verified.planning_local_list_url}
                verified_count={props.building.verified.planning_local_list_url}
                />

            {/*
            <DataEntry
                title={t(dataFields.planning_in_conservation_area_id.title)}
                slug="planning_in_conservation_area_id"
                value={props.building.planning_in_conservation_area_id}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
                placeholder={t("Please add Conservation Area identifier"
                />
            <Verification
                slug="planning_in_conservation_area_id"
                allow_verify={props.user !== undefined && props.building.planning_in_conservation_area_id !== null && !props.edited}
                onVerify={props.onVerify}
                user_verified={props.user_verified.hasOwnProperty("planning_in_conservation_area_id")}
                user_verified_as={props.user_verified.planning_in_conservation_area_id}
                verified_count={props.building.verified.planning_in_conservation_area_id}
                />
            */}
            <DataEntry
                title={t(dataFields.planning_in_conservation_area_url.title)}
                slug="planning_in_conservation_area_url"
                value={props.building.planning_in_conservation_area_url}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
                isUrl={true}
                placeholder={t("Please add CA appraisal link here")}
                />
            {props.building.planning_in_conservation_area_url === "" ? t("Our CA map records this building as not being within a CA. To help us verify this, please click ‘verify’ or, if info is incorrect, please add the local authority’s CA appraisal link.") : "" }
            {props.building.planning_in_conservation_area_url === t("identified as listed: please replace with links") ? t("Our CA map records this building as being within a CA. To help us verify this information please add the local authority’s CA appraisal link and then click ‘verify’.") : "" }
            <Verification
                slug="planning_in_conservation_area_url"
                allow_verify={props.user !== undefined && props.building.planning_in_conservation_area_url !== null && !props.edited}
                onVerify={props.onVerify}
                user_verified={props.user_verified.hasOwnProperty("planning_in_conservation_area_url")}
                user_verified_as={props.user_verified.planning_in_conservation_area_url}
                verified_count={props.building.verified.planning_in_conservation_area_url}
                />
            <DataEntry
                title={t(dataFields.planning_in_apa_url.title)}
                slug="planning_in_apa_url"
                value={props.building.planning_in_apa_url}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
                isUrl={true}
                placeholder={t("Please add relevant link here")}
                />
            <Verification
                slug="planning_in_apa_url"
                allow_verify={props.user !== undefined && props.building.planning_in_apa_url !== null && !props.edited}
                onVerify={props.onVerify}
                user_verified={props.user_verified.hasOwnProperty("planning_in_apa_url")}
                user_verified_as={props.user_verified.planning_in_apa_url}
                verified_count={props.building.verified.planning_in_apa_url}
                />
            {/*
            <DataEntry
                title={t(dataFields.planning_conservation_area_name.title)}
                slug="planning_conservation_area_name"
                value={props.building.planning_conservation_area_name}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
                />
            <Verification
                slug="planning_conservation_area_name"
                allow_verify={props.user !== undefined && props.building.planning_conservation_area_name !== null && !props.edited}
                onVerify={props.onVerify}
                user_verified={props.user_verified.hasOwnProperty("planning_conservation_area_name")}
                user_verified_as={props.user_verified.planning_conservation_area_name}
                verified_count={props.building.verified.planning_conservation_area_name}
                />
            */}
            <DataEntry
                title={t(dataFields.planning_historic_area_assessment_url.title)}
                slug="planning_historic_area_assessment_url"
                value={props.building.planning_historic_area_assessment_url}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
                isUrl={true}
                placeholder={t("Please add relevant link here")}
                />
            <Verification
                slug="planning_historic_area_assessment_url"
                allow_verify={props.user !== undefined && props.building.planning_historic_area_assessment_url !== null && !props.edited}
                onVerify={props.onVerify}
                user_verified={props.user_verified.hasOwnProperty("planning_historic_area_assessment_url")}
                user_verified_as={props.user_verified.planning_historic_area_assessment_url}
                verified_count={props.building.verified.planning_historic_area_assessment_url}
                />
        </DataEntryGroup>      
        <DataEntryGroup name={t("Land ownership")} collapsed={true} >
            <InfoBox>
                {t("This section is designed to provide information on land parcels and their ownership type. Can you help us collect this information?")}
            </InfoBox>
            <SelectDataEntry
                slug='community_public_ownership'
                title={t(dataFields.community_public_ownership.title)}
                value={props.building.community_public_ownership}
                options={dataFields.community_public_ownership.items}
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
            <DataEntry
                title={t("Source Type")}
                slug=""
                value=""
                mode='view'
                tooltip={t('Coming Soon')}
            />
            <MultiDataEntry
                slug='community_public_ownership_sources'
                title={t(dataFields.community_public_ownership_sources.title)}
                isUrl={true}
                placeholder={'https://...'}
                editableEntries={true}
                value={props.building.community_public_ownership_sources}
                onChange={props.onChange}
                mode={props.mode}
                copy={props.copy}
            />
            <hr/>
            <DataEntry
                title={t(dataFields.size_parcel_geometry.title)}
                slug="size_parcel_geometry"
                value={props.building.size_parcel_geometry}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
                tooltip={t(dataFields.size_parcel_geometry.tooltip)}
                placeholder={"https://..."}
                isUrl={true}
            />
            <button className={`map-switcher-inline ${parcel}-state btn btn-outline btn-outline-dark ${darkLightTheme}`} onClick={parcelSwitchOnClick}>
                {(parcel === 'enabled')? t('Click to hide sample land parcel data') : t('Click to show sample land parcel data')}
            </button>
        </DataEntryGroup>
    </Fragment>
)};
const PlanningContainer = withCopyEdit(PlanningView);

export default PlanningContainer;
