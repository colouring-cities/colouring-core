import React, { Fragment } from 'react';

import { dataFields } from '../../config/data-fields-config';
import { DataEntryGroup } from '../data-components/data-entry-group';
import NumericDataEntry from '../data-components/numeric-data-entry';
import SelectDataEntry from '../data-components/select-data-entry';
import Verification from '../data-components/verification';
import withCopyEdit from '../data-container';

import { CategoryViewProps } from './category-view-props';

/**
* Size view/edit section
*/
const SizeView: React.FunctionComponent<CategoryViewProps> = (props) => (
    <Fragment>
        <DataEntryGroup name="Storeys">
            <NumericDataEntry
                title={dataFields.size_storeys_core.title}
                slug="size_storeys_core"
                value={props.building.size_storeys_core}
                mode={props.mode}
                copy={props.copy}
                tooltip={dataFields.size_storeys_core.tooltip}
                onChange={props.onChange}
                step={1}
                min={0}
                />
            <Verification
                slug="size_storeys_core"
                allow_verify={props.user !== undefined && props.building.size_storeys_core !== null}
                onVerify={props.onVerify}
                user_verified={props.user_verified.hasOwnProperty("size_storeys_core")}
                user_verified_as={props.user_verified.size_storeys_core}
                verified_count={props.building.verified.size_storeys_core}
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
                min={0}
                />
            <Verification
                slug="size_storeys_attic"
                allow_verify={props.user !== undefined && props.building.size_storeys_attic !== null}
                onVerify={props.onVerify}
                user_verified={props.user_verified.hasOwnProperty("size_storeys_attic")}
                user_verified_as={props.user_verified.size_storeys_attic}
                verified_count={props.building.verified.size_storeys_attic}
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
                min={0}
                />
            <Verification
                slug="size_storeys_basement"
                allow_verify={props.user !== undefined && props.building.size_storeys_basement !== null}
                onVerify={props.onVerify}
                user_verified={props.user_verified.hasOwnProperty("size_storeys_basement")}
                user_verified_as={props.user_verified.size_storeys_basement}
                verified_count={props.building.verified.size_storeys_basement}
                />

        </DataEntryGroup>
        <DataEntryGroup name="Height" collapsed={false}>
            <NumericDataEntry
                title={dataFields.size_height_apex.title}
                slug="size_height_apex"
                value={props.building.size_height_apex}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
                step={0.1}
                min={0}
                />
            <Verification
                slug="size_height_apex"
                allow_verify={props.user !== undefined && props.building.size_height_apex !== null}
                onVerify={props.onVerify}
                user_verified={props.user_verified.hasOwnProperty("size_height_apex")}
                user_verified_as={props.user_verified.size_height_apex}
                verified_count={props.building.verified.size_height_apex}
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
                min={0}
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
                min={0}
                />
            <Verification
                slug="size_floor_area_ground"
                allow_verify={props.user !== undefined && props.building.size_floor_area_ground !== null}
                onVerify={props.onVerify}
                user_verified={props.user_verified.hasOwnProperty("size_floor_area_ground")}
                user_verified_as={props.user_verified.size_floor_area_ground}
                verified_count={props.building.verified.size_floor_area_ground}
                />

            <NumericDataEntry
                title={dataFields.size_floor_area_total.title}
                slug="size_floor_area_total"
                value={props.building.size_floor_area_total}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
                step={0.1}
                min={0}
                />
            <Verification
                slug="size_floor_area_total"
                allow_verify={props.user !== undefined && props.building.size_floor_area_total !== null}
                onVerify={props.onVerify}
                user_verified={props.user_verified.hasOwnProperty("size_floor_area_total")}
                user_verified_as={props.user_verified.size_floor_area_total}
                verified_count={props.building.verified.size_floor_area_total}
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
            min={0}
            />
        <Verification
            slug="size_width_frontage"
            allow_verify={props.user !== undefined && props.building.size_width_frontage !== null}
            onVerify={props.onVerify}
            user_verified={props.user_verified.hasOwnProperty("size_width_frontage")}
            user_verified_as={props.user_verified.size_width_frontage}
            verified_count={props.building.verified.size_width_frontage}
            />

        <NumericDataEntry
            title={dataFields.size_plot_area_total.title}
            slug="size_plot_area_total"
            value={props.building.size_plot_area_total}
            mode={props.mode}
            copy={props.copy}
            onChange={props.onChange}
            step={0.1}
            min={0}
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
            min={0}
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
