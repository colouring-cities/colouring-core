import React, { Fragment } from 'react';

import InfoBox from '../../components/info-box';
import { dataFields } from '../../data_fields';
import CheckboxDataEntry from '../data-components/checkbox-data-entry';
import DataEntry from '../data-components/data-entry';
import { DataEntryGroup } from '../data-components/data-entry-group';
import SelectDataEntry from '../data-components/select-data-entry';
import withCopyEdit from '../data-container';

import { CategoryViewProps } from './category-view-props';

/**
* Planning view/edit section
*/
const PlanningView: React.FunctionComponent<CategoryViewProps> = (props) => (
    <Fragment>
        <DataEntry
            title={dataFields.planning_portal_link.title}
            slug="planning_portal_link"
            value={props.building.planning_portal_link}
            mode={props.mode}
            copy={props.copy}
            onChange={props.onChange}
            />
        <DataEntryGroup name="Planning Status">
            <CheckboxDataEntry
                title="Is a planning application live for this site?"
                slug="planning_live_application"
                value={null}
                disabled={true}
                />
            <CheckboxDataEntry
                title={dataFields.planning_demolition_proposed.title}
                slug="planning_demolition_proposed"
                value={props.building.planning_demolition_proposed}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
                disabled={true}
                />
            <CheckboxDataEntry
                title="Has this application recently been been approved/refused?"
                slug="planning_recent_outcome"
                value={null}
                disabled={true}
                />
            <CheckboxDataEntry
                title="Has the work been carried out?"
                slug="planning_carried_out"
                value={null}
                disabled={true}
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
                disabled={true}
                />
            <DataEntry
                title={dataFields.planning_demolition_history.title}
                slug="planning_demolition_history"
                value={props.building.planning_demolition_history}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
                disabled={true}
                />
            */}
        </DataEntryGroup>
        <DataEntryGroup name="Designation and Protection" collapsed={false} >
            <CheckboxDataEntry
                title={dataFields.planning_in_conservation_area.title}
                slug="planning_in_conservation_area"
                value={props.building.planning_in_conservation_area}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
                />
            <DataEntry
                title={dataFields.planning_conservation_area_name.title}
                slug="planning_conservation_area_name"
                value={props.building.planning_conservation_area_name}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
                />
            <CheckboxDataEntry
                title={dataFields.planning_in_list.title}
                slug="planning_in_list"
                value={props.building.planning_in_list}
                mode={props.mode}
                disabled={true}
                copy={props.copy}
                onChange={props.onChange}
                />
            <DataEntry
                title={dataFields.planning_list_id.title}
                slug="planning_list_id"
                value={props.building.planning_list_id}
                mode={props.mode}
                disabled={true}
                copy={props.copy}
                onChange={props.onChange}
                />
            <SelectDataEntry
                title={dataFields.planning_list_cat.title}
                slug="planning_list_cat"
                value={props.building.planning_list_cat}
                mode={props.mode}
                disabled={true}
                copy={props.copy}
                onChange={props.onChange}
                options={[
                    "Listed Building",
                    "Scheduled Monument",
                    "World Heritage Site",
                    "Building Preservation Notice",
                    "None"
                ]}
                />
            <SelectDataEntry
                title={dataFields.planning_list_grade.title}
                slug="planning_list_grade"
                value={props.building.planning_list_grade}
                mode={props.mode}
                disabled={true}
                copy={props.copy}
                onChange={props.onChange}
                options={[
                    "I",
                    "II*",
                    "II",
                    "None"
                ]}
                />
            <DataEntry
                title={dataFields.planning_heritage_at_risk_id.title}
                slug="planning_heritage_at_risk_id"
                value={props.building.planning_heritage_at_risk_id}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
                />
            <DataEntry
                title={dataFields.planning_world_list_id.title}
                slug="planning_world_list_id"
                value={props.building.planning_world_list_id}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
                />
            <CheckboxDataEntry
                title={dataFields.planning_in_glher.title}
                slug="planning_in_glher"
                value={props.building.planning_in_glher}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
                />
            <DataEntry
                title={dataFields.planning_glher_url.title}
                slug="planning_glher_url"
                value={props.building.planning_glher_url}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
                />
            <CheckboxDataEntry
                title={dataFields.planning_in_apa.title}
                slug="planning_in_apa"
                value={props.building.planning_in_apa}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
                />
            <DataEntry
                title={dataFields.planning_apa_name.title}
                slug="planning_apa_name"
                value={props.building.planning_apa_name}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
                />
            <DataEntry
                title={dataFields.planning_apa_tier.title}
                slug="planning_apa_tier"
                value={props.building.planning_apa_tier}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
                />
            <CheckboxDataEntry
                title={dataFields.planning_in_local_list.title}
                slug="planning_in_local_list"
                value={props.building.planning_in_local_list}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
                />
            <DataEntry
                title={dataFields.planning_local_list_url.title}
                slug="planning_local_list_url"
                value={props.building.planning_local_list_url}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
                />
            <CheckboxDataEntry
                title={dataFields.planning_in_historic_area_assessment.title}
                slug="planning_in_historic_area_assessment"
                value={props.building.planning_in_historic_area_assessment}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
                />
            <DataEntry
                title={dataFields.planning_historic_area_assessment_url.title}
                slug="planning_historic_area_assessment_url"
                value={props.building.planning_historic_area_assessment_url}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
                />
        </DataEntryGroup>
    </Fragment>
);
const PlanningContainer = withCopyEdit(PlanningView);

export default PlanningContainer;
