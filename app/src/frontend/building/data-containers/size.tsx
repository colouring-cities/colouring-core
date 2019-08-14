import React from 'react';

import withCopyEdit from '../data-container';
import DataEntry from '../data-components/data-entry';

/**
* Size view/edit section
*/
const SizeView = (props) => (
    <dl className="data-list">
        <DataEntry
            title="Core storeys"
            slug="size_storeys_core"
            value={props.building.size_storeys_core}
            copy={props.copy}
            tooltip="How many storeys between the pavement and start of roof?"
            />
        {
            // "type": "number",
            // "step": 1,
        }
        <DataEntry
            title="Attic storeys"
            slug="size_storeys_attic"
            value={props.building.size_storeys_attic}
            copy={props.copy}
            tooltip="How many storeys above start of roof?"
            />
        {
            // "type": "number",
            // "step": 1,
        }
        <DataEntry
            title="Basement storeys"
            slug="size_storeys_basement"
            value={props.building.size_storeys_basement}
            copy={props.copy}
            tooltip="How many storeys below pavement level?"
            />
        {
            // "type": "number",
            // "step": 1,
        }
        <DataEntry
            title="Height to apex (m)"
            slug="size_height_apex"
            value={props.building.size_height_apex}
            copy={props.copy}
            />
        {
            // "type": "number",
            // "step": 0.1
        }
        <DataEntry
            title="Height to eaves (m)"
            slug="size_height_eaves"
            value={props.building.size_height_eaves}
            copy={props.copy}
            />
        {
            // "type": "number",
            // "step": 0.1
        }
        <DataEntry
            title="Ground floor area (m²)"
            slug="size_floor_area_ground"
            value={props.building.size_floor_area_ground}
            copy={props.copy}
            />
        {
            // "type": "number",
            // "step": 0.1
        }
        <DataEntry
            title="Total floor area (m²)"
            slug="size_floor_area_total"
            value={props.building.size_floor_area_total}
            copy={props.copy}
            />
        {
            // "type": "number",
            // "step": 0.1
        }
        <DataEntry
            title="Frontage Width (m)"
            slug="size_width_frontage"
            value={props.building.size_width_frontage}
            copy={props.copy}
            />
        {
            // "type": "number",
            // "step": 0.1
        }
        <DataEntry
            title="Total area of plot (m²)"
            slug="size_plot_area_total"
            value={props.building.size_plot_area_total}
            copy={props.copy}
            disabled={true}
            />
        {
            // "type": "number",
            // "step": 0.1
        }
        <DataEntry
            title="FAR ratio (percentage of plot covered by building)"
            slug="size_far_ratio"
            value={props.building.size_far_ratio}
            copy={props.copy}
            disabled={true}
            />
        {
            // "type": "number",
            // "step": 0.1
        }
        <DataEntry
            title="Configuration (semi/detached, end/terrace)"
            slug="size_configuration"
            value={props.building.size_configuration}
            copy={props.copy}
            disabled={true}
            />
        {
            // "type": "text_list",
            // "options": [
            //     "Detached",
            //     "Semi-detached",
            //     "Terrace",
            //     "End terrace",
            //     "Block"
            // ]
        }
        <DataEntry
            title="Roof shape"
            slug="size_roof_shape"
            value={props.building.size_roof_shape}
            copy={props.copy}
            disabled={true}
            />
        {
            // "type": "text_list",
            // "options": [
            //     "Flat",
            //     "Pitched",
            //     "Other"
            // ]
        }
    </dl>
)
const SizeContainer = withCopyEdit(SizeView);

export default SizeContainer;
