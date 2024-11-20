import React, { Fragment } from 'react';

import { commonSourceTypes, dataFields } from '../../config/data-fields-config';
import DataEntry from '../data-components/data-entry';
import { DataEntryGroup } from '../data-components/data-entry-group';
import NumericDataEntry from '../data-components/numeric-data-entry';
import SelectDataEntry from '../data-components/select-data-entry';
import Verification from '../data-components/verification';
import withCopyEdit from '../data-container';

import { CategoryViewProps } from './category-view-props';
import { MultiDataEntry } from '../data-components/multi-data-entry/multi-data-entry';
import { LogicalDataEntry, LogicalDataEntryYesOnly } from '../data-components/logical-data-entry/logical-data-entry';

/**
* Construction & Design view/edit section
*/
const ConstructionDesignView: React.FunctionComponent<CategoryViewProps> = (props) => {
    
    const queryParameters = new URLSearchParams(window.location.search);
    const subcat = queryParameters.get("sc");

    const currentYear = new Date().getFullYear();

    const switchToCoreMaterialMapStyle = (e) => {
        e.preventDefault();
        props.onMapColourScale('construction_core_material')
    }
    const switchToStructuralSystemMapStyle = (e) => {
        e.preventDefault();
        props.onMapColourScale('construction_structural_system')
    }
    const switchToFoundationsMapStyle = (e) => {
        e.preventDefault();
        props.onMapColourScale('construction_foundation')
    }
    const switchToRoofShapeMapStyle = (e) => {
        e.preventDefault();
        props.onMapColourScale('construction_roof_shape')
    }
    const switchToRoofCoveringsMapStyle = (e) => {
        e.preventDefault();
        props.onMapColourScale('construction_roof_covering')
    }
    
    return (
        <Fragment>
            <DataEntryGroup name="Construction" collapsed={subcat==null || subcat!="1"}>
                <DataEntryGroup name="Structural system" collapsed={subcat==null || subcat!="1"}>
                    {(props.mapColourScale != "construction_structural_system") ? 
                        <button className={`map-switcher-inline disabled-state btn btn-outline btn-outline-dark key-button`} onClick={switchToStructuralSystemMapStyle}>
                            {"Click to view structural system data."}
                        </button>
                        :
                        <></>
                    }
                    <SelectDataEntry
                            title={dataFields.construction_structural_system.title}
                            slug="construction_structural_system"
                            value={props.building.construction_structural_system}
                            tooltip={dataFields.construction_structural_system.tooltip}
                            options={dataFields.construction_structural_system.items}
                            mode={props.mode}
                            copy={props.copy}
                            onChange={props.onChange}
                        />
                        <Verification
                            slug="construction_structural_system"
                            allow_verify={props.user !== undefined && props.building.construction_structural_system !== null && !props.edited}
                            onVerify={props.onVerify}
                            user_verified={props.user_verified.hasOwnProperty("construction_structural_system")}
                            user_verified_as={props.user_verified.construction_structural_system}
                            verified_count={props.building.verified.construction_structural_system}
                        />
                        <SelectDataEntry
                            title={dataFields.construction_structural_system_source_type.title}
                            slug="construction_structural_system_source_type"
                            value={props.building.construction_structural_system_source_type}
                            mode={props.mode}
                            copy={props.copy}
                            onChange={props.onChange}
                            tooltip={dataFields.construction_structural_system_source_type.tooltip}
                            placeholder={dataFields.construction_structural_system_source_type.example}
                            options={dataFields.construction_structural_system_source_type.items}
                            />
                        {(props.building.construction_structural_system_source_type == commonSourceTypes[0] ||
                            props.building.construction_structural_system_source_type == commonSourceTypes[1] ||
                            props.building.construction_structural_system_source_type == null) ? <></> :
                            <>
                                <MultiDataEntry
                                    title={dataFields.construction_structural_system_source_links.title}
                                    slug="construction_structural_system_source_links"
                                    value={props.building.construction_structural_system_source_links}
                                    mode={props.mode}
                                    copy={props.copy}
                                    onChange={props.onChange}
                                    tooltip={dataFields.construction_structural_system_source_links.tooltip}
                                    placeholder="https://..."
                                    editableEntries={true}
                                    isUrl={true}
                                />
                            </>
                        }
                        <hr/>
                        {(props.mapColourScale != "construction_foundation") ? 
                            <button className={`map-switcher-inline disabled-state btn btn-outline btn-outline-dark key-button`} onClick={switchToFoundationsMapStyle}>
                                {"Click to view foundation data."}
                            </button>
                            :
                            <></>
                        }
                        <SelectDataEntry
                            title={dataFields.construction_foundation.title}
                            slug="construction_foundation"
                            value={props.building.construction_foundation}
                            tooltip={dataFields.construction_foundation.tooltip}
                            options={dataFields.construction_foundation.items}
                            mode={props.mode}
                            copy={props.copy}
                            onChange={props.onChange}
                        />
                        <Verification
                            slug="construction_foundation"
                            allow_verify={props.user !== undefined && props.building.construction_foundation !== null && !props.edited}
                            onVerify={props.onVerify}
                            user_verified={props.user_verified.hasOwnProperty("construction_foundation")}
                            user_verified_as={props.user_verified.construction_foundation}
                            verified_count={props.building.verified.construction_foundation}
                        />
                        <SelectDataEntry
                            title={dataFields.construction_foundation_source_type.title}
                            slug="construction_foundation_source_type"
                            value={props.building.construction_foundation_source_type}
                            mode={props.mode}
                            copy={props.copy}
                            onChange={props.onChange}
                            tooltip={dataFields.construction_foundation_source_type.tooltip}
                            placeholder={dataFields.construction_foundation_source_type.example}
                            options={dataFields.construction_foundation_source_type.items}
                            />
                        {(props.building.construction_foundation_source_type == commonSourceTypes[0] ||
                            props.building.construction_foundation_source_type == commonSourceTypes[1] ||
                            props.building.construction_foundation_source_type == null) ? <></> :
                            <>
                                <MultiDataEntry
                                    title={dataFields.construction_foundation_source_links.title}
                                    slug="construction_foundation_source_links"
                                    value={props.building.construction_foundation_source_links}
                                    mode={props.mode}
                                    copy={props.copy}
                                    onChange={props.onChange}
                                    tooltip={dataFields.construction_foundation_source_links.tooltip}
                                    placeholder="https://..."
                                    editableEntries={true}
                                    isUrl={true}
                                />
                            </>
                        }
                        <hr/>
                        {(props.mapColourScale != "construction_roof_shape") ? 
                            <button className={`map-switcher-inline disabled-state btn btn-outline btn-outline-dark key-button`} onClick={switchToRoofShapeMapStyle}>
                                {"Click to view roof shape data."}
                            </button>
                            :
                            <></>
                        }
                        <SelectDataEntry
                            title={dataFields.construction_roof_shape.title}
                            slug="construction_roof_shape"
                            value={props.building.construction_roof_shape}
                            tooltip={dataFields.construction_roof_shape.tooltip}
                            options={dataFields.construction_roof_shape.items}
                            mode={props.mode}
                            copy={props.copy}
                            onChange={props.onChange}
                        />
                        <Verification
                            slug="construction_roof_shape"
                            allow_verify={props.user !== undefined && props.building.construction_roof_shape !== null && !props.edited}
                            onVerify={props.onVerify}
                            user_verified={props.user_verified.hasOwnProperty("construction_roof_shape")}
                            user_verified_as={props.user_verified.construction_roof_shape}
                            verified_count={props.building.verified.construction_roof_shape}
                        />
                        <SelectDataEntry
                            title={dataFields.construction_roof_shape_source_type.title}
                            slug="construction_roof_shape_source_type"
                            value={props.building.construction_roof_shape_source_type}
                            mode={props.mode}
                            copy={props.copy}
                            onChange={props.onChange}
                            tooltip={dataFields.construction_roof_shape_source_type.tooltip}
                            placeholder={dataFields.construction_roof_shape_source_type.example}
                            options={dataFields.construction_roof_shape_source_type.items}
                            />
                        {(props.building.construction_roof_shape_source_type == commonSourceTypes[0] ||
                            props.building.construction_roof_shape_source_type == commonSourceTypes[1] ||
                            props.building.construction_roof_shape_source_type == null) ? <></> :
                            <>
                                <MultiDataEntry
                                    title={dataFields.construction_roof_shape_source_links.title}
                                    slug="construction_roof_shape_source_links"
                                    value={props.building.construction_roof_shape_source_links}
                                    mode={props.mode}
                                    copy={props.copy}
                                    onChange={props.onChange}
                                    tooltip={dataFields.construction_roof_shape_source_links.tooltip}
                                    placeholder="https://..."
                                    editableEntries={true}
                                    isUrl={true}
                                />
                            </>
                        }
                        <hr/>
                        <SelectDataEntry
                            title={dataFields.construction_irregularities.title}
                            slug="construction_irregularities"
                            value={props.building.construction_irregularities}
                            tooltip={dataFields.construction_irregularities.tooltip}
                            options={dataFields.construction_irregularities.items}
                            mode={props.mode}
                            copy={props.copy}
                            onChange={props.onChange}
                        />
                        <Verification
                            slug="construction_irregularities"
                            allow_verify={props.user !== undefined && props.building.construction_irregularities !== null && !props.edited}
                            onVerify={props.onVerify}
                            user_verified={props.user_verified.hasOwnProperty("construction_irregularities")}
                            user_verified_as={props.user_verified.construction_irregularities}
                            verified_count={props.building.verified.construction_irregularities}
                        />
                        <SelectDataEntry
                            title={dataFields.construction_irregularities_source_type.title}
                            slug="construction_irregularities_source_type"
                            value={props.building.construction_irregularities_source_type}
                            mode={props.mode}
                            copy={props.copy}
                            onChange={props.onChange}
                            tooltip={dataFields.construction_irregularities_source_type.tooltip}
                            placeholder={dataFields.construction_irregularities_source_type.example}
                            options={dataFields.construction_irregularities_source_type.items}
                            />
                        {(props.building.construction_irregularities_source_type == commonSourceTypes[0] ||
                            props.building.construction_irregularities_source_type == commonSourceTypes[1] ||
                            props.building.construction_irregularities_source_type == null) ? <></> :
                            <>
                                <MultiDataEntry
                                    title={dataFields.construction_irregularities_source_links.title}
                                    slug="construction_irregularities_source_links"
                                    value={props.building.construction_irregularities_source_links}
                                    mode={props.mode}
                                    copy={props.copy}
                                    onChange={props.onChange}
                                    tooltip={dataFields.construction_irregularities_source_links.tooltip}
                                    placeholder="https://..."
                                    editableEntries={true}
                                    isUrl={true}
                                />
                            </>
                        }
                    </DataEntryGroup>
                    <DataEntryGroup name="Materials" collapsed={subcat==null || subcat!="2"}>
                        {props.mapColourScale != "construction_core_material" ?
                            <button className={`map-switcher-inline disabled-state btn btn-outline btn-outline-dark key-button`} onClick={switchToCoreMaterialMapStyle}>
                                {'Click to view core material data'}
                            </button>
                            :
                            <></>
                        }
                        <SelectDataEntry
                            title={dataFields.construction_core_material.title}
                            slug="construction_core_material"
                            value={props.building.construction_core_material}
                            tooltip={dataFields.construction_core_material.tooltip}
                            options={dataFields.construction_core_material.items}
                            mode={props.mode}
                            copy={props.copy}
                            onChange={props.onChange}
                        />
                        <Verification
                            slug="construction_core_material"
                            allow_verify={props.user !== undefined && props.building.construction_core_material !== null && !props.edited}
                            onVerify={props.onVerify}
                            user_verified={props.user_verified.hasOwnProperty("construction_core_material")}
                            user_verified_as={props.user_verified.construction_core_material}
                            verified_count={props.building.verified.construction_core_material}
                        />
                        <SelectDataEntry
                            title={dataFields.construction_core_material_source_type.title}
                            slug="construction_core_material_source_type"
                            value={props.building.construction_core_material_source_type}
                            mode={props.mode}
                            copy={props.copy}
                            onChange={props.onChange}
                            tooltip={dataFields.construction_core_material_source_type.tooltip}
                            placeholder={dataFields.construction_core_material_source_type.example}
                            options={dataFields.construction_core_material_source_type.items}
                            />
                        {(props.building.construction_core_material_source_type == commonSourceTypes[0] ||
                            props.building.construction_core_material_source_type == commonSourceTypes[1] ||
                            props.building.construction_core_material_source_type == null) ? <></> :
                            <>
                                <MultiDataEntry
                                    title={dataFields.construction_core_material_source_links.title}
                                    slug="construction_core_material_source_links"
                                    value={props.building.construction_core_material_source_links}
                                    mode={props.mode}
                                    copy={props.copy}
                                    onChange={props.onChange}
                                    tooltip={dataFields.construction_core_material_source_links.tooltip}
                                    placeholder="https://..."
                                    editableEntries={true}
                                    isUrl={true}
                                />
                            </>
                        }
                        <hr/>
                        <SelectDataEntry
                            title={dataFields.construction_external_wall.title}
                            slug="construction_external_wall"
                            value={props.building.construction_external_wall}
                            tooltip={dataFields.construction_external_wall.tooltip}
                            options={dataFields.construction_external_wall.items}
                            mode={props.mode}
                            copy={props.copy}
                            onChange={props.onChange}
                        />
                        <Verification
                            slug="construction_external_wall"
                            allow_verify={props.user !== undefined && props.building.construction_external_wall !== null && !props.edited}
                            onVerify={props.onVerify}
                            user_verified={props.user_verified.hasOwnProperty("construction_external_wall")}
                            user_verified_as={props.user_verified.construction_external_wall}
                            verified_count={props.building.verified.construction_external_wall}
                        />
                        <SelectDataEntry
                            title={dataFields.construction_external_wall_source_type.title}
                            slug="construction_external_wall_source_type"
                            value={props.building.construction_external_wall_source_type}
                            mode={props.mode}
                            copy={props.copy}
                            onChange={props.onChange}
                            tooltip={dataFields.construction_external_wall_source_type.tooltip}
                            placeholder={dataFields.construction_external_wall_source_type.example}
                            options={dataFields.construction_external_wall_source_type.items}
                            />
                        {(props.building.construction_external_wall_source_type == commonSourceTypes[0] ||
                            props.building.construction_external_wall_source_type == commonSourceTypes[1] ||
                            props.building.construction_external_wall_source_type == null) ? <></> :
                            <>
                                <MultiDataEntry
                                    title={dataFields.construction_external_wall_source_links.title}
                                    slug="construction_external_wall_source_links"
                                    value={props.building.construction_external_wall_source_links}
                                    mode={props.mode}
                                    copy={props.copy}
                                    onChange={props.onChange}
                                    tooltip={dataFields.construction_external_wall_source_links.tooltip}
                                    placeholder="https://..."
                                    editableEntries={true}
                                    isUrl={true}
                                />
                            </>
                        }
                        <hr/>
                        <SelectDataEntry
                            title={dataFields.construction_internal_wall.title}
                            slug="construction_internal_wall"
                            value={props.building.construction_internal_wall}
                            tooltip={dataFields.construction_internal_wall.tooltip}
                            options={dataFields.construction_internal_wall.items}
                            mode={props.mode}
                            copy={props.copy}
                            onChange={props.onChange}
                        />
                        <Verification
                            slug="construction_internal_wall"
                            allow_verify={props.user !== undefined && props.building.construction_internal_wall !== null && !props.edited}
                            onVerify={props.onVerify}
                            user_verified={props.user_verified.hasOwnProperty("construction_internal_wall")}
                            user_verified_as={props.user_verified.construction_internal_wall}
                            verified_count={props.building.verified.construction_internal_wall}
                        />
                        <SelectDataEntry
                            title={dataFields.construction_internal_wall_source_type.title}
                            slug="construction_internal_wall_source_type"
                            value={props.building.construction_internal_wall_source_type}
                            mode={props.mode}
                            copy={props.copy}
                            onChange={props.onChange}
                            tooltip={dataFields.construction_internal_wall_source_type.tooltip}
                            placeholder={dataFields.construction_internal_wall_source_type.example}
                            options={dataFields.construction_internal_wall_source_type.items}
                            />
                        {(props.building.construction_internal_wall_source_type == commonSourceTypes[0] ||
                            props.building.construction_internal_wall_source_type == commonSourceTypes[1] ||
                            props.building.construction_internal_wall_source_type == null) ? <></> :
                            <>
                                <MultiDataEntry
                                    title={dataFields.construction_internal_wall_source_links.title}
                                    slug="construction_internal_wall_source_links"
                                    value={props.building.construction_internal_wall_source_links}
                                    mode={props.mode}
                                    copy={props.copy}
                                    onChange={props.onChange}
                                    tooltip={dataFields.construction_internal_wall_source_links.tooltip}
                                    placeholder="https://..."
                                    editableEntries={true}
                                    isUrl={true}
                                />
                            </>
                        }
                        <hr/>
                        <SelectDataEntry
                            title={dataFields.construction_ground_floor.title}
                            slug="construction_ground_floor"
                            value={props.building.construction_ground_floor}
                            tooltip={dataFields.construction_ground_floor.tooltip}
                            options={dataFields.construction_ground_floor.items}
                            mode={props.mode}
                            copy={props.copy}
                            onChange={props.onChange}
                        />
                        <Verification
                            slug="construction_ground_floor"
                            allow_verify={props.user !== undefined && props.building.construction_ground_floor !== null && !props.edited}
                            onVerify={props.onVerify}
                            user_verified={props.user_verified.hasOwnProperty("construction_ground_floor")}
                            user_verified_as={props.user_verified.construction_ground_floor}
                            verified_count={props.building.verified.construction_ground_floor}
                        />
                        <SelectDataEntry
                            title={dataFields.construction_ground_floor_source_type.title}
                            slug="construction_ground_floor_source_type"
                            value={props.building.construction_ground_floor_source_type}
                            mode={props.mode}
                            copy={props.copy}
                            onChange={props.onChange}
                            tooltip={dataFields.construction_ground_floor_source_type.tooltip}
                            placeholder={dataFields.construction_ground_floor_source_type.example}
                            options={dataFields.construction_ground_floor_source_type.items}
                            />
                        {(props.building.construction_ground_floor_source_type == commonSourceTypes[0] ||
                            props.building.construction_ground_floor_source_type == commonSourceTypes[1] ||
                            props.building.construction_ground_floor_source_type == null) ? <></> :
                            <>
                                <MultiDataEntry
                                    title={dataFields.construction_ground_floor_source_links.title}
                                    slug="construction_ground_floor_source_links"
                                    value={props.building.construction_ground_floor_source_links}
                                    mode={props.mode}
                                    copy={props.copy}
                                    onChange={props.onChange}
                                    tooltip={dataFields.construction_ground_floor_source_links.tooltip}
                                    placeholder="https://..."
                                    editableEntries={true}
                                    isUrl={true}
                                />
                            </>
                        }
                        <hr/>
                        {(props.mapColourScale != "construction_roof_covering") ? 
                            <button className={`map-switcher-inline disabled-state btn btn-outline btn-outline-dark key-button`} onClick={switchToRoofCoveringsMapStyle}>
                                {"Click to view roof covering data."}
                            </button>
                            :
                            <></>
                        }
                        <SelectDataEntry
                            title={dataFields.construction_roof_covering.title}
                            slug="construction_roof_covering"
                            value={props.building.construction_roof_covering}
                            tooltip={dataFields.construction_roof_covering.tooltip}
                            options={dataFields.construction_roof_covering.items}
                            mode={props.mode}
                            copy={props.copy}
                            onChange={props.onChange}
                        />
                        <Verification
                            slug="construction_roof_covering"
                            allow_verify={props.user !== undefined && props.building.construction_roof_covering !== null && !props.edited}
                            onVerify={props.onVerify}
                            user_verified={props.user_verified.hasOwnProperty("construction_roof_covering")}
                            user_verified_as={props.user_verified.construction_roof_covering}
                            verified_count={props.building.verified.construction_roof_covering}
                        />
                        <SelectDataEntry
                            title={dataFields.construction_roof_covering_source_type.title}
                            slug="construction_roof_covering_source_type"
                            value={props.building.construction_roof_covering_source_type}
                            mode={props.mode}
                            copy={props.copy}
                            onChange={props.onChange}
                            tooltip={dataFields.construction_roof_covering_source_type.tooltip}
                            placeholder={dataFields.construction_roof_covering_source_type.example}
                            options={dataFields.construction_roof_covering_source_type.items}
                            />
                        {(props.building.construction_roof_covering_source_type == commonSourceTypes[0] ||
                            props.building.construction_roof_covering_source_type == commonSourceTypes[1] ||
                            props.building.construction_roof_covering_source_type == null) ? <></> :
                            <>
                                <MultiDataEntry
                                    title={dataFields.construction_roof_covering_source_links.title}
                                    slug="construction_roof_covering_source_links"
                                    value={props.building.construction_roof_covering_source_links}
                                    mode={props.mode}
                                    copy={props.copy}
                                    onChange={props.onChange}
                                    tooltip={dataFields.construction_roof_covering_source_links.tooltip}
                                    placeholder="https://..."
                                    editableEntries={true}
                                    isUrl={true}
                                />
                            </>
                        }
                    </DataEntryGroup>
                    <DataEntryGroup name="Decorative features"  collapsed={subcat==null || subcat!="3"}>
                        <LogicalDataEntry
                            slug='construction_decorative_features'
                            title={dataFields.construction_decorative_features.title}
                            value={props.building.construction_decorative_features}
                            tooltip={dataFields.construction_decorative_features.tooltip}
                            onChange={props.onSaveChange}
                            mode={props.mode}
                            copy={props.copy}
                        />
                        <Verification
                            slug="construction_decorative_features"
                            allow_verify={props.user !== undefined && props.building.construction_decorative_features !== null && !props.edited}
                            onVerify={props.onVerify}
                            user_verified={props.user_verified.hasOwnProperty("construction_decorative_features")}
                            user_verified_as={props.user_verified.construction_decorative_features}
                            verified_count={props.building.verified.construction_decorative_features}
                        />
                        {
                            props.building.construction_decorative_features &&
                            <>
                                <SelectDataEntry
                                    title={dataFields.construction_decorative_feature_materials.title}
                                    slug="construction_decorative_feature_materials"
                                    value={props.building.construction_decorative_feature_materials}
                                    tooltip={dataFields.construction_decorative_feature_materials.tooltip}
                                    options={dataFields.construction_decorative_feature_materials.items}
                                    mode={props.mode}
                                    copy={props.copy}
                                    onChange={props.onChange}
                                />
                                <Verification
                                    slug="construction_decorative_feature_materials"
                                    allow_verify={props.user !== undefined && props.building.construction_decorative_feature_materials !== null && !props.edited}
                                    onVerify={props.onVerify}
                                    user_verified={props.user_verified.hasOwnProperty("construction_decorative_feature_materials")}
                                    user_verified_as={props.user_verified.construction_decorative_feature_materials}
                                    verified_count={props.building.verified.construction_decorative_feature_materials}
                                />
                                <SelectDataEntry
                                    title={dataFields.construction_decorative_feature_source_type.title}
                                    slug="construction_decorative_feature_source_type"
                                    value={props.building.construction_decorative_feature_source_type}
                                    mode={props.mode}
                                    copy={props.copy}
                                    onChange={props.onChange}
                                    tooltip={dataFields.construction_decorative_feature_source_type.tooltip}
                                    placeholder={dataFields.construction_decorative_feature_source_type.example}
                                    options={dataFields.construction_decorative_feature_source_type.items}
                                    />
                                {(props.building.construction_decorative_feature_source_type == commonSourceTypes[0] ||
                                    props.building.construction_decorative_feature_source_type == commonSourceTypes[1] ||
                                    props.building.construction_decorative_feature_source_type == null) ? <></> :
                                    <>
                                        <MultiDataEntry
                                            title={dataFields.construction_decorative_feature_source_links.title}
                                            slug="construction_decorative_feature_source_links"
                                            value={props.building.construction_decorative_feature_source_links}
                                            mode={props.mode}
                                            copy={props.copy}
                                            onChange={props.onChange}
                                            tooltip={dataFields.construction_decorative_feature_source_links.tooltip}
                                            placeholder="https://..."
                                            editableEntries={true}
                                            isUrl={true}
                                        />
                                    </>
                                }
                            </>
                        }
                    </DataEntryGroup>
                </DataEntryGroup>
            <DataEntryGroup name="Design / Team" collapsed={subcat==null || subcat!="2"}>
                <DataEntryGroup name="Land ownership at time of construction" collapsed={subcat==null || subcat!="1"}>
                    <MultiDataEntry
                        title={dataFields.landowner.title}
                        slug="landowner"
                        value={props.building.landowner}
                        mode={props.mode}
                        copy={props.copy}
                        onChange={props.onChange}
                        tooltip={dataFields.landowner.tooltip}
                        placeholder=""
                        editableEntries={true}
                        disabled={true}
                        />
                    <Verification
                        slug="landowner"
                        allow_verify={props.user !== undefined && props.building.landowner !== null && !props.edited}
                        onVerify={props.onVerify}
                        user_verified={props.user_verified.hasOwnProperty("landowner")}
                        user_verified_as={props.user_verified.landowner}
                        verified_count={props.building.verified.landowner}
                        />
                    <MultiDataEntry
                        title={dataFields.landowner_links.title}
                        slug="landowner_links"
                        value={props.building.landowner_links}
                        mode={props.mode}
                        copy={props.copy}
                        onChange={props.onChange}
                        tooltip={dataFields.landowner_links.tooltip}
                        placeholder="https://..."
                        editableEntries={true}
                        isUrl={true}
                    />
                    <SelectDataEntry
                        title={dataFields.landowner_source_type.title}
                        slug="landowner_source_type"
                        value={props.building.landowner_source_type}
                        mode={props.mode}
                        copy={props.copy}
                        onChange={props.onChange}
                        tooltip={dataFields.landowner_source_type.tooltip}
                        options={dataFields.landowner_source_type.items}
                        placeholder={dataFields.landowner_source_type.example}
                        />
                    {(props.building.landowner_source_type == commonSourceTypes[0] ||
                        props.building.landowner_source_type == commonSourceTypes[1] ||
                        props.building.landowner_source_type == null) ? <></> :
                        <>
                            <MultiDataEntry
                                title={dataFields.landowner_source_link.title}
                                slug="landowner_source_link"
                                value={props.building.landowner_source_link}
                                mode={props.mode}
                                copy={props.copy}
                                onChange={props.onChange}
                                tooltip={dataFields.landowner_source_link.tooltip}
                                placeholder="https://..."
                                editableEntries={true}
                                isUrl={true}
                            />
                        </>
                    }
                </DataEntryGroup>
                <DataEntryGroup name="Main building" collapsed={subcat==null || subcat!="2"}>
                    <NumericDataEntry
                        title={dataFields.date_year.title}
                        slug="date_year"
                        value={props.building.date_year}
                        mode={props.mode}
                        copy={props.copy}
                        onChange={props.onChange}
                        step={1}
                        min={1}
                        max={currentYear}
                        tooltip={dataFields.date_year.tooltip}
                        disabled={true}
                    />
                    <div className={`alert alert-dark`} role="alert" style={{ fontSize: 14, backgroundColor: "#f6f8f9" }}>
                        <i className="source-url">To edit the building age, and to see the data mapped, please go to&nbsp;
                        <a href={"/"+props.mode+"/age/"+props.building.building_id+"?sc=1"}>Age & History</a>.</i>
                    </div>
                    <DataEntryGroup name="Client" collapsed={subcat==null || subcat!="3"}>
                        <MultiDataEntry
                            slug='building_client'
                            title={dataFields.building_client.title}
                            value={props.building.building_client}
                            tooltip={dataFields.building_client.tooltip}
                            onChange={props.onChange}
                            mode={props.mode}
                            copy={props.copy}
                        />
                        <Verification
                            slug="building_client"
                            allow_verify={props.user !== undefined && props.building.building_client !== null && !props.edited}
                            onVerify={props.onVerify}
                            user_verified={props.user_verified.hasOwnProperty("building_client")}
                            user_verified_as={props.user_verified.building_client}
                            verified_count={props.building.verified.building_client}
                        />
                        <SelectDataEntry
                            title={dataFields.building_client_source_type.title}
                            slug="building_client_source_type"
                            value={props.building.building_client_source_type}
                            mode={props.mode}
                            copy={props.copy}
                            onChange={props.onChange}
                            tooltip={dataFields.building_client_source_type.tooltip}
                            options={dataFields.building_client_source_type.items}
                            placeholder={dataFields.building_client_source_type.example}
                            />
                        {(props.building.building_client_source_type == commonSourceTypes[0] ||
                            props.building.building_client_source_type == commonSourceTypes[1] ||
                            props.building.building_client_source_type == null) ? <></> :
                            <>
                                <MultiDataEntry
                                    title={dataFields.building_client_source_link.title}
                                    slug="building_client_source_link"
                                    value={props.building.building_client_source_link}
                                    mode={props.mode}
                                    copy={props.copy}
                                    onChange={props.onChange}
                                    tooltip={dataFields.building_client_source_link.tooltip}
                                    placeholder="https://..."
                                    editableEntries={true}
                                    isUrl={true}
                                />
                            </>
                        }
                    </DataEntryGroup>
                    <DataEntryGroup name="Designer" collapsed={subcat==null || subcat!="4"}>
                        <SelectDataEntry
                            slug='lead_designer_type'
                            title={dataFields.lead_designer_type.title}
                            value={props.building.lead_designer_type}
                            options={dataFields.lead_designer_type.items}
                            tooltip={dataFields.lead_designer_type.tooltip}
                            onChange={props.onChange}
                            mode={props.mode}
                            copy={props.copy}
                        />
                        <Verification
                            slug="lead_designer_type"
                            allow_verify={props.user !== undefined && props.building.lead_designer_type !== null && !props.edited}
                            onVerify={props.onVerify}
                            user_verified={props.user_verified.hasOwnProperty("lead_designer_type")}
                            user_verified_as={props.user_verified.lead_designer_type}
                            verified_count={props.building.verified.lead_designer_type}
                        />
                        <MultiDataEntry
                            title={dataFields.designers.title}
                            slug="designers"
                            value={props.building.designers}
                            mode={props.mode}
                            copy={props.copy}
                            onChange={props.onChange}
                            tooltip={dataFields.designers.tooltip}
                            placeholder=""
                            editableEntries={true}
                            disabled={true}
                            />
                        <Verification
                            slug="designers"
                            allow_verify={props.user !== undefined && props.building.designers !== null && !props.edited}
                            onVerify={props.onVerify}
                            user_verified={props.user_verified.hasOwnProperty("designers")}
                            user_verified_as={props.user_verified.designers}
                            verified_count={props.building.verified.designers}
                        />
                        <MultiDataEntry
                            title={dataFields.designers_links.title}
                            slug="designers_links"
                            value={props.building.designers_links}
                            mode={props.mode}
                            copy={props.copy}
                            onChange={props.onChange}
                            tooltip={dataFields.designers_links.tooltip}
                            placeholder="https://..."
                            editableEntries={true}
                            isUrl={true}
                        />
                        <SelectDataEntry
                            title={dataFields.designers_source_type.title}
                            slug="designers_source_type"
                            value={props.building.designers_source_type}
                            mode={props.mode}
                            copy={props.copy}
                            onChange={props.onChange}
                            tooltip={dataFields.designers_source_type.tooltip}
                            options={dataFields.designers_source_type.items}
                            placeholder={dataFields.designers_source_type.example}
                            />
                        {(props.building.designers_source_type == commonSourceTypes[0] ||
                            props.building.designers_source_type == commonSourceTypes[1] ||
                            props.building.designers_source_type == null) ? <></> :
                            <>
                                <MultiDataEntry
                                    title={dataFields.designers_source_link.title}
                                    slug="designers_source_link"
                                    value={props.building.designers_source_link}
                                    mode={props.mode}
                                    copy={props.copy}
                                    onChange={props.onChange}
                                    tooltip={dataFields.designers_source_link.tooltip}
                                    placeholder="https://..."
                                    editableEntries={true}
                                    isUrl={true}
                                />
                            </>
                        }
                    </DataEntryGroup>
                    <DataEntryGroup name="Developer" collapsed={subcat==null || subcat!="5"}>
                        <SelectDataEntry
                            slug='developer_type'
                            title={dataFields.developer_type.title}
                            tooltip={dataFields.developer_type.tooltip}
                            value={props.building.developer_type}
                            options={dataFields.developer_type.items}
                            onChange={props.onChange}
                            mode={props.mode}
                            copy={props.copy}
                        />
                        <Verification
                            slug="developer_type"
                            allow_verify={props.user !== undefined && props.building.developer_type !== null && !props.edited}
                            onVerify={props.onVerify}
                            user_verified={props.user_verified.hasOwnProperty("developer_type")}
                            user_verified_as={props.user_verified.developer_type}
                            verified_count={props.building.verified.developer_type}
                            />
                        <MultiDataEntry
                            title={dataFields.developer_name.title}
                            slug="developer_name"
                            value={props.building.developer_name}
                            mode={props.mode}
                            copy={props.copy}
                            onChange={props.onChange}
                            tooltip={dataFields.developer_name.tooltip}
                            placeholder=""
                            editableEntries={true}
                            disabled={true}
                            />
                        <Verification
                            slug="developer_name"
                            allow_verify={props.user !== undefined && props.building.developer_name !== null && !props.edited}
                            onVerify={props.onVerify}
                            user_verified={props.user_verified.hasOwnProperty("developer_name")}
                            user_verified_as={props.user_verified.developer_name}
                            verified_count={props.building.verified.developer_name}
                            />
                        <MultiDataEntry
                            title={dataFields.developer_links.title}
                            slug="developer_links"
                            value={props.building.developer_links}
                            mode={props.mode}
                            copy={props.copy}
                            onChange={props.onChange}
                            tooltip={dataFields.developer_links.tooltip}
                            placeholder="https://..."
                            editableEntries={true}
                            isUrl={true}
                        />
                        <SelectDataEntry
                            title={dataFields.developer_source_type.title}
                            slug="developer_source_type"
                            value={props.building.developer_source_type}
                            mode={props.mode}
                            copy={props.copy}
                            onChange={props.onChange}
                            tooltip={dataFields.developer_source_type.tooltip}
                            options={dataFields.developer_source_type.items}
                            placeholder={dataFields.developer_source_type.example}
                            />
                        {(props.building.developer_source_type == commonSourceTypes[0] ||
                            props.building.developer_source_type == commonSourceTypes[1] ||
                            props.building.developer_source_type == null) ? <></> :
                            <>
                                <MultiDataEntry
                                    title={dataFields.developer_source_link.title}
                                    slug="developer_source_link"
                                    value={props.building.developer_source_link}
                                    mode={props.mode}
                                    copy={props.copy}
                                    onChange={props.onChange}
                                    tooltip={dataFields.developer_source_link.tooltip}
                                    placeholder="https://..."
                                    editableEntries={true}
                                    isUrl={true}
                                />
                            </>
                        }
                    </DataEntryGroup>
                    <DataEntryGroup name="Builder" collapsed={subcat==null || subcat!="6"}>
                        <MultiDataEntry
                            title={dataFields.builder.title}
                            slug="builder"
                            value={props.building.builder}
                            mode={props.mode}
                            copy={props.copy}
                            onChange={props.onChange}
                            tooltip={dataFields.builder.tooltip}
                            placeholder=""
                            editableEntries={true}
                            disabled={true}
                            />
                        <Verification
                            slug="builder"
                            allow_verify={props.user !== undefined && props.building.builder !== null && !props.edited}
                            onVerify={props.onVerify}
                            user_verified={props.user_verified.hasOwnProperty("builder")}
                            user_verified_as={props.user_verified.builder}
                            verified_count={props.building.verified.builder}
                            />
                        <MultiDataEntry
                            title={dataFields.builder_links.title}
                            slug="builder_links"
                            value={props.building.builder_links}
                            mode={props.mode}
                            copy={props.copy}
                            onChange={props.onChange}
                            tooltip={dataFields.builder_links.tooltip}
                            placeholder="https://..."
                            editableEntries={true}
                            isUrl={true}
                        />
                        <SelectDataEntry
                            title={dataFields.builder_source_type.title}
                            slug="builder_source_type"
                            value={props.building.builder_source_type}
                            mode={props.mode}
                            copy={props.copy}
                            onChange={props.onChange}
                            tooltip={dataFields.builder_source_type.tooltip}
                            options={dataFields.builder_source_type.items}
                            placeholder={dataFields.builder_source_type.example}
                            />
                        {(props.building.builder_source_type == commonSourceTypes[0] ||
                            props.building.builder_source_type == commonSourceTypes[1] ||
                            props.building.builder_source_type == null) ? <></> :
                            <>
                                <MultiDataEntry
                                    title={dataFields.builder_source_link.title}
                                    slug="builder_source_link"
                                    value={props.building.builder_source_link}
                                    tooltip={dataFields.builder_source_link.tooltip}
                                    mode={props.mode}
                                    copy={props.copy}
                                    onChange={props.onChange}
                                    placeholder="https://..."
                                    editableEntries={true}
                                    isUrl={true}
                                />
                            </>
                        }
                    </DataEntryGroup>
                </DataEntryGroup>
                <DataEntryGroup name="Most significant extension" collapsed={subcat==null || subcat!="7"}>
                    <NumericDataEntry
                        slug='extension_year'
                        title={dataFields.extension_year.title}
                        value={props.building.extension_year}
                        mode={props.mode}
                        copy={props.copy}
                        onChange={props.onChange}
                        step={1}
                        min={1}
                        max={currentYear}
                        tooltip={dataFields.extension_year.tooltip_extension}
                        disabled={true}
                    />
                    <div className={`alert alert-dark`} role="alert" style={{ fontSize: 14, backgroundColor: "#f6f8f9" }}>
                        <i className="source-url">To edit the extension date, and to see the data mapped, please go to&nbsp;
                        <a href={"/"+props.mode+"/age/"+props.building.building_id+"?sc=3"}>Age & History</a>.</i>
                    </div>
                    <DataEntryGroup name="Client" collapsed={subcat==null || subcat!="8"}>
                        <MultiDataEntry
                            slug='extension_client'
                            title={dataFields.extension_client.title}
                            value={props.building.extension_client}
                            tooltip={dataFields.extension_client.tooltip}
                            onChange={props.onChange}
                            mode={props.mode}
                            copy={props.copy}
                        />
                        <Verification
                            slug="extension_client"
                            allow_verify={props.user !== undefined && props.building.extension_client !== null && !props.edited}
                            onVerify={props.onVerify}
                            user_verified={props.user_verified.hasOwnProperty("extension_client")}
                            user_verified_as={props.user_verified.extension_client}
                            verified_count={props.building.verified.extension_client}
                        />
                        <SelectDataEntry
                            title={dataFields.extension_client_source_type.title}
                            slug="extension_client_source_type"
                            value={props.building.extension_client_source_type}
                            mode={props.mode}
                            copy={props.copy}
                            onChange={props.onChange}
                            tooltip={dataFields.extension_client_source_type.tooltip}
                            options={dataFields.extension_client_source_type.items}
                            placeholder={dataFields.extension_client_source_type.example}
                            />
                        {(props.building.extension_client_source_type == commonSourceTypes[0] ||
                            props.building.extension_client_source_type == commonSourceTypes[1] ||
                            props.building.extension_client_source_type == null) ? <></> :
                            <>
                                <MultiDataEntry
                                    title={dataFields.extension_client_source_link.title}
                                    slug="extension_client_source_link"
                                    value={props.building.extension_client_source_link}
                                    mode={props.mode}
                                    copy={props.copy}
                                    onChange={props.onChange}
                                    tooltip={dataFields.extension_client_source_link.tooltip}
                                    placeholder="https://..."
                                    editableEntries={true}
                                    isUrl={true}
                                />
                            </>
                        }
                    </DataEntryGroup>
                    <DataEntryGroup name="Designer" collapsed={subcat==null || subcat!="9"}>
                        <SelectDataEntry
                            slug='extension_lead_designer_type'
                            title={dataFields.extension_lead_designer_type.title}
                            value={props.building.extension_lead_designer_type}
                            options={dataFields.extension_lead_designer_type.items}
                            tooltip={dataFields.extension_lead_designer_type.tooltip}
                            onChange={props.onChange}
                            mode={props.mode}
                            copy={props.copy}
                        />
                        <Verification
                            slug="extension_lead_designer_type"
                            allow_verify={props.user !== undefined && props.building.extension_lead_designer_type !== null && !props.edited}
                            onVerify={props.onVerify}
                            user_verified={props.user_verified.hasOwnProperty("extension_lead_designer_type")}
                            user_verified_as={props.user_verified.extension_lead_designer_type}
                            verified_count={props.building.verified.extension_lead_designer_type}
                        />
                        <MultiDataEntry
                            title={dataFields.extension_designers.title}
                            slug="extension_designers"
                            value={props.building.extension_designers}
                            mode={props.mode}
                            copy={props.copy}
                            onChange={props.onChange}
                            tooltip={dataFields.extension_designers.tooltip}
                            placeholder=""
                            editableEntries={true}
                            disabled={true}
                            />
                        <Verification
                            slug="extension_designers"
                            allow_verify={props.user !== undefined && props.building.extension_designers !== null && !props.edited}
                            onVerify={props.onVerify}
                            user_verified={props.user_verified.hasOwnProperty("extension_designers")}
                            user_verified_as={props.user_verified.extension_designers}
                            verified_count={props.building.verified.extension_designers}
                            />
                        <MultiDataEntry
                            title={dataFields.extension_designers_links.title}
                            slug="extension_designers_links"
                            value={props.building.extension_designers_links}
                            mode={props.mode}
                            copy={props.copy}
                            onChange={props.onChange}
                            tooltip={dataFields.extension_designers_links.tooltip}
                            placeholder="https://..."
                            editableEntries={true}
                            isUrl={true}
                        />
                        <SelectDataEntry
                            title={dataFields.extension_designers_source_type.title}
                            slug="extension_designers_source_type"
                            value={props.building.extension_designers_source_type}
                            mode={props.mode}
                            copy={props.copy}
                            onChange={props.onChange}
                            tooltip={dataFields.extension_designers_source_type.tooltip}
                            options={dataFields.extension_designers_source_type.items}
                            placeholder={dataFields.extension_designers_source_type.example}
                            />
                        {(props.building.extension_designers_source_type == commonSourceTypes[0] ||
                            props.building.extension_designers_source_type == commonSourceTypes[1] ||
                            props.building.extension_designers_source_type == null) ? <></> :
                            <>
                                <MultiDataEntry
                                    title={dataFields.extension_designers_source_link.title}
                                    slug="extension_designers_source_link"
                                    value={props.building.extension_designers_source_link}
                                    mode={props.mode}
                                    copy={props.copy}
                                    onChange={props.onChange}
                                    tooltip={dataFields.extension_designers_source_link.tooltip}
                                    placeholder="https://..."
                                    editableEntries={true}
                                    isUrl={true}
                                />
                            </>
                        }
                    </DataEntryGroup>
                    <DataEntryGroup name="Developer" collapsed={subcat==null || subcat!="10"}>
                        <SelectDataEntry
                            slug='extension_developer_type'
                            title={dataFields.extension_developer_type.title}
                            tooltip={dataFields.extension_developer_type.tooltip}
                            value={props.building.extension_developer_type}
                            options={dataFields.extension_developer_type.items}
                            onChange={props.onChange}
                            mode={props.mode}
                            copy={props.copy}
                        />
                        <Verification
                            slug="extension_developer_type"
                            allow_verify={props.user !== undefined && props.building.extension_developer_type !== null && !props.edited}
                            onVerify={props.onVerify}
                            user_verified={props.user_verified.hasOwnProperty("extension_developer_type")}
                            user_verified_as={props.user_verified.extension_developer_type}
                            verified_count={props.building.verified.extension_developer_type}
                            />
                        <MultiDataEntry
                            title={dataFields.extension_developer_name.title}
                            slug="extension_developer_name"
                            value={props.building.extension_developer_name}
                            mode={props.mode}
                            copy={props.copy}
                            onChange={props.onChange}
                            tooltip={dataFields.extension_developer_name.tooltip}
                            placeholder=""
                            editableEntries={true}
                            disabled={true}
                            />
                        <Verification
                            slug="extension_developer_name"
                            allow_verify={props.user !== undefined && props.building.extension_developer_name !== null && !props.edited}
                            onVerify={props.onVerify}
                            user_verified={props.user_verified.hasOwnProperty("extension_developer_name")}
                            user_verified_as={props.user_verified.extension_developer_name}
                            verified_count={props.building.verified.extension_developer_name}
                            />
                        <MultiDataEntry
                            title={dataFields.extension_developer_links.title}
                            slug="extension_developer_links"
                            value={props.building.extension_developer_links}
                            mode={props.mode}
                            copy={props.copy}
                            onChange={props.onChange}
                            tooltip={dataFields.extension_developer_links.tooltip}
                            placeholder="https://..."
                            editableEntries={true}
                            isUrl={true}
                        />
                        <SelectDataEntry
                            title={dataFields.extension_developer_source_type.title}
                            slug="extension_developer_source_type"
                            value={props.building.extension_developer_source_type}
                            mode={props.mode}
                            copy={props.copy}
                            onChange={props.onChange}
                            tooltip={dataFields.extension_developer_source_type.tooltip}
                            options={dataFields.extension_developer_source_type.items}
                            placeholder={dataFields.extension_developer_source_type.example}
                            />
                        {(props.building.extension_developer_source_type == commonSourceTypes[0] ||
                            props.building.extension_developer_source_type == commonSourceTypes[1] ||
                            props.building.extension_developer_source_type == null) ? <></> :
                            <>
                                <MultiDataEntry
                                    title={dataFields.extension_developer_source_link.title}
                                    slug="extension_developer_source_link"
                                    value={props.building.extension_developer_source_link}
                                    mode={props.mode}
                                    copy={props.copy}
                                    onChange={props.onChange}
                                    tooltip={dataFields.extension_developer_source_link.tooltip}
                                    placeholder="https://..."
                                    editableEntries={true}
                                    isUrl={true}
                                />
                            </>
                        }
                    </DataEntryGroup>
                    <DataEntryGroup name="Builder" collapsed={subcat==null || subcat!="11"}>
                        <MultiDataEntry
                            title={dataFields.extension_builder.title}
                            slug="extension_builder"
                            value={props.building.extension_builder}
                            mode={props.mode}
                            copy={props.copy}
                            onChange={props.onChange}
                            tooltip={dataFields.extension_builder.tooltip}
                            placeholder=""
                            editableEntries={true}
                            disabled={true}
                            />
                        <Verification
                            slug="extension_builder"
                            allow_verify={props.user !== undefined && props.building.extension_builder !== null && !props.edited}
                            onVerify={props.onVerify}
                            user_verified={props.user_verified.hasOwnProperty("extension_builder")}
                            user_verified_as={props.user_verified.extension_builder}
                            verified_count={props.building.verified.extension_builder}
                            />
                        <MultiDataEntry
                            title={dataFields.extension_builder_links.title}
                            slug="extension_builder_links"
                            value={props.building.extension_builder_links}
                            mode={props.mode}
                            copy={props.copy}
                            onChange={props.onChange}
                            tooltip={dataFields.extension_builder_links.tooltip}
                            placeholder="https://..."
                            editableEntries={true}
                            isUrl={true}
                        />
                        <SelectDataEntry
                            title={dataFields.extension_builder_source_type.title}
                            slug="extension_builder_source_type"
                            value={props.building.extension_builder_source_type}
                            mode={props.mode}
                            copy={props.copy}
                            onChange={props.onChange}
                            tooltip={dataFields.extension_builder_source_type.tooltip}
                            options={dataFields.extension_builder_source_type.items}
                            placeholder={dataFields.extension_builder_source_type.example}
                            />
                        {(props.building.extension_builder_source_type == commonSourceTypes[0] ||
                            props.building.extension_builder_source_type == commonSourceTypes[1] ||
                            props.building.extension_builder_source_type == null) ? <></> :
                            <>
                                <MultiDataEntry
                                    title={dataFields.extension_builder_source_link.title}
                                    slug="extension_builder_source_link"
                                    value={props.building.extension_builder_source_link}
                                    tooltip={dataFields.extension_builder_source_link.tooltip}
                                    mode={props.mode}
                                    copy={props.copy}
                                    onChange={props.onChange}
                                    placeholder="https://..."
                                    editableEntries={true}
                                    isUrl={true}
                                />
                            </>
                        }
                    </DataEntryGroup>
                </DataEntryGroup>
                <DataEntryGroup name="Awards" collapsed={subcat==null || subcat!="12"}>
                    <LogicalDataEntryYesOnly
                            slug='designer_awards'
                            title={dataFields.designer_awards.title}
                            tooltip={dataFields.designer_awards.tooltip}
                            value={props.building.designer_awards}
                            copy={props.copy}
                            onChange={props.onChange}
                            mode={props.mode}
                        />
                        <Verification
                            slug="designer_awards"
                            allow_verify={props.user !== undefined && props.building.designer_awards !== null && !props.edited}
                            onVerify={props.onVerify}
                            user_verified={props.user_verified.hasOwnProperty("designer_awards")}
                            user_verified_as={props.user_verified.designer_awards}
                            verified_count={props.building.verified.designer_awards}
                            />
                        {props.building.designer_awards ? (
                        <>
                        <MultiDataEntry
                            title={dataFields.awards_source_link.title}
                            slug="awards_source_link"
                            value={props.building.awards_source_link}
                            mode={props.mode}
                            copy={props.copy}
                            onChange={props.onChange}
                            tooltip={dataFields.awards_source_link.tooltip}
                            placeholder="https://..."
                            editableEntries={true}
                            isUrl={true}
                            />
                        <Verification
                            slug="awards_source_link"
                            allow_verify={props.user !== undefined && props.building.awards_source_link !== null && !props.edited}
                            onVerify={props.onVerify}
                            user_verified={props.user_verified.hasOwnProperty("awards_source_link")}
                            user_verified_as={props.user_verified.awards_source_link}
                            verified_count={props.building.verified.awards_source_link}
                            />
                        </>
                        ) : (null)
                    }
                </DataEntryGroup>
            </DataEntryGroup>
        </Fragment>
    )
};
const ConstructionDesignContainer = withCopyEdit(ConstructionDesignView);

export default ConstructionDesignContainer;
