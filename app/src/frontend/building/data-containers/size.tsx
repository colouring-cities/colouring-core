import React, { Fragment } from 'react';

import withCopyEdit from '../data-container';
import NumericDataEntry from '../data-components/numeric-data-entry';
import SelectDataEntry from '../data-components/select-data-entry';
import { DataEntryGroup } from '../data-components/data-entry-group';

/**
* Size view/edit section
*/
const SizeView = (props) => (
    <Fragment>
        <DataEntryGroup name="Storeys" collapsed={false}>

            <NumericDataEntry
                title="Core storeys"
                slug="size_storeys_core"
                value={props.building.size_storeys_core}
                mode={props.mode}
                copy={props.copy}
                tooltip="How many storeys between the pavement and start of roof?"
                onChange={props.onChange}
                step={1}
                />
            <NumericDataEntry
                title="Attic storeys"
                slug="size_storeys_attic"
                value={props.building.size_storeys_attic}
                mode={props.mode}
                copy={props.copy}
                tooltip="How many storeys above start of roof?"
                onChange={props.onChange}
                step={1}
                />
            <NumericDataEntry
                title="Basement storeys"
                slug="size_storeys_basement"
                value={props.building.size_storeys_basement}
                mode={props.mode}
                copy={props.copy}
                tooltip="How many storeys below pavement level?"
                onChange={props.onChange}
                step={1}
                />
        </DataEntryGroup>
        <DataEntryGroup name="Height">
            <NumericDataEntry
                title="Height to apex (m)"
                slug="size_height_apex"
                value={props.building.size_height_apex}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
                step={0.1}
                />
            <NumericDataEntry
                title="Height to eaves (m)"
                slug="size_height_eaves"
                disabled={true}
                value={props.building.size_height_eaves}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
                step={0.1}
                />
        </DataEntryGroup>
        <DataEntryGroup name="Floor area">
            <NumericDataEntry
                title="Ground floor area (m²)"
                slug="size_floor_area_ground"
                value={props.building.size_floor_area_ground}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
                step={0.1}
                />
            <NumericDataEntry
                title="Total floor area (m²)"
                slug="size_floor_area_total"
                value={props.building.size_floor_area_total}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
                step={0.1}
                />
        </DataEntryGroup>
        <NumericDataEntry
            title="Frontage Width (m)"
            slug="size_width_frontage"
            value={props.building.size_width_frontage}
            mode={props.mode}
            copy={props.copy}
            onChange={props.onChange}
            step={0.1}
            />
        <NumericDataEntry
            title="Total area of plot (m²)"
            slug="size_plot_area_total"
            value={props.building.size_plot_area_total}
            mode={props.mode}
            copy={props.copy}
            onChange={props.onChange}
            step={0.1}
            disabled={true}
            />
        <NumericDataEntry
            title="FAR ratio (percentage of plot covered by building)"
            slug="size_far_ratio"
            value={props.building.size_far_ratio}
            mode={props.mode}
            copy={props.copy}
            onChange={props.onChange}
            step={0.1}
            disabled={true}
            />
        <SelectDataEntry
            title="Configuration (semi/detached, end/terrace)"
            slug="size_configuration"
            value={props.building.size_configuration}
            mode={props.mode}
            copy={props.copy}
            onChange={props.onChange}
            disabled={true}
            options={[
                "Detached",
                "Semi-detached",
                "Terrace",
                "End terrace",
                "Block"
            ]}
            />
        <SelectDataEntry
            title="Roof shape"
            slug="size_roof_shape"
            value={props.building.size_roof_shape}
            mode={props.mode}
            copy={props.copy}
            onChange={props.onChange}
            disabled={true}
            options={[
                "Flat",
                "Pitched",
                "Other"
            ]}
            />
    </Fragment>
)
const SizeContainer = withCopyEdit(SizeView);

export default SizeContainer;
