import React, { Fragment } from 'react';

import { commonSourceTypes, dataFields } from '../../config/data-fields-config';
import { Category } from '../../config/categories-config';
import DataEntry from '../data-components/data-entry';
import NumericDataEntry from '../data-components/numeric-data-entry';
import SelectDataEntry from '../data-components/select-data-entry';
import Verification from '../data-components/verification';
import withCopyEdit from '../data-container';

import { CategoryViewProps } from './category-view-props';
import InfoBox from '../../components/info-box';
import { DataEntryGroup } from '../data-components/data-entry-group';
import { MultiDataEntry } from '../data-components/multi-data-entry/multi-data-entry';
import { useDisplayPreferences } from '../../displayPreferences-context';
import { LogicalDataEntry } from '../data-components/logical-data-entry/logical-data-entry';

/**
* Typology & Size view/edit section
*/
const TypologySizeView: React.FunctionComponent<CategoryViewProps> = (props) => {
    
    const switchToClassificationMapStyle = (e) => {
        e.preventDefault();
        props.onMapColourScale('typology_classification')
    }
    const switchToDynamicClassificationMapStyle = (e) => {
        e.preventDefault();
        props.onMapColourScale('typology_dynamic_classification')
    }
    const switchToAttachmentMapStyle = (e) => {
        e.preventDefault();
        props.onMapColourScale('building_attachment_form')
    }
    const switchToLandUseMapStyle = (e) => {
        e.preventDefault();
        props.onMapColourScale('original_landuse')
    }

    // Calculate the total number of floors
    let total_floors = 0;

    if (props.building.size_storeys_attic != null) {
        total_floors += props.building.size_storeys_attic;
    }
    if (props.building.size_storeys_core != null) {
        total_floors += props.building.size_storeys_core;
    }
    if (props.building.size_storeys_basement != null) {
        total_floors += props.building.size_storeys_basement;
    }

    const queryParameters = new URLSearchParams(window.location.search);
    const subcat = queryParameters.get("sc");

    return (
        <Fragment>
            <DataEntryGroup name="Typology" collapsed={subcat==null || subcat!="1"}>
                <DataEntryGroup name="Archetype" collapsed={subcat==null || subcat!="1"}>
                    {/*
                    <SelectDataEntry
                        title={"Dropdown to be added"}
                        slug="typology_classification"
                        value={props.building.typology_classification}
                        tooltip={dataFields.typology_classification.tooltip}
                        options={dataFields.typology_classification.items}
                        mode={props.mode}
                        copy={props.copy}
                        onChange={props.onChange}
                    />
                    <Verification
                        slug="typology_classification"
                        allow_verify={props.user !== undefined && props.building.typology_classification !== null && !props.edited}
                        onVerify={props.onVerify}
                        user_verified={props.user_verified.hasOwnProperty("typology_classification")}
                        user_verified_as={props.user_verified.typology_classification}
                        verified_count={props.building.verified.typology_classification}
                    />
                    <SelectDataEntry
                        title={dataFields.typology_classification_source_type.title}
                        slug="typology_classification_source_type"
                        value={props.building.typology_classification_source_type}
                        mode={props.mode}
                        copy={props.copy}
                        onChange={props.onChange}
                        tooltip={dataFields.typology_classification_source_type.tooltip}
                        placeholder={dataFields.typology_classification_source_type.example}
                        options={dataFields.typology_classification_source_type.items}
                        />
                    */}
                </ DataEntryGroup>
                <DataEntryGroup name="Block/Density Classification" collapsed={subcat==null || subcat!="2"}>
                    {(props.mapColourScale != "typology_classification") ? 
                        <button className={`map-switcher-inline disabled-state btn btn-outline btn-outline-dark key-button`} onClick={switchToClassificationMapStyle}>
                            {"Click to show typology classification."}
                        </button>
                        :
                        <></>
                    }
                    <SelectDataEntry
                        title={dataFields.typology_classification.title}
                        slug="typology_classification"
                        value={props.building.typology_classification}
                        tooltip={dataFields.typology_classification.tooltip}
                        options={dataFields.typology_classification.items}
                        mode={props.mode}
                        copy={props.copy}
                        onChange={props.onChange}
                    />
                    <Verification
                        slug="typology_classification"
                        allow_verify={props.user !== undefined && props.building.typology_classification !== null && !props.edited}
                        onVerify={props.onVerify}
                        user_verified={props.user_verified.hasOwnProperty("typology_classification")}
                        user_verified_as={props.user_verified.typology_classification}
                        verified_count={props.building.verified.typology_classification}
                    />
                    <SelectDataEntry
                        title={dataFields.typology_classification_source_type.title}
                        slug="typology_classification_source_type"
                        value={props.building.typology_classification_source_type}
                        mode={props.mode}
                        copy={props.copy}
                        onChange={props.onChange}
                        tooltip={dataFields.typology_classification_source_type.tooltip}
                        placeholder={dataFields.typology_classification_source_type.example}
                        options={dataFields.typology_classification_source_type.items}
                        />
                    {(props.building.typology_classification_source_type == commonSourceTypes[0] ||
                        props.building.typology_classification_source_type == commonSourceTypes[1] ||
                        props.building.typology_classification_source_type == null) ? <></> :
                        <>
                            <MultiDataEntry
                                title={dataFields.typology_classification_source_links.title}
                                slug="typology_classification_source_links"
                                value={props.building.typology_classification_source_links}
                                mode={props.mode}
                                copy={props.copy}
                                onChange={props.onChange}
                                tooltip={dataFields.typology_classification_source_links.tooltip}
                                placeholder="https://..."
                                editableEntries={true}
                                isUrl={true}
                            />
                        </>
                    }
                </DataEntryGroup>
                <DataEntryGroup name="National Historical Description" collapsed={subcat==null || subcat!="3"}>
                    <SelectDataEntry
                        title={dataFields.typology_style_period.title}
                        slug="typology_style_period"
                        value={props.building.typology_style_period}
                        tooltip={dataFields.typology_style_period.tooltip}
                        options={dataFields.typology_style_period.items}
                        mode={props.mode}
                        copy={props.copy}
                        onChange={props.onChange}
                        disabled={true}
                    />
                    <div className={`alert alert-dark`} role="alert" style={{ fontSize: 14, backgroundColor: "#f6f8f9" }}>
                        <i className="source-url">To edit the historical period box, and to see the data mapped, please go to&nbsp;
                        <a href={"/"+props.mode+"/" + Category.AgeHistory + "/"+props.building.building_id+"?sc=2"}>Age & History</a>.</i>
                    </div>
                </DataEntryGroup>
                <DataEntryGroup name="Attachment/Adjacency" collapsed={subcat==null || subcat!="4"}>
                    {(props.mapColourScale != "building_attachment_form") ? 
                        <button className={`map-switcher-inline disabled-state btn btn-outline btn-outline-dark key-button`} onClick={switchToAttachmentMapStyle}>
                            {"Click here to show attachment/adjacency."}
                        </button>
                    :
                        <></>
                    }
                    <SelectDataEntry
                        title={dataFields.building_attachment_form.title}
                        slug="building_attachment_form"
                        value={props.building.building_attachment_form}
                        tooltip={dataFields.building_attachment_form.tooltip}
                        options={dataFields.building_attachment_form.items}
                        mode={props.mode}
                        copy={props.copy}
                        onChange={props.onChange}
                    />
                    <Verification
                        slug="building_attachment_form"
                        allow_verify={props.user !== undefined && props.building.building_attachment_form !== null && !props.edited}
                        onVerify={props.onVerify}
                        user_verified={props.user_verified.hasOwnProperty("building_attachment_form")}
                        user_verified_as={props.user_verified.building_attachment_form}
                        verified_count={props.building.verified.building_attachment_form}
                        />
                    <SelectDataEntry
                        title={dataFields.building_attachment_source_type.title}
                        slug="building_attachment_source_type"
                        value={props.building.building_attachment_source_type}
                        mode={props.mode}
                        copy={props.copy}
                        onChange={props.onChange}
                        tooltip={dataFields.building_attachment_source_type.tooltip}
                        placeholder={dataFields.building_attachment_source_type.example}
                        options={dataFields.building_attachment_source_type.items}
                        />
                    {(props.building.building_attachment_source_type == commonSourceTypes[0] ||
                        props.building.building_attachment_source_type == commonSourceTypes[1] ||
                        props.building.building_attachment_source_type == null) ? <></> :
                        <>
                            <MultiDataEntry
                                title={dataFields.building_attachment_source_links.title}
                                slug="building_attachment_source_links"
                                value={props.building.building_attachment_source_links}
                                mode={props.mode}
                                copy={props.copy}
                                onChange={props.onChange}
                                tooltip={dataFields.building_attachment_source_links.tooltip}
                                placeholder="https://..."
                                editableEntries={true}
                                isUrl={true}
                            />
                        </>
                    }
                </DataEntryGroup>
                <DataEntryGroup name="Building Subdivision" collapsed={subcat==null || subcat!="5"}>
                <LogicalDataEntry
                    slug='location_subdivided'
                    title={dataFields.location_subdivided.title}
                    tooltip={dataFields.location_subdivided.tooltip}
                    value={props.building.location_subdivided}
                    copy={props.copy}
                    onChange={props.onChange}
                    mode={props.mode}
                />
                <Verification
                    slug="location_subdivided"
                    allow_verify={props.user !== undefined && props.building.location_subdivided !== null && !props.edited}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("location_subdivided")}
                    user_verified_as={props.user_verified.location_subdivided}
                    verified_count={props.building.verified.location_subdivided}
                />
                {props.building.location_subdivided == null ||
                    props.building.location_subdivided == false ? <></> :
                    <>
                        <NumericDataEntry
                            title={dataFields.location_num_subdivisions.title}
                            slug="location_num_subdivisions"
                            value={props.building.location_num_subdivisions}
                            mode={props.mode}
                            copy={props.copy}
                            tooltip={dataFields.location_num_subdivisions.tooltip}
                            onChange={props.onChange}
                            step={1}
                            min={0}
                        />
                        <Verification
                            slug="location_num_subdivisions"
                            allow_verify={props.user !== undefined && props.building.location_num_subdivisions !== null}
                            onVerify={props.onVerify}
                            user_verified={props.user_verified.hasOwnProperty("location_num_subdivisions")}
                            user_verified_as={props.user_verified.location_num_subdivisions}
                            verified_count={props.building.verified.location_num_subdivisions}
                        />
                        <SelectDataEntry
                            title={dataFields.location_subdivisions_source_type.title}
                            slug="location_subdivisions_source_type"
                            value={props.building.location_subdivisions_source_type}
                            options={dataFields.location_subdivisions_source_type.items}
                            mode={props.mode}
                            copy={props.copy}
                            onChange={props.onChange}
                            tooltip={dataFields.location_subdivisions_source_type.tooltip}
                        />
                        {(props.building.location_subdivisions_source_type == commonSourceTypes[0] ||
                            props.building.location_subdivisions_source_type == commonSourceTypes[1] ||
                            props.building.location_subdivisions_source_type == null) ? <></> :
                            <><MultiDataEntry
                                title={dataFields.location_subdivisions_source_links.title}
                                slug="location_subdivisions_source_links"
                                value={props.building.location_subdivisions_source_links}
                                mode={props.mode}
                                copy={props.copy}
                                onChange={props.onChange}
                                tooltip={dataFields.location_subdivisions_source_links.tooltip}
                                placeholder="https://..."
                                editableEntries={true}
                                isUrl={true}
                                />
                            </>
                        }
                    </>
                }
                </ DataEntryGroup>
                <DataEntryGroup name="Original Use" collapsed={subcat==null || subcat!="6"}>
                    {(props.mapColourScale != "original_landuse") ? 
                        <button className={`map-switcher-inline disabled-state btn btn-outline btn-outline-dark key-button`} onClick={switchToLandUseMapStyle}>
                            {"Click here to original land use."}
                        </button>
                    :
                        <></>
                    }
                    <MultiDataEntry
                        title={dataFields.typology_original_use.title}
                        slug="typology_original_use"
                        value={props.building.typology_original_use}
                        mode={props.mode}
                        copy={props.copy}
                        onChange={props.onChange}
                        confirmOnEnter={true}
                        tooltip={dataFields.typology_original_use.tooltip}
                        placeholder="Type new land use group here"
                        copyable={true}
                        autofill={true}
                        showAllOptionsOnEmpty={true}
                    />
                    <Verification
                        slug="typology_original_use"
                        allow_verify={props.user !== undefined && props.building.typology_original_use !== null && !props.edited}
                        onVerify={props.onVerify}
                        user_verified={props.user_verified.hasOwnProperty("typology_original_use")}
                        user_verified_as={props.user_verified.typology_original_use}
                        verified_count={props.building.verified.typology_original_use}
                    />
                    <SelectDataEntry
                        title={dataFields.typology_original_use_source_type.title}
                        slug="typology_original_use_source_type"
                        value={props.building.typology_original_use_source_type}
                        mode={props.mode}
                        copy={props.copy}
                        onChange={props.onChange}
                        tooltip={dataFields.typology_original_use_source_type.tooltip}
                        placeholder={dataFields.typology_original_use_source_type.example}
                        options={dataFields.typology_original_use_source_type.items}
                        />
                    {(props.building.typology_original_use_source_type == commonSourceTypes[0] ||
                        props.building.typology_original_use_source_type == commonSourceTypes[1] ||
                        props.building.typology_original_use_source_type == null) ? <></> :
                        <>
                            <MultiDataEntry
                                title={dataFields.typology_original_use_source_links.title}
                                slug="typology_original_use_source_links"
                                value={props.building.typology_original_use_source_links}
                                mode={props.mode}
                                copy={props.copy}
                                onChange={props.onChange}
                                tooltip={dataFields.typology_original_use_source_links.tooltip}
                                placeholder="https://..."
                                editableEntries={true}
                                isUrl={true}
                            />
                        </>
                    }
                    <hr/>
                    {
                        props.mode != 'view' &&
                        <div>
                            <div className={`alert alert-dark`} role="alert" style={{ fontSize: 13, backgroundColor: "#f6f8f9" }}>
                                <i>
                                    Below is a more general classification for the original land use of this building, automatically derived from the information above.
                                </i>
                            </div>
                        </div>
                    }
                    <DataEntry
                        title={dataFields.typology_original_use_order.title}
                        tooltip={dataFields.typology_original_use_order.tooltip}
                        slug="typology_original_use_order"
                        value={props.building.typology_original_use_order}
                        mode={props.mode}
                        disabled={true}
                        copy={props.copy}
                        onChange={props.onChange}
                    />
                </DataEntryGroup>
                <DataEntryGroup name="Dynamic Classification" collapsed={subcat==null || subcat!="7"}>
                    {(props.mapColourScale != "typology_dynamic_classification") ? 
                        <button className={`map-switcher-inline disabled-state btn btn-outline btn-outline-dark key-button`} onClick={switchToDynamicClassificationMapStyle}>
                            {"Click here to show dynamic classification."}
                        </button>
                        :
                        <></>
                    }
                    <SelectDataEntry
                        title={dataFields.typology_dynamic_classification.title}
                        slug="typology_dynamic_classification"
                        value={props.building.typology_dynamic_classification}
                        tooltip={dataFields.typology_dynamic_classification.tooltip}
                        options={dataFields.typology_dynamic_classification.items}
                        mode={props.mode}
                        copy={props.copy}
                        onChange={props.onChange}
                    />
                    <Verification
                        slug="typology_dynamic_classification"
                        allow_verify={props.user !== undefined && props.building.typology_dynamic_classification !== null && !props.edited}
                        onVerify={props.onVerify}
                        user_verified={props.user_verified.hasOwnProperty("typology_dynamic_classification")}
                        user_verified_as={props.user_verified.typology_dynamic_classification}
                        verified_count={props.building.verified.typology_dynamic_classification}
                    />
                    <SelectDataEntry
                        title={dataFields.typology_dynamic_classification_source_type.title}
                        slug="typology_dynamic_classification_source_type"
                        value={props.building.typology_dynamic_classification_source_type}
                        mode={props.mode}
                        copy={props.copy}
                        onChange={props.onChange}
                        tooltip={dataFields.typology_dynamic_classification_source_type.tooltip}
                        placeholder={dataFields.typology_dynamic_classification_source_type.example}
                        options={dataFields.typology_dynamic_classification_source_type.items}
                        />
                    {(props.building.typology_dynamic_classification_source_type == commonSourceTypes[0] ||
                        props.building.typology_dynamic_classification_source_type == commonSourceTypes[1] ||
                        props.building.typology_dynamic_classification_source_type == null) ? <></> :
                        <>
                            <MultiDataEntry
                                title={dataFields.typology_dynamic_classification_source_links.title}
                                slug="typology_dynamic_classification_source_links"
                                value={props.building.typology_dynamic_classification_source_links}
                                mode={props.mode}
                                copy={props.copy}
                                onChange={props.onChange}
                                tooltip={dataFields.typology_dynamic_classification_source_links.tooltip}
                                placeholder="https://..."
                                editableEntries={true}
                                isUrl={true}
                            />
                        </>
                    }
            </DataEntryGroup>
            </DataEntryGroup>
            <DataEntryGroup name="Size" collapsed={subcat==null || subcat!="1"}>
                <DataEntryGroup name="Number of Floors/Storeys" collapsed={subcat==null || subcat!="1"}>
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
                    <NumericDataEntry
                        title="Total number of floors"
                        slug="size_total_floors"
                        value={total_floors}
                        mode={props.mode}
                        copy={props.copy}
                        tooltip="Total number of floors, calculated from other values."
                        onChange={props.onChange}
                        step={1}
                        min={0}
                        disabled={true}
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
                <DataEntryGroup name="Height" collapsed={subcat==null || subcat!="2"}>
                    <NumericDataEntry
                        title={dataFields.size_height_apex.title}
                        slug="size_height_apex"
                        value={props.building.size_height_apex}
                        mode={props.mode}
                        copy={props.copy}
                        onChange={props.onChange}
                        tooltip={dataFields.size_height_apex.tooltip}
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
                        tooltip={dataFields.size_height_eaves.tooltip}
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
                <DataEntryGroup name="Floor Area" collapsed={subcat==null || subcat!="3"}>
                    <NumericDataEntry
                        title={dataFields.size_floor_area_ground.title}
                        slug="size_floor_area_ground"
                        value={props.building.size_floor_area_ground}
                        tooltip={dataFields.size_floor_area_ground.tooltip}
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
                        tooltip={dataFields.size_floor_area_total.tooltip}
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
                <DataEntryGroup name="Plot Size" collapsed={subcat==null || subcat!="4"}>
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
                        copy={props.copy}
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
                        copy={props.copy}
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
            </DataEntryGroup>
        </Fragment>
    );
    };
const TypologySizeContainer = withCopyEdit(TypologySizeView);

export default TypologySizeContainer;
