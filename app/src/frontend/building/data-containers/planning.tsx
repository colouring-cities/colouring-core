import React, { Fragment } from 'react';

import InfoBox from '../../components/info-box';
import { dataFields } from '../../config/data-fields-config';
import CheckboxDataEntry from '../data-components/checkbox-data-entry';
import NumericDataEntryWithFormattedLink from '../data-components/numeric-data-entry-with-formatted-link';import DataEntry from '../data-components/data-entry';
import { DataEntryGroup } from '../data-components/data-entry-group';
import SelectDataEntry from '../data-components/select-data-entry';
import Verification from '../data-components/verification';
import withCopyEdit from '../data-container';

import { CategoryViewProps } from './category-view-props';

/**
* Planning view/edit section
*/
const PlanningView: React.FunctionComponent<CategoryViewProps> = (props) => (
    <Fragment>
        <InfoBox type='warning'>
            This section is under development as part of the project CLPV Tool. For more details and progress <a href="https://github.com/colouring-cities/manual/wiki/G2.-Data-capture-(2).-Live-streaming-and-automated-methods">read here</a>.
        </InfoBox>
        <DataEntry
            title={dataFields.planning_portal_link.title}
            slug="planning_portal_link"
            value={props.building.planning_portal_link}
            mode={props.mode}
            copy={props.copy}
            onChange={props.onChange}
            />
        <Verification
            slug="planning_portal_link"
            allow_verify={props.user !== undefined && props.building.planning_portal_link !== null && !props.edited}
            onVerify={props.onVerify}
            user_verified={props.user_verified.hasOwnProperty("planning_portal_link")}
            user_verified_as={props.user_verified.planning_portal_link}
            verified_count={props.building.verified.planning_portal_link}
            />

        <DataEntryGroup name="Planning Status">
            <CheckboxDataEntry
                title="Is a planning application live for this site?"
                slug="planning_live_application"
                value={null}
                disabled={false}
                />
            <CheckboxDataEntry
                title={dataFields.planning_demolition_proposed.title}
                slug="planning_demolition_proposed"
                value={props.building.planning_demolition_proposed}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
                disabled={false}
                />
            <CheckboxDataEntry
                title="Has this application recently been been approved/refused?"
                slug="planning_recent_outcome"
                value={null}
                disabled={false}
                />
            <CheckboxDataEntry
                title="Has the work been carried out?"
                slug="planning_carried_out"
                value={null}
                disabled={false}
                />
            <InfoBox msg="For historical planning applications see Planning Portal link" />
            {/*
                Move to Demolition:

                <CheckboxDataEntry
                title={dataFields.planning_demolition_complete.title}
                slug="planning_demolition_complete"
                value={props.building.planning_demolition_complete}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
                disabled={false}
                />
            <DataEntry
                title={dataFields.planning_demolition_history.title}
                slug="planning_demolition_history"
                value={props.building.planning_demolition_history}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
                disabled={false}
                />
            */}
        </DataEntryGroup>
        <DataEntryGroup name="Designation/protection" collapsed={false} >
            <DataEntryGroup name="Conservation" collapsed={false} >
                <DataEntry
                    title={dataFields.planning_in_conservation_area_url.title}
                    slug="planning_in_conservation_area_url"
                    value={props.building.planning_in_conservation_area_url}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    isUrl={true}
                    placeholder="Please add relevant link here"
                    />
                <Verification
                    slug="planning_in_conservation_area_url"
                    allow_verify={props.user !== undefined && props.building.planning_in_conservation_area_url !== null && !props.edited}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("planning_in_conservation_area_url")}
                    user_verified_as={props.user_verified.planning_in_conservation_area_url}
                    verified_count={props.building.verified.planning_in_conservation_area_url}
                    />
                <DataEntry
                    title={dataFields.planning_conservation_area_name.title}
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
            </DataEntryGroup>
            <DataEntryGroup name="Listed buildings & scheduled monuments" collapsed={false} >
                <NumericDataEntryWithFormattedLink
                    title={dataFields.planning_list_id.title}
                    slug="planning_list_id"
                    value={props.building.planning_list_id}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    placeholder="If yes, add ID"
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
                    title={dataFields.planning_list_grade.title}
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
                    title={dataFields.planning_heritage_at_risk_url.title}
                    slug="planning_heritage_at_risk_url"
                    value={props.building.planning_heritage_at_risk_url}
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
            </DataEntryGroup>
            <DataEntryGroup name="Other types of protection & recording" collapsed={false} >
                <NumericDataEntryWithFormattedLink
                    title={dataFields.planning_world_list_id.title}
                    slug="planning_world_list_id"
                    value={props.building.planning_world_list_id}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    placeholder="If yes, add ID"
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
                    title={dataFields.planning_in_apa_url.title}
                    slug="planning_in_apa_url"
                    value={props.building.planning_in_apa_url}
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
                <DataEntry
                    title={dataFields.planning_local_list_url.title}
                    slug="planning_local_list_url"
                    value={props.building.planning_local_list_url}
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
                <DataEntry
                    title={dataFields.planning_historic_area_assessment_url.title}
                    slug="planning_historic_area_assessment_url"
                    value={props.building.planning_historic_area_assessment_url}
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
                <InfoBox msg="Designation data is currently incomplete. We are aiming for 100% coverage by April 2023." />
            </DataEntryGroup>
        </DataEntryGroup>
    </Fragment>
);
const PlanningContainer = withCopyEdit(PlanningView);

export default PlanningContainer;
