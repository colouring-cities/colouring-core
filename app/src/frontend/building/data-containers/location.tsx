import React, { Fragment } from 'react';

import withCopyEdit from '../data-container';
import DataEntry from '../data-components/data-entry';
import NumericDataEntry from '../data-components/numeric-data-entry';
import UPRNsDataEntry from '../data-components/uprns-data-entry';
import InfoBox from '../../components/info-box';
import { CategoryViewProps } from './category-view-props';

const LocationView: React.FunctionComponent<CategoryViewProps> = (props) => (
    <Fragment>
        <InfoBox msg="Text-based address fields are disabled at the moment. We're looking into how best to collect this data." />
        <DataEntry
            title="Building Name"
            slug="location_name"
            value={props.building.location_name}
            mode={props.mode}
            copy={props.copy}
            onChange={props.onChange}
            tooltip="May not be needed for many buildings."
            placeholder="Building name (if any)"
            disabled={true}
            />
        <NumericDataEntry
            title="Building number"
            slug="location_number"
            value={props.building.location_number}
            mode={props.mode}
            copy={props.copy}
            onChange={props.onChange}
            step={1}
            />
        <DataEntry
            title="Street"
            slug="location_street"
            value={props.building.location_street}
            mode={props.mode}
            copy={props.copy}
            onChange={props.onChange}
            disabled={true}
            />
        <DataEntry
            title="Address line 2"
            slug="location_line_two"
            value={props.building.location_line_two}
            mode={props.mode}
            copy={props.copy}
            onChange={props.onChange}
            disabled={true}
            />
        <DataEntry
            title="Town"
            slug="location_town"
            value={props.building.location_town}
            mode={props.mode}
            copy={props.copy}
            onChange={props.onChange}
            />
        <DataEntry
            title="Postcode"
            slug="location_postcode"
            value={props.building.location_postcode}
            mode={props.mode}
            copy={props.copy}
            onChange={props.onChange}
            maxLength={8}
            valueTransform={x=>x.toUpperCase()}
            />
        <DataEntry
            title="TOID"
            slug="ref_toid"
            value={props.building.ref_toid}
            mode={props.mode}
            copy={props.copy}
            tooltip="Ordnance Survey Topography Layer ID (to be filled automatically)"
            onChange={props.onChange}
            disabled={true}
            />
        <UPRNsDataEntry
            title="UPRNs"
            value={props.building.uprns}
            tooltip="Unique Property Reference Numbers (to be filled automatically)"
            />
        <DataEntry
            title="OSM ID"
            slug="ref_osm_id"
            value={props.building.ref_osm_id}
            mode={props.mode}
            copy={props.copy}
            tooltip="OpenStreetMap feature ID"
            maxLength={20}
            onChange={props.onChange}
            />
        <NumericDataEntry
            title="Latitude"
            slug="location_latitude"
            value={props.building.location_latitude}
            mode={props.mode}
            copy={props.copy}
            step={0.0001}
            placeholder="51"
            onChange={props.onChange}
            />
        <NumericDataEntry
            title="Longitude"
            slug="location_longitude"
            value={props.building.location_longitude}
            mode={props.mode}
            copy={props.copy}
            step={0.0001}
            placeholder="0"
            onChange={props.onChange}
            />
    </Fragment>
)
const LocationContainer = withCopyEdit(LocationView);

export default LocationContainer;
