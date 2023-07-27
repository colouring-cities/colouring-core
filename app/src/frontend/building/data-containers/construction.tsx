import React, { Fragment } from 'react';

import { commonSourceTypes, dataFields } from '../../config/data-fields-config';
import DataEntry from '../data-components/data-entry';
import SelectDataEntry from '../data-components/select-data-entry';
import withCopyEdit from '../data-container';
import Verification from '../data-components/verification';

import { CategoryViewProps } from './category-view-props';
import InfoBox from '../../components/info-box';
import { DataEntryGroup } from '../data-components/data-entry-group';
import { MultiDataEntry } from '../data-components/multi-data-entry/multi-data-entry';
import { LogicalDataEntry } from '../data-components/logical-data-entry/logical-data-entry';

const ConstructionMaterialsOptions = [
    'Wood',
    'Stone',
    'Brick',
    'Steel',
    'Reinforced Concrete',
    'Other Metal',
    'Other Natural Material',
    'Other Man-Made Material'
];

/**
* Construction view/edit section
*/
const ConstructionView: React.FunctionComponent<CategoryViewProps> = (props) => {
    return (
         <Fragment>
            <DataEntryGroup name="Structural system">
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
            <DataEntryGroup name="Materials">
                <SelectDataEntry
                    title={dataFields.construction_core_material.title}
                    slug="construction_core_material"
                    value={props.building.construction_core_material}
                    tooltip={dataFields.construction_core_material.tooltip}
                    options={ConstructionMaterialsOptions}
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
            <DataEntryGroup name="Decorative features">
                <LogicalDataEntry
                    slug='construction_decorative_features'
                    title={dataFields.construction_decorative_features.title}
                    value={props.building.construction_decorative_features}
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
        </Fragment>
    );
};

const ConstructionContainer = withCopyEdit(ConstructionView);

export default ConstructionContainer;
