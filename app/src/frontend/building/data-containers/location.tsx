import React from 'react';

import withCopyEdit from '../data-container';
import DataEntry from '../data-components/data-entry';
import UPRNsDataEntry from '../data-components/uprns-data-entry';

const LocationView = (props) => (
    <dl className="data-list">
        <DataEntry
            title="Building Name"
            slug="location_name"
            value={props.building.location_name}
            copy={props.copy}
            tooltip="May not be needed for many buildings."
            disabled={true}
            />
        {
            // "type": "text",
            // "placeholder": "Building name (if any)",
        }
        <DataEntry
            title="Building number"
            slug="location_number"
            value={props.building.location_number}
            copy={props.copy}
            />
        {
            // "type": "number",
            // "step": 1
        }
        <DataEntry
            title="Street"
            slug="location_street"
            value={props.building.location_street}
            copy={props.copy}
            disabled={true}
            />
        {
            // "type": "text",
        }
        <DataEntry
            title="Address line 2"
            slug="location_line_two"
            value={props.building.location_line_two}
            copy={props.copy}
            disabled={true}
            />
        {
            // "type": "text",
        }
        <DataEntry
            title="Town"
            slug="location_town"
            value={props.building.location_town}
            copy={props.copy}
            />
        {
            // "type": "text"
        }
        <DataEntry
            title="Postcode"
            slug="location_postcode"
            value={props.building.location_postcode}
            copy={props.copy}
            />
        {
            // "type": "text",
            // "max_length": 8
        }
        <DataEntry
            title="TOID"
            slug="ref_toid"
            value={props.building.ref_toid}
            copy={props.copy}
            tooltip="Ordnance Survey Topography Layer ID (to be filled automatically)"
            disabled={true}
            />
        {
            // "type": "text",
        }
        <UPRNsDataEntry
            title="UPRNs"
            value={props.building.uprns}
            tooltip="Unique Property Reference Numbers (to be filled automatically)"
            />
        {
            // "type": "uprn_list",
        }
        <DataEntry
            title="OSM ID"
            slug="ref_osm_id"
            value={props.building.ref_osm_id}
            copy={props.copy}
            tooltip="OpenStreetMap feature ID"
            />
        {
            // "type": "text",
            // "max_length": 20
        }
        <DataEntry
            title="Latitude"
            slug="location_latitude"
            value={props.building.location_latitude}
            copy={props.copy}
            />
        {
            // "type": "number",
            // "step": 0.0001,
            // "placeholder": 51
        }
        <DataEntry
            title="Longitude"
            slug="location_longitude"
            value={props.building.location_longitude}
            copy={props.copy}
            />
        {
            // "type": "number",
            // "step": 0.0001,
            // "placeholder": 0
        }
    </dl>
)
const LocationContainer = withCopyEdit(LocationView);

export default LocationContainer;
