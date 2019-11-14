import React, { Fragment } from 'react';

import { dataFields } from '../../data_fields';
import { DataEntryGroup } from '../data-components/data-entry-group';
import NumericDataEntry from '../data-components/numeric-data-entry';
import SelectDataEntry from '../data-components/select-data-entry';
import withCopyEdit from '../data-container';

import { CategoryViewProps } from './category-view-props';

/**
* Size view/edit section
*/
const SizeView: React.FunctionComponent<CategoryViewProps> = (props) => (
    <Fragment>
        <DataEntryGroup name="Storeys" collapsed={false}>

            <NumericDataEntry
                title={dataFields.size_storeys_core.title}
                slug="size_storeys_core"
                value={props.building.size_storeys_core}
                mode={props.mode}
                copy={props.copy}
                tooltip={dataFields.size_storeys_core.tooltip}
                onChange={props.onChange}
                step={1}
                />
            <NumericDataEntry
                title={dataFields.size_storeys_attic.title}
                slug="size_storeys_attic"
                value={props.building.size_storeys_attic}
                mode={props.mode}
                copy={props.copy}
                tooltip={dataFields.size_storeys_attic.tooltip}
                onChange={props.onChange}
                step={1}
                />
            <NumericDataEntry
                title={dataFields.size_storeys_basement.title}
                slug="size_storeys_basement"
                value={props.building.size_storeys_basement}
                mode={props.mode}
                copy={props.copy}
                tooltip={dataFields.size_storeys_basement.tooltip}
                onChange={props.onChange}
                step={1}
                />
        </DataEntryGroup>
        <DataEntryGroup name="Height">
            <NumericDataEntry
                title={dataFields.size_height_apex.title}
                slug="size_height_apex"
                value={props.building.size_height_apex}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
                step={0.1}
                />
            <NumericDataEntry
                title={dataFields.size_height_eaves.title}
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
                title={dataFields.size_floor_area_ground.title}
                slug="size_floor_area_ground"
                value={props.building.size_floor_area_ground}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
                step={0.1}
                />
            <NumericDataEntry
                title={dataFields.size_floor_area_total.title}
                slug="size_floor_area_total"
                value={props.building.size_floor_area_total}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
                step={0.1}
                />
        </DataEntryGroup>
        <NumericDataEntry
            title={dataFields.size_width_frontage.title}
            slug="size_width_frontage"
            value={props.building.size_width_frontage}
            mode={props.mode}
            copy={props.copy}
            onChange={props.onChange}
            step={0.1}
            />
        <NumericDataEntry
            title={dataFields.size_plot_area_total.title}
            slug="size_plot_area_total"
            value={props.building.size_plot_area_total}
            mode={props.mode}
            copy={props.copy}
            onChange={props.onChange}
            step={0.1}
            disabled={true}
            />
        <NumericDataEntry
            title={dataFields.size_far_ratio.title}
            slug="size_far_ratio"
            value={props.building.size_far_ratio}
            mode={props.mode}
            copy={props.copy}
            onChange={props.onChange}
            step={0.1}
            disabled={true}
            />
        <SelectDataEntry
            title={dataFields.size_configuration.title}
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
            title={dataFields.size_roof_shape.title}
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
);
const SizeContainer = withCopyEdit(SizeView);

export default SizeContainer;
