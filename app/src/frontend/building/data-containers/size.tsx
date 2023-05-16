import React, { Fragment } from 'react';

import { dataFields } from '../../config/data-fields-config';
import DataEntry from '../data-components/data-entry';
import { DataEntryGroup } from '../data-components/data-entry-group';
import NumericDataEntry from '../data-components/numeric-data-entry';
import SelectDataEntry from '../data-components/select-data-entry';
import Verification from '../data-components/verification';
import withCopyEdit from '../data-container';

import { CategoryViewProps } from './category-view-props';
import InfoBox from '../../components/info-box';

/**
* Size view/edit section
*/
const SizeView: React.FunctionComponent<CategoryViewProps> = (props) => (
    <Fragment>
        <DataEntryGroup name="Number of floors/storeys">
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
            <DataEntry
                title="Source type"
                slug=""
                value=""
                mode='view'
                tooltip="Coming Soon"
            />
            <DataEntry
                title="Source link"
                slug=""
                value=""
                mode='view'
                tooltip="Coming Soon"
            />
        </DataEntryGroup>
        <DataEntryGroup name="Building height data">
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
            <DataEntry
                title="Source type"
                slug=""
                value=""
                mode='view'
                tooltip="Coming Soon"
            />
            <DataEntry
                title="Source link"
                slug=""
                value=""
                mode='view'
                tooltip="Coming Soon"
            />
            <hr/>
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
            <DataEntry
                title="Source type"
                slug=""
                value=""
                mode='view'
                tooltip="Coming Soon"
            />
            <DataEntry
                title="Source link"
                slug=""
                value=""
                mode='view'
                tooltip="Coming Soon"
            />
        </DataEntryGroup>
        <DataEntryGroup name="Floor area data">
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
            <DataEntry
                title="Source link"
                slug=""
                value=""
                mode='view'
                tooltip="Coming Soon"
                />
        </DataEntryGroup>
        <DataEntryGroup name="Plot size data">
            <NumericDataEntry
                title={dataFields.size_plot_area_total.title}
                slug="size_plot_area_total"
                mode='view'
                step={0.1}
                min={0}
            />
            <DataEntry
                title="Source type"
                slug=""
                value=""
                mode='view'
                tooltip="Coming Soon"
            />
            <DataEntry
                title="Source link"
                slug=""
                value=""
                mode='view'
                tooltip="Coming Soon"
            />
            <hr/>
            <NumericDataEntry
                title={dataFields.size_far_ratio.title}
                slug="size_far_ratio"
                mode='view'
                step={0.1}
                min={0}
            />
            <DataEntry
                title="Source type"
                slug=""
                value=""
                mode='view'
                tooltip="Coming Soon"
            />
            <DataEntry
                title="Source link"
                slug=""
                value=""
                mode='view'
                tooltip="Coming Soon"
            />
            <hr/>
            <DataEntry
                title="Plot dimensions"
                slug=""
                value=""
                mode='view'
            />
            <DataEntry
                title="Source type"
                slug=""
                value=""
                mode='view'
                tooltip="Coming Soon"
            />
            <DataEntry
                title="Source link"
                slug=""
                value=""
                mode='view'
                tooltip="Coming Soon"
            />
            <hr/>
            <DataEntry
                title="Land parcel geometry link"
                slug=""
                value=""
                mode='view'
                tooltip='INSPIRE Polygons'
            />
            <DataEntry
                title="Source type"
                slug=""
                value=""
                mode='view'
                tooltip="Coming Soon"
            />
            <DataEntry
                title="Source link"
                slug=""
                value=""
                mode='view'
                tooltip="Coming Soon"
            />
            <hr/>
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
            <DataEntry
                title="Source type"
                slug=""
                value=""
                mode='view'
                tooltip="Coming Soon"
            />
            <DataEntry
                title="Source link"
                slug=""
                value=""
                mode='view'
                tooltip="Coming Soon"
            />
        </DataEntryGroup>
    </Fragment>
);
const SizeContainer = withCopyEdit(SizeView);

export default SizeContainer;
