import React, { Fragment } from 'react';

import { commonSourceTypes, dataFields } from '../../config/data-fields-config';
import DataEntry from '../data-components/data-entry';
import { DataEntryGroup } from '../data-components/data-entry-group';
import NumericDataEntry from '../data-components/numeric-data-entry';
import SelectDataEntry from '../data-components/select-data-entry';
import Verification from '../data-components/verification';
import withCopyEdit from '../data-container';

import { CategoryViewProps } from './category-view-props';
import InfoBox from '../../components/info-box';
import { MultiDataEntry } from '../data-components/multi-data-entry/multi-data-entry';

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
            <SelectDataEntry
                title={dataFields.size_storeys_source_type.title}
                slug="size_storeys_source_type"
                value={props.building.size_storeys_source_type}
                options={dataFields.size_storeys_source_type.items}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
                tooltip={dataFields.size_storeys_source_type.tooltip}
            />
            {(props.building.size_storeys_source_type == commonSourceTypes[0] ||
                props.building.size_storeys_source_type == commonSourceTypes[1] ||
                props.building.size_storeys_source_type == null) ? <></> :
                <><MultiDataEntry
                    title={dataFields.size_storeys_source_links.title}
                    slug="size_storeys_source_links"
                    value={props.building.size_storeys_source_links}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    tooltip={dataFields.size_storeys_source_links.tooltip}
                    placeholder="https://..."
                    editableEntries={true}
                    isUrl={true}
                    />
                </>
            }
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
            <SelectDataEntry
                title={dataFields.size_height_apex_source_type.title}
                slug="size_height_apex_source_type"
                value={props.building.size_height_apex_source_type}
                options={dataFields.size_height_apex_source_type.items}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
                tooltip={dataFields.size_height_apex_source_type.tooltip}
            />
            {(props.building.size_height_apex_source_type == commonSourceTypes[0] ||
                props.building.size_height_apex_source_type == commonSourceTypes[1] ||
                props.building.size_height_apex_source_type == null) ? <></> :
                <><MultiDataEntry
                    title={dataFields.size_height_apex_source_links.title}
                    slug="size_height_apex_source_links"
                    value={props.building.size_height_apex_source_links}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    tooltip={dataFields.size_height_apex_source_links.tooltip}
                    placeholder="https://..."
                    editableEntries={true}
                    isUrl={true}
                    />
                </>
            }
            <hr/>
            <NumericDataEntry
                title={dataFields.size_height_eaves.title}
                slug="size_height_eaves"
                value={props.building.size_height_eaves}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
                step={0.1}
                min={0}
                />
            <Verification
                slug="size_height_eaves"
                allow_verify={props.user !== undefined && props.building.size_height_eaves !== null}
                onVerify={props.onVerify}
                user_verified={props.user_verified.hasOwnProperty("size_height_eaves")}
                user_verified_as={props.user_verified.size_height_eaves}
                verified_count={props.building.verified.size_height_eaves}
                />
            <SelectDataEntry
                title={dataFields.size_height_eaves_source_type.title}
                slug="size_height_eaves_source_type"
                value={props.building.size_height_eaves_source_type}
                options={dataFields.size_height_eaves_source_type.items}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
                tooltip={dataFields.size_height_eaves_source_type.tooltip}
            />
            {(props.building.size_height_eaves_source_type == commonSourceTypes[0] ||
                props.building.size_height_eaves_source_type == commonSourceTypes[1] ||
                props.building.size_height_eaves_source_type == null) ? <></> :
                <><MultiDataEntry
                    title={dataFields.size_height_eaves_source_links.title}
                    slug="size_height_eaves_source_links"
                    value={props.building.size_height_eaves_source_links}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    tooltip={dataFields.size_height_eaves_source_links.tooltip}
                    placeholder="https://..."
                    editableEntries={true}
                    isUrl={true}
                    />
                </>
            }
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
            <SelectDataEntry
                title={dataFields.size_floor_area_source_type.title}
                slug="size_floor_area_source_type"
                value={props.building.size_floor_area_source_type}
                options={dataFields.size_floor_area_source_type.items}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
                tooltip={dataFields.size_floor_area_source_type.tooltip}
            />
            {(props.building.size_floor_area_source_type == commonSourceTypes[0] ||
                props.building.size_floor_area_source_type == commonSourceTypes[1] ||
                props.building.size_floor_area_source_type == null) ? <></> :
                <><MultiDataEntry
                    title={dataFields.size_floor_area_source_links.title}
                    slug="size_floor_area_source_links"
                    value={props.building.size_floor_area_source_links}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    tooltip={dataFields.size_floor_area_source_links.tooltip}
                    placeholder="https://..."
                    editableEntries={true}
                    isUrl={true}
                    />
                </>
            }
        </DataEntryGroup>
        <DataEntryGroup name="Plot size data">
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
            <SelectDataEntry
                title={dataFields.size_width_frontage_source_type.title}
                slug="size_width_frontage_source_type"
                value={props.building.size_width_frontage_source_type}
                options={dataFields.size_width_frontage_source_type.items}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
                tooltip={dataFields.size_width_frontage_source_type.tooltip}
            />
            {(props.building.size_width_frontage_source_type == commonSourceTypes[0] ||
                props.building.size_width_frontage_source_type == commonSourceTypes[1] ||
                props.building.size_width_frontage_source_type == null) ? <></> :
                <><MultiDataEntry
                    title={dataFields.size_width_frontage_source_links.title}
                    slug="size_width_frontage_source_links"
                    value={props.building.size_width_frontage_source_links}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    tooltip={dataFields.size_width_frontage_source_links.tooltip}
                    placeholder="https://..."
                    editableEntries={true}
                    isUrl={true}
                    />
                </>
            }
            <hr/>
            <NumericDataEntry
                title={dataFields.size_plot_area_total.title}
                slug="size_plot_area_total"
                tooltip={dataFields.size_plot_area_total.tooltip}
                value={props.building.size_plot_area_total}
                mode={props.mode}
                onChange={props.onChange}
                step={0.1}
                min={0}
            />
            <Verification
                slug="size_plot_area_total"
                allow_verify={props.user !== undefined && props.building.size_plot_area_total !== null}
                onVerify={props.onVerify}
                user_verified={props.user_verified.hasOwnProperty("size_plot_area_total")}
                user_verified_as={props.user_verified.size_plot_area_total}
                verified_count={props.building.verified.size_plot_area_total}
                />
            <SelectDataEntry
                title={dataFields.size_plot_area_total_source_type.title}
                slug="size_plot_area_total_source_type"
                value={props.building.size_plot_area_total_source_type}
                options={dataFields.size_plot_area_total_source_type.items}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
                tooltip={dataFields.size_plot_area_total_source_type.tooltip}
            />
            {(props.building.size_plot_area_total_source_type == commonSourceTypes[0] ||
                props.building.size_plot_area_total_source_type == commonSourceTypes[1] ||
                props.building.size_far_ratio_source_type == null) ? <></> :
                <><MultiDataEntry
                    title={dataFields.size_plot_area_total_source_links.title}
                    slug="size_plot_area_total_source_links"
                    value={props.building.size_plot_area_total_source_links}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    tooltip={dataFields.size_plot_area_total_source_links.tooltip}
                    placeholder="https://..."
                    editableEntries={true}
                    isUrl={true}
                    />
                </>
            }
            <hr/>
            <NumericDataEntry
                title={dataFields.size_far_ratio.title}
                value={props.building.size_far_ratio}
                slug="size_far_ratio"
                tooltip={dataFields.size_far_ratio.tooltip}
                //placeholder={dataFields.size_far_ratio.example}
                mode={props.mode}
                onChange={props.onChange}
                step={1}
                min={0}
            />
            <Verification
                slug="size_far_ratio"
                allow_verify={props.user !== undefined && props.building.size_far_ratio !== null}
                onVerify={props.onVerify}
                user_verified={props.user_verified.hasOwnProperty("size_far_ratio")}
                user_verified_as={props.user_verified.size_far_ratio}
                verified_count={props.building.verified.size_far_ratio}
                />
            <SelectDataEntry
                title={dataFields.size_far_ratio_source_type.title}
                slug="size_far_ratio_source_type"
                value={props.building.size_far_ratio_source_type}
                options={dataFields.size_far_ratio_source_type.items}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
                tooltip={dataFields.size_far_ratio_source_type.tooltip}
            />
            {(props.building.size_far_ratio_source_type == commonSourceTypes[0] ||
                props.building.size_far_ratio_source_type == commonSourceTypes[1] ||
                props.building.size_far_ratio_source_type == null) ? <></> :
                <><MultiDataEntry
                    title={dataFields.size_far_ratio_source_links.title}
                    slug="size_far_ratio_source_links"
                    value={props.building.size_far_ratio_source_links}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    tooltip={dataFields.size_far_ratio_source_links.tooltip}
                    placeholder="https://..."
                    editableEntries={true}
                    isUrl={true}
                    />
                </>
            }
            <hr/>
            <DataEntry
                title={dataFields.size_parcel_geometry.title}
                slug="size_parcel_geometry"
                value={props.building.size_parcel_geometry}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
                tooltip={dataFields.size_parcel_geometry.tooltip}
                placeholder="https://..."
                isUrl={true}
                />
            <Verification
                slug="size_parcel_geometry"
                allow_verify={props.user !== undefined && props.building.size_parcel_geometry !== null}
                onVerify={props.onVerify}
                user_verified={props.user_verified.hasOwnProperty("size_parcel_geometry")}
                user_verified_as={props.user_verified.size_parcel_geometry}
                verified_count={props.building.verified.size_parcel_geometry}
                />
            <SelectDataEntry
                title={dataFields.size_parcel_geometry_source_type.title}
                slug="size_parcel_geometry_source_type"
                value={props.building.size_parcel_geometry_source_type}
                options={dataFields.size_parcel_geometry_source_type.items}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
                tooltip={dataFields.size_parcel_geometry_source_type.tooltip}
            />
            {(props.building.size_parcel_geometry_source_type == commonSourceTypes[0] ||
                props.building.size_parcel_geometry_source_type == commonSourceTypes[1] ||
                props.building.size_parcel_geometry_source_type == null) ? <></> :
                <><MultiDataEntry
                    title={dataFields.size_parcel_geometry_source_links.title}
                    slug="size_parcel_geometry_source_links"
                    value={props.building.size_parcel_geometry_source_links}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    tooltip={dataFields.size_parcel_geometry_source_links.tooltip}
                    placeholder="https://..."
                    editableEntries={true}
                    isUrl={true}
                    />
                </>
            }
        </DataEntryGroup>
    </Fragment>
);
const SizeContainer = withCopyEdit(SizeView);

export default SizeContainer;
