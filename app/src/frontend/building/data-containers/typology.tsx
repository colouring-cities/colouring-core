import React, { Fragment } from 'react';

import { commonSourceTypes, dataFields } from '../../config/data-fields-config';
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

/**
* Type view/edit section
*/
const TypeView: React.FunctionComponent<CategoryViewProps> = (props) => {
    const { darkLightTheme } = useDisplayPreferences();

    const switchToClassificationMapStyle = (e) => {
        e.preventDefault();
        props.onMapColourScale('typology_classification')
    }
    const switchToStylePeriodMapStyle = (e) => {
        e.preventDefault();
        props.onMapColourScale('typology_style_period')
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

    return (
        <Fragment>
            <DataEntryGroup name="Basic typology classification">
                {(props.mapColourScale == "typology_classification") ? 
                    <button className={`map-switcher-inline enabled-state btn btn-outline btn-outline-dark ${darkLightTheme}`} onClick={switchToStylePeriodMapStyle}>
                        {'Click here to change map to show architectural style/historical period.'}
                    </button>
                :
                    <button className={`map-switcher-inline disabled-state btn btn-outline btn-outline-dark ${darkLightTheme}`} onClick={switchToClassificationMapStyle}>
                        {"Click to change map to show typology classification."}
                    </button>
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
            <DataEntryGroup name="Architectural style">
                {/*(props.mapColourScale == "typology_style_period") ? 
                    <button className={`map-switcher-inline enabled-state btn btn-outline btn-outline-dark ${darkLightTheme}`} onClick={switchToClassificationMapStyle}>
                        {'Click to change map to show typology classification.'}
                    </button>
                :
                    <button className={`map-switcher-inline disabled-state btn btn-outline btn-outline-dark ${darkLightTheme}`} onClick={switchToStylePeriodMapStyle}>
                        {"Click here to change map to show architectural style/historical period."}
                    </button>
                */}
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
                {/*
                <Verification
                    slug="typology_style_period"
                    allow_verify={props.user !== undefined && props.building.typology_style_period !== null && !props.edited}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("typology_style_period")}
                    user_verified_as={props.user_verified.typology_style_period}
                    verified_count={props.building.verified.typology_style_period}
                /> */}
                <div className={`alert alert-dark`} role="alert" style={{ fontSize: 14, backgroundColor: "#f6f8f9" }}>
                    <i className="source-url">To edit the architectural style box, and to see the data mapped, please go to <a href={"/"+props.mode+"/age/"+props.building.building_id}>Age & History</a>.</i>
                </div>
                {/* <SelectDataEntry
                    title={dataFields.typology_style_period_source_type.title}
                    slug="typology_style_period_source_type"
                    value={props.building.typology_style_period_source_type}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    tooltip={dataFields.typology_style_period_source_type.tooltip}
                    placeholder={dataFields.typology_style_period_source_type.example}
                    options={dataFields.typology_style_period_source_type.items}
                    />
                {(props.building.typology_style_period_source_type == commonSourceTypes[0] ||
                    props.building.typology_style_period_source_type == commonSourceTypes[1] ||
                    props.building.typology_style_period_source_type == null) ? <></> :
                    <>
                        <MultiDataEntry
                            title={dataFields.typology_style_period_source_links.title}
                            slug="typology_style_period_source_links"
                            value={props.building.typology_style_period_source_links}
                            mode={props.mode}
                            copy={props.copy}
                            onChange={props.onChange}
                            tooltip={dataFields.typology_style_period_source_links.tooltip}
                            placeholder="https://..."
                            editableEntries={true}
                            isUrl={true}
                        />
                    </>
                } */}
            </DataEntryGroup>
            <DataEntryGroup name="Dynamic tissue classification">
                {(props.mapColourScale == "typology_dynamic_classification") ? 
                    <button className={`map-switcher-inline enabled-state btn btn-outline btn-outline-dark ${darkLightTheme}`} onClick={switchToClassificationMapStyle}>
                        {'Click to change map to show typology classification.'}
                    </button>
                :
                    <button className={`map-switcher-inline disabled-state btn btn-outline btn-outline-dark ${darkLightTheme}`} onClick={switchToDynamicClassificationMapStyle}>
                        {"Click here to change map to show dynamic classification."}
                    </button>
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
            <DataEntryGroup name="Original Use">
                {(props.mapColourScale == "original_landuse") ? 
                    <button className={`map-switcher-inline enabled-state btn btn-outline btn-outline-dark ${darkLightTheme}`} onClick={switchToClassificationMapStyle}>
                        {'Click to change map to show typology classification.'}
                    </button>
                :
                    <button className={`map-switcher-inline disabled-state btn btn-outline btn-outline-dark ${darkLightTheme}`} onClick={switchToLandUseMapStyle}>
                        {"Click here to change map to original land use."}
                    </button>
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
            <DataEntryGroup name="Attachment/Adjacency">
                {(props.mapColourScale == "building_attachment_form") ? 
                    <button className={`map-switcher-inline enabled-state btn btn-outline btn-outline-dark ${darkLightTheme}`} onClick={switchToClassificationMapStyle}>
                        {'Click to change map to show typology classification.'}
                    </button>
                :
                    <button className={`map-switcher-inline disabled-state btn btn-outline btn-outline-dark ${darkLightTheme}`} onClick={switchToAttachmentMapStyle}>
                        {"Click here to change map to show attachment/adjacency."}
                    </button>
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
            {/*}
            <DataEntryGroup name="Other fields (in development)">
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
                <DataEntry
                    title="Local typology mutations"
                    slug=""
                    value=""
                    mode='view'
                />
                <DataEntry
                    title="3D procedural model classifications"
                    slug=""
                    value=""
                    mode='view'
                />
                <DataEntry
                    title="Dynamic tissue type classification"
                    slug=""
                    value=""
                    mode='view'
                />
        
                {/* <NumericDataEntry
                    title={dataFields.date_change_building_use.title}
                    slug="date_change_building_use"
                    value={props.building.date_change_building_use}
                    tooltip={dataFields.date_change_building_use.tooltip}
                    min={1086}
                    max={new Date().getFullYear()}
                    step={1}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                />//*}
            </DataEntryGroup>*/}
        </Fragment>
    );
    };
const TypeContainer = withCopyEdit(TypeView);

export default TypeContainer;
