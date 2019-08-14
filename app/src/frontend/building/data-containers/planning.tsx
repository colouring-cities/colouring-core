import React from 'react';

import withCopyEdit from '../data-container';
import DataEntry from '../data-components/data-entry';

/**
* Planning view/edit section
*/
const PlanningView = (props) => (
    <dl className="data-list">
        <DataEntry
            title="Planning portal link"
            slug="planning_portal_link"
            value={props.building.planning_portal_link}
            copy={props.copy}
            />
        {
            // "type": "text"
        }
        <DataEntry
            title="In a conservation area?"
            slug="planning_in_conservation_area"
            value={props.building.planning_in_conservation_area}
            copy={props.copy}
            />
        {
            // "type": "checkbox"
        }
        <DataEntry
            title="Conservation area name"
            slug="planning_conservation_area_name"
            value={props.building.planning_conservation_area_name}
            copy={props.copy}
            />
        {
            // "type": "text"
        }
        <DataEntry
            title="Is listed on the National Heritage List for England?"
            slug="planning_in_list"
            value={props.building.planning_in_list}
            copy={props.copy}
            />
        {
            // "type": "checkbox"
        }
        <DataEntry
            title="National Heritage List for England list id"
            slug="planning_list_id"
            value={props.building.planning_list_id}
            copy={props.copy}
            />
        {
            // "type": "text"
        }
        <DataEntry
            title="National Heritage List for England list type"
            slug="planning_list_cat"
            value={props.building.planning_list_cat}
            copy={props.copy}
            />
        {
            // "type": "text_list",
            // "options": [
            //     "Listed Building"
            //     "Scheduled Monument"
            //     "World Heritage Site"
            //     "Building Preservation Notice"
            //     "None"
            // ]
        }
        <DataEntry
            title="Listing grade"
            slug="planning_list_grade"
            value={props.building.planning_list_grade}
            copy={props.copy}
            />
        {
            // "type": "text_list",
            // "options": [
            //     "I"
            //     "II*"
            //     "II"
            //     "None"
            // ]
        }
        <DataEntry
            title="Heritage at risk list id"
            slug="planning_heritage_at_risk_id"
            value={props.building.planning_heritage_at_risk_id}
            copy={props.copy}
            />
        {
            // "type": "text"
        }
        <DataEntry
            title="World heritage list id"
            slug="planning_world_list_id"
            value={props.building.planning_world_list_id}
            copy={props.copy}
            />
        {
            // "type": "text"
        }
        <DataEntry
            title="In the Greater London Historic Environment Record?"
            slug="planning_in_glher"
            value={props.building.planning_in_glher}
            copy={props.copy}
            />
        {
            // "type": "checkbox"
        }
        <DataEntry
            title="Greater London Historic Environment Record link"
            slug="planning_glher_url"
            value={props.building.planning_glher_url}
            copy={props.copy}
            />
        {
            // "type": "text"
        }
        <DataEntry
            title="In an Architectural Priority Area?"
            slug="planning_in_apa"
            value={props.building.planning_in_apa}
            copy={props.copy}
            />
        {
            // "type": "checkbox"
        }
        <DataEntry
            title="Architectural Priority Area name"
            slug="planning_apa_name"
            value={props.building.planning_apa_name}
            copy={props.copy}
            />
        {
            // "type": "text"
        }
        <DataEntry
            title="Architectural Priority Area tier"
            slug="planning_apa_tier"
            value={props.building.planning_apa_tier}
            copy={props.copy}
            />
        {
            // "type": "text"
        }
        <DataEntry
            title="Is locally listed?"
            slug="planning_in_local_list"
            value={props.building.planning_in_local_list}
            copy={props.copy}
            />
        {
            // "type": "checkbox"
        }
        <DataEntry
            title="Local list link"
            slug="planning_local_list_url"
            value={props.building.planning_local_list_url}
            copy={props.copy}
            />
        {
            // "type": "text"
        }
        <DataEntry
            title="Within a historic area assessment?"
            slug="planning_in_historic_area_assessment"
            value={props.building.planning_in_historic_area_assessment}
            copy={props.copy}
            />
        {
            // "type": "checkbox"
        }
        <DataEntry
            title="Historic area assessment link"
            slug="planning_historic_area_assessment_url"
            value={props.building.planning_historic_area_assessment_url}
            copy={props.copy}
            />
        {
            // "type": "text"
        }
        <DataEntry
            title="Is the building proposed for demolition?"
            slug="planning_demolition_proposed"
            value={props.building.planning_demolition_proposed}
            copy={props.copy}
            disabled={true}
            />
        {
            // "type": "checkbox"
        }
        <DataEntry
            title="Has the building been demolished?"
            slug="planning_demolition_complete"
            value={props.building.planning_demolition_complete}
            copy={props.copy}
            disabled={true}
            />
        {
            // "type": "checkbox"
        }
        <DataEntry
            title="Dates of construction and demolition of previous buildings on site"
            slug="planning_demolition_history"
            value={props.building.planning_demolition_history}
            copy={props.copy}
            disabled={true}
            />
        {
            // "type": "text"
        }
    </dl>
)
const PlanningContainer = withCopyEdit(PlanningView);

export default PlanningContainer
