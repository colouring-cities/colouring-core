import React, { Fragment } from 'react';
import { commonSourceTypes, dataFields } from '../../config/data-fields-config';
import DataEntry from '../data-components/data-entry';
import NumericDataEntry from '../data-components/numeric-data-entry';
import withCopyEdit from '../data-container';
import { CategoryViewProps } from './category-view-props';
import { DataEntryGroup } from '../data-components/data-entry-group';
import { MultiDataEntry } from '../data-components/multi-data-entry/multi-data-entry';
import SelectDataEntry from '../data-components/select-data-entry';
import Verification from '../data-components/verification';
import { LogicalDataEntry } from '../data-components/logical-data-entry/logical-data-entry';

/**
* Street Context view/edit section
*/
const StreetContextView: React.FunctionComponent<CategoryViewProps> = (props) => {

    const queryParameters = new URLSearchParams(window.location.search);
    const subcat = queryParameters.get("sc");

    return (
        <Fragment>
            <DataEntryGroup name="Green Space" collapsed={subcat==null || subcat!="1"}>
                <LogicalDataEntry
                    title={dataFields.context_front_garden.title}
                    slug="context_front_garden"
                    value={props.building.context_front_garden}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    tooltip={dataFields.context_front_garden.tooltip}
                    />
                <Verification
                    slug="context_front_garden"
                    allow_verify={props.user !== undefined && props.building.context_front_garden !== null && !props.edited}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("context_front_garden")}
                    user_verified_as={props.user_verified.context_front_garden}
                    verified_count={props.building.verified.context_front_garden}
                    />
                <LogicalDataEntry
                    title={dataFields.context_back_garden.title}
                    slug="context_back_garden"
                    value={props.building.context_back_garden}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    tooltip={dataFields.context_back_garden.tooltip}
                    />
                <Verification
                    slug="context_back_garden"
                    allow_verify={props.user !== undefined && props.building.context_back_garden !== null && !props.edited}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("context_back_garden")}
                    user_verified_as={props.user_verified.context_back_garden}
                    verified_count={props.building.verified.context_back_garden}
                    />
                <LogicalDataEntry
                    title={dataFields.context_flats_garden.title}
                    slug="context_flats_garden"
                    value={props.building.context_flats_garden}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    tooltip={dataFields.context_flats_garden.tooltip}
                    />
                <Verification
                    slug="context_flats_garden"
                    allow_verify={props.user !== undefined && props.building.context_flats_garden !== null && !props.edited}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("context_flats_garden")}
                    user_verified_as={props.user_verified.context_flats_garden}
                    verified_count={props.building.verified.context_flats_garden}
                    />
                <SelectDataEntry
                    title={dataFields.context_garden_source_type.title}
                    slug="context_garden_source_type"
                    value={props.building.context_garden_source_type}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    tooltip={dataFields.context_garden_source_type.tooltip}
                    placeholder={dataFields.context_garden_source_type.example}
                    options={dataFields.context_garden_source_type.items}
                    />
                {(props.building.context_garden_source_type == commonSourceTypes[0] ||
                    props.building.context_garden_source_type == commonSourceTypes[1] ||
                    props.building.context_garden_source_type == null) ? <></> :
                    <>
                        <MultiDataEntry
                            title={dataFields.context_garden_source_links.title}
                            slug="context_garden_source_links"
                            value={props.building.context_garden_source_links}
                            mode={props.mode}
                            copy={props.copy}
                            onChange={props.onChange}
                            tooltip={dataFields.context_garden_source_links.tooltip}
                            placeholder="https://..."
                            editableEntries={true}
                            isUrl={true}
                        />
                    </>
                }
                <hr/>
                <NumericDataEntry
                    title={dataFields.context_green_space_distance.title}
                    value={props.building.context_green_space_distance}
                    slug="context_green_space_distance"
                    tooltip={dataFields.context_green_space_distance.tooltip}
                    //placeholder={dataFields.context_green_space_distance.example}
                    copy={props.copy}
                    mode={props.mode}
                    onChange={props.onChange}
                    step={1}
                    min={0}
                />
                <Verification
                    slug="context_green_space_distance"
                    allow_verify={props.user !== undefined && props.building.context_green_space_distance !== null}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("context_green_space_distance")}
                    user_verified_as={props.user_verified.context_green_space_distance}
                    verified_count={props.building.verified.context_green_space_distance}
                    />
                <SelectDataEntry
                    title={dataFields.context_green_space_distance_source_type.title}
                    slug="context_green_space_distance_source_type"
                    value={props.building.context_green_space_distance_source_type}
                    options={dataFields.context_green_space_distance_source_type.items}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    tooltip={dataFields.context_green_space_distance_source_type.tooltip}
                />
                {(props.building.context_green_space_distance_source_type == commonSourceTypes[0] ||
                    props.building.context_green_space_distance_source_type == commonSourceTypes[1] ||
                    props.building.context_green_space_distance_source_type == null) ? <></> :
                    <><MultiDataEntry
                        title={dataFields.context_green_space_distance_source_links.title}
                        slug="context_green_space_distance_source_links"
                        value={props.building.context_green_space_distance_source_links}
                        mode={props.mode}
                        copy={props.copy}
                        onChange={props.onChange}
                        tooltip={dataFields.context_green_space_distance_source_links.tooltip}
                        placeholder="https://..."
                        editableEntries={true}
                        isUrl={true}
                        />
                    </>
                }
                <hr/>
                <NumericDataEntry
                    title={dataFields.context_tree_distance.title}
                    value={props.building.context_tree_distance}
                    slug="context_tree_distance"
                    tooltip={dataFields.context_tree_distance.tooltip}
                    //placeholder={dataFields.context_tree_distance.example}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    step={1}
                    min={0}
                />
                <Verification
                    slug="context_tree_distance"
                    allow_verify={props.user !== undefined && props.building.context_tree_distance !== null}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("context_tree_distance")}
                    user_verified_as={props.user_verified.context_tree_distance}
                    verified_count={props.building.verified.context_tree_distance}
                    />
                <SelectDataEntry
                    title={dataFields.context_tree_distance_source_type.title}
                    slug="context_tree_distance_source_type"
                    value={props.building.context_tree_distance_source_type}
                    options={dataFields.context_tree_distance_source_type.items}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    tooltip={dataFields.context_tree_distance_source_type.tooltip}
                />
                {(props.building.context_tree_distance_source_type == commonSourceTypes[0] ||
                    props.building.context_tree_distance_source_type == commonSourceTypes[1] ||
                    props.building.context_tree_distance_source_type == null) ? <></> :
                    <><MultiDataEntry
                        title={dataFields.context_tree_distance_source_links.title}
                        slug="context_tree_distance_source_links"
                        value={props.building.context_tree_distance_source_links}
                        mode={props.mode}
                        copy={props.copy}
                        onChange={props.onChange}
                        tooltip={dataFields.context_tree_distance_source_links.tooltip}
                        placeholder="https://..."
                        editableEntries={true}
                        isUrl={true}
                        />
                    </>
                }
            </DataEntryGroup>
            <DataEntryGroup name="Street/pavement" collapsed={subcat==null || subcat!="2"}>
                <DataEntry
                    title="Walkability Index"
                    slug=""
                    value=""
                    mode='view'
                    tooltip='Under development'
                />
                <hr/>
                <NumericDataEntry
                    title={dataFields.context_street_width.title}
                    value={props.building.context_street_width}
                    slug="context_street_width"
                    tooltip={dataFields.context_street_width.tooltip}
                    //placeholder={dataFields.context_street_width.example}
                    copy={props.copy}
                    mode={props.mode}
                    onChange={props.onChange}
                    step={1}
                    min={0}
                />
                <Verification
                    slug="context_street_width"
                    allow_verify={props.user !== undefined && props.building.context_street_width !== null}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("context_street_width")}
                    user_verified_as={props.user_verified.context_street_width}
                    verified_count={props.building.verified.context_street_width}
                    />
                <SelectDataEntry
                    title={dataFields.context_street_width_source_type.title}
                    slug="context_street_width_source_type"
                    value={props.building.context_street_width_source_type}
                    options={dataFields.context_street_width_source_type.items}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    tooltip={dataFields.context_street_width_source_type.tooltip}
                />
                {(props.building.context_street_width_source_type == commonSourceTypes[0] ||
                    props.building.context_street_width_source_type == commonSourceTypes[1] ||
                    props.building.context_street_width_source_type == null) ? <></> :
                    <><MultiDataEntry
                        title={dataFields.context_street_width_source_links.title}
                        slug="context_street_width_source_links"
                        value={props.building.context_street_width_source_links}
                        mode={props.mode}
                        copy={props.copy}
                        onChange={props.onChange}
                        tooltip={dataFields.context_street_width_source_links.tooltip}
                        placeholder="https://..."
                        editableEntries={true}
                        isUrl={true}
                        />
                    </>
                }
                <hr/>
                <NumericDataEntry
                    title={dataFields.context_pavement_width.title}
                    value={props.building.context_pavement_width}
                    slug="context_pavement_width"
                    tooltip={dataFields.context_pavement_width.tooltip}
                    //placeholder={dataFields.context_pavement_width.example}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    step={1}
                    min={0}
                />
                <Verification
                    slug="context_pavement_width"
                    allow_verify={props.user !== undefined && props.building.context_pavement_width !== null}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("context_pavement_width")}
                    user_verified_as={props.user_verified.context_pavement_width}
                    verified_count={props.building.verified.context_pavement_width}
                    />
                <SelectDataEntry
                    title={dataFields.context_pavement_width_source_type.title}
                    slug="context_pavement_width_source_type"
                    value={props.building.context_pavement_width_source_type}
                    options={dataFields.context_pavement_width_source_type.items}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    tooltip={dataFields.context_pavement_width_source_type.tooltip}
                />
                {(props.building.context_pavement_width_source_type == commonSourceTypes[0] ||
                    props.building.context_pavement_width_source_type == commonSourceTypes[1] ||
                    props.building.context_pavement_width_source_type == null) ? <></> :
                    <><MultiDataEntry
                        title={dataFields.context_pavement_width_source_links.title}
                        slug="context_pavement_width_source_links"
                        value={props.building.context_pavement_width_source_links}
                        mode={props.mode}
                        copy={props.copy}
                        onChange={props.onChange}
                        tooltip={dataFields.context_pavement_width_source_links.tooltip}
                        placeholder="https://..."
                        editableEntries={true}
                        isUrl={true}
                        />
                    </>
                }
                <hr/>
                <DataEntry
                        title={dataFields.context_street_geometry.title}
                        slug="context_street_geometry"
                        value={props.building.context_street_geometry}
                        mode={props.mode}
                        copy={props.copy}
                        onChange={props.onChange}
                        tooltip={dataFields.context_street_geometry.tooltip}
                        placeholder="https://..."
                        isUrl={true}
                    />
                <Verification
                    slug="context_street_geometry"
                    allow_verify={props.user !== undefined && props.building.context_street_geometry !== null}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("context_street_geometry")}
                    user_verified_as={props.user_verified.context_street_geometry}
                    verified_count={props.building.verified.context_street_geometry}
                    />
                <SelectDataEntry
                    title={dataFields.context_street_geometry_source_type.title}
                    slug="context_street_geometry_source_type"
                    value={props.building.context_street_geometry_source_type}
                    options={dataFields.context_street_geometry_source_type.items}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    tooltip={dataFields.context_street_geometry_source_type.tooltip}
                />
                {(props.building.context_street_geometry_source_type == commonSourceTypes[0] ||
                    props.building.context_street_geometry_source_type == commonSourceTypes[1] ||
                    props.building.context_street_geometry_source_type == null) ? <></> :
                    <><MultiDataEntry
                        title={dataFields.context_street_geometry_source_links.title}
                        slug="context_street_geometry_source_links"
                        value={props.building.context_street_geometry_source_links}
                        mode={props.mode}
                        copy={props.copy}
                        onChange={props.onChange}
                        tooltip={dataFields.context_street_geometry_source_links.tooltip}
                        placeholder="https://..."
                        editableEntries={true}
                        isUrl={true}
                        />
                    </>
                }
            </DataEntryGroup>
            <DataEntryGroup name="Number of entrances facing street" collapsed={subcat==null || subcat!="3"}>
                <DataEntry
                    title="Number of entrances facing street"
                    slug=""
                    value=""
                    mode='view'
                    tooltip='Under development'
                />
            </DataEntryGroup>
        </Fragment>
    );
};
const StreetContextContainer = withCopyEdit(StreetContextView);

export default StreetContextContainer;
