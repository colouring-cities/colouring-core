import React, { Fragment } from 'react';

import withCopyEdit from '../data-container';
import DataEntry from '../data-components/data-entry';
import CheckboxDataEntry from '../data-components/checkbox-data-entry';
import SelectDataEntry from '../data-components/select-data-entry';

/**
* Planning view/edit section
*/
const PlanningView = (props) => (
    <Fragment>
        <DataEntry
            title="Planning portal link"
            slug="planning_portal_link"
            value={props.building.planning_portal_link}
            mode={props.mode}
            copy={props.copy}
            onChange={props.onChange}
            />
        <CheckboxDataEntry
            title="In a conservation area?"
            slug="planning_in_conservation_area"
            value={props.building.planning_in_conservation_area}
            mode={props.mode}
            copy={props.copy}
            onChange={props.onCheck}
            />
        <DataEntry
            title="Conservation area name"
            slug="planning_conservation_area_name"
            value={props.building.planning_conservation_area_name}
            mode={props.mode}
            copy={props.copy}
            onChange={props.onChange}
            />
        <CheckboxDataEntry
            title="Is listed on the National Heritage List for England?"
            slug="planning_in_list"
            value={props.building.planning_in_list}
            mode={props.mode}
            copy={props.copy}
            onChange={props.onCheck}
            />
        <DataEntry
            title="National Heritage List for England list id"
            slug="planning_list_id"
            value={props.building.planning_list_id}
            mode={props.mode}
            copy={props.copy}
            onChange={props.onChange}
            />
        <SelectDataEntry
            title="National Heritage List for England list type"
            slug="planning_list_cat"
            value={props.building.planning_list_cat}
            mode={props.mode}
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
            title="Listing grade"
            slug="planning_list_grade"
            value={props.building.planning_list_grade}
            mode={props.mode}
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
            title="Heritage at risk list id"
            slug="planning_heritage_at_risk_id"
            value={props.building.planning_heritage_at_risk_id}
            mode={props.mode}
            copy={props.copy}
            onChange={props.onChange}
            />
        <DataEntry
            title="World heritage list id"
            slug="planning_world_list_id"
            value={props.building.planning_world_list_id}
            mode={props.mode}
            copy={props.copy}
            onChange={props.onChange}
            />
        <CheckboxDataEntry
            title="In the Greater London Historic Environment Record?"
            slug="planning_in_glher"
            value={props.building.planning_in_glher}
            mode={props.mode}
            copy={props.copy}
            onChange={props.onCheck}
            />
        <DataEntry
            title="Greater London Historic Environment Record link"
            slug="planning_glher_url"
            value={props.building.planning_glher_url}
            mode={props.mode}
            copy={props.copy}
            onChange={props.onChange}
            />
        <CheckboxDataEntry
            title="In an Architectural Priority Area?"
            slug="planning_in_apa"
            value={props.building.planning_in_apa}
            mode={props.mode}
            copy={props.copy}
            onChange={props.onCheck}
            />
        <DataEntry
            title="Architectural Priority Area name"
            slug="planning_apa_name"
            value={props.building.planning_apa_name}
            mode={props.mode}
            copy={props.copy}
            onChange={props.onChange}
            />
        <DataEntry
            title="Architectural Priority Area tier"
            slug="planning_apa_tier"
            value={props.building.planning_apa_tier}
            mode={props.mode}
            copy={props.copy}
            onChange={props.onChange}
            />
        <CheckboxDataEntry
            title="Is locally listed?"
            slug="planning_in_local_list"
            value={props.building.planning_in_local_list}
            mode={props.mode}
            copy={props.copy}
            onChange={props.onCheck}
            />
        <DataEntry
            title="Local list link"
            slug="planning_local_list_url"
            value={props.building.planning_local_list_url}
            mode={props.mode}
            copy={props.copy}
            onChange={props.onChange}
            />
        <CheckboxDataEntry
            title="Within a historic area assessment?"
            slug="planning_in_historic_area_assessment"
            value={props.building.planning_in_historic_area_assessment}
            mode={props.mode}
            copy={props.copy}
            onChange={props.onCheck}
            />
        <DataEntry
            title="Historic area assessment link"
            slug="planning_historic_area_assessment_url"
            value={props.building.planning_historic_area_assessment_url}
            mode={props.mode}
            copy={props.copy}
            onChange={props.onChange}
            />
        <CheckboxDataEntry
            title="Is the building proposed for demolition?"
            slug="planning_demolition_proposed"
            value={props.building.planning_demolition_proposed}
            mode={props.mode}
            copy={props.copy}
            onChange={props.onCheck}
            disabled={true}
            />
        <CheckboxDataEntry
            title="Has the building been demolished?"
            slug="planning_demolition_complete"
            value={props.building.planning_demolition_complete}
            mode={props.mode}
            copy={props.copy}
            onChange={props.onCheck}
            disabled={true}
            />
        <DataEntry
            title="Dates of construction and demolition of previous buildings on site"
            slug="planning_demolition_history"
            value={props.building.planning_demolition_history}
            mode={props.mode}
            copy={props.copy}
            onChange={props.onChange}
            disabled={true}
            />
    </Fragment>
)
const PlanningContainer = withCopyEdit(PlanningView);

export default PlanningContainer
