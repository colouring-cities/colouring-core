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
import NumericDataEntry from '../data-components/numeric-data-entry';
import { useDisplayPreferences } from '../../displayPreferences-context';
import { DynamicsBuildingPane, DynamicsDataEntry } from './dynamics/dynamics-data-entry';
import { FieldRow } from '../data-components/field-row';

/**
* Age & History view/edit section
*/
const AgeHistoryView: React.FunctionComponent<CategoryViewProps> = (props) => {
    const currentYear = new Date().getFullYear();

    const building = props.building;
    const thisYear = (new Date()).getFullYear();
    const currentBuildingConstructionYear = building.date_year || undefined;

    const { historicData, historicDataSwitchOnClick, darkLightTheme } = useDisplayPreferences();
    const { historicMap, historicMapSwitchOnClick } = useDisplayPreferences();

    const switchToSurvivalMapStyle = (e) => {
        e.preventDefault();
        props.onMapColourScale('survival_status');
        historicMapSwitchOnClick(e);
        
        if (historicData === 'enabled') {
           historicDataSwitchOnClick(e);
        }
    }

    const switchToSurvivalDataStyle = (e) => {
        e.preventDefault();
        props.onMapColourScale('survival_status');
        historicDataSwitchOnClick(e);

        if (historicMap === 'enabled') {
            historicMapSwitchOnClick(e);
        }
    }

    const switchToAgeMapStyle = (e) => {
        e.preventDefault();

        if (historicData === 'enabled') {
            historicDataSwitchOnClick(e);
        }
        if (historicMap === 'enabled') {
            historicMapSwitchOnClick(e);
        }

        props.onMapColourScale('date_year');
    }

    const switchToStylePeriodMapStyle = (e) => {
        e.preventDefault();
        props.onMapColourScale('typology_style_period')
    }

    let construction_length = null;

    if (props.building.date_year != null && props.building.date_year_completed != null) {
        construction_length = props.building.date_year_completed - props.building.date_year;
        construction_length = Math.max(construction_length, 1);
    }

    const queryParameters = new URLSearchParams(window.location.search);
    const subcat = queryParameters.get("sc");

    return (
        <Fragment>
            <DataEntryGroup name="Architectural Style/Historical Period" collapsed={subcat==null || subcat!="2"}>
                {(props.mapColourScale != "typology_style_period") ? 
                    <button className={`map-switcher-inline enabled-state btn btn-outline btn-outline-dark key-button`} onClick={switchToStylePeriodMapStyle}>
                        Click to show architectural style.
                    </button>
                :
                    <></>
                }
                <SelectDataEntry
                    title={dataFields.typology_style_period.title}
                    slug="typology_style_period"
                    value={props.building.typology_style_period}
                    tooltip={dataFields.typology_style_period.tooltip}
                    options={dataFields.typology_style_period.items}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                />
                <Verification
                    slug="typology_style_period"
                    allow_verify={props.user !== undefined && props.building.typology_style_period !== null && !props.edited}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("typology_style_period")}
                    user_verified_as={props.user_verified.typology_style_period}
                    verified_count={props.building.verified.typology_style_period}
                />
                <SelectDataEntry
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
                }
            </DataEntryGroup>
            <DataEntryGroup name="Building Age/Construction Date" collapsed={subcat==null || subcat!="1"}>
                {(props.mapColourScale != "date_year") ? 
                        <button className={`map-switcher-inline enabled-state btn btn-outline btn-outline-dark key-button`} onClick={switchToAgeMapStyle}>
                            Click to show building age.
                        </button>
                :
                    <></>
                }
                <NumericDataEntry
                    title={dataFields.date_year.title}
                    slug="date_year"
                    value={props.building.date_year}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    step={1}
                    min={1}
                    max={props.building.date_year_completed}
                    tooltip={dataFields.date_year.tooltip}
                    />
                <Verification
                    slug="date_year"
                    allow_verify={props.user !== undefined && props.building.date_year !== null && !props.edited}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("date_year")}
                    user_verified_as={props.user_verified.date_year}
                    verified_count={props.building.verified.date_year}
                    />
                <NumericDataEntry
                    title={dataFields.date_year_completed.title}
                    slug="date_year_completed"
                    value={props.building.date_year_completed}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    step={1}
                    min={props.building.date_year}
                    max={currentYear}
                    tooltip={dataFields.date_year_completed.tooltip}
                    />
                <Verification
                    slug="date_year_completed"
                    allow_verify={props.user !== undefined && props.building.date_year_completed !== null && !props.edited}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("date_year_completed")}
                    user_verified_as={props.user_verified.date_year_completed}
                    verified_count={props.building.verified.date_year_completed}
                    />
                <NumericDataEntry
                    title="Estimated duration of construction (years)"
                    slug="size_total_floors"
                    value={construction_length}
                    mode={props.mode}
                    copy={props.copy}
                    tooltip="Length of building construction (calculated from above values)."
                    onChange={props.onChange}
                    step={1}
                    min={0}
                    disabled={true}
                    />
                <hr/>
                <NumericDataEntry
                    title={dataFields.facade_year.title}
                    slug="facade_year"
                    value={props.building.facade_year}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    step={1}
                    min={1}
                    max={currentYear}
                    tooltip={dataFields.facade_year.tooltip}
                    />
                <Verification
                    slug="facade_year"
                    allow_verify={props.user !== undefined && props.building.facade_year !== null && !props.edited}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("facade_year")}
                    user_verified_as={props.user_verified.facade_year}
                    verified_count={props.building.verified.facade_year}
                    />
                <hr/>
                <SelectDataEntry
                    title={dataFields.date_source_type.title}
                    slug="date_source_type"
                    value={props.building.date_source_type}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    tooltip={dataFields.date_source_type.tooltip}
                    options={dataFields.date_source_type.items}
                    placeholder={dataFields.date_source_type.example}
                    />
                <SelectDataEntry
                    title={dataFields.date_source.title}
                    slug="date_source"
                    value={props.building.date_source}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    tooltip={dataFields.date_source.tooltip}
                    options={dataFields.date_source.items}
                    placeholder={dataFields.date_source.example}
                    />
                {(props.building.date_source_type == dataFields.date_source_type.items[0] ||
                    props.building.date_source_type == dataFields.date_source_type.items[1] ||
                    props.building.date_source_type == null) 
                    && (props.building.date_source == dataFields.date_source.items[0] ||
                        props.building.date_source == dataFields.date_source.items[1] ||
                        props.building.date_source == null) 
                    ? <></> 
                    : <>
                        <MultiDataEntry
                            title={dataFields.date_source_links.title}
                            slug="date_source_links"
                            value={props.building.date_source_links}
                            mode={props.mode}
                            copy={props.copy}
                            onChange={props.onChange}
                            tooltip={dataFields.date_source_links.tooltip}
                            placeholder="https://..."
                            editableEntries={true}
                            isUrl={true}
                        />
                    </>
                }
            </DataEntryGroup>
            <DataEntryGroup name="Cladding, Extensions & Retrofits" collapsed={subcat==null || subcat!="3"}>
                <NumericDataEntry
                    slug='age_cladding_date'
                    title={dataFields.age_cladding_date.title}
                    value={props.building.age_cladding_date}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    step={1}
                    min={1}
                    max={currentYear}
                    tooltip={dataFields.extension_year.tooltip}
                    />
                <Verification
                    slug="age_cladding_date"
                    allow_verify={props.user !== undefined && props.building.age_cladding_date !== null && !props.edited}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("age_cladding_date")}
                    user_verified_as={props.user_verified.age_cladding_date}
                    verified_count={props.building.verified.age_cladding_date}
                    />
                <SelectDataEntry
                    title={dataFields.age_cladding_date_source_type.title}
                    slug="age_cladding_date_source_type"
                    value={props.building.age_cladding_date_source_type}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    tooltip={dataFields.age_cladding_date_source_type.tooltip}
                    options={dataFields.age_cladding_date_source_type.items}
                    placeholder={dataFields.age_cladding_date_source_type.example}
                    />
                {(props.building.age_cladding_date_source_type == dataFields.age_cladding_date_source_type.items[0] ||
                    props.building.age_cladding_date_source_type == dataFields.age_cladding_date_source_type.items[1] ||
                    props.building.age_cladding_date_source_type == null) ? <></> :
                    <>
                        <MultiDataEntry
                            title={dataFields.age_cladding_date_source_links.title}
                            slug="age_cladding_date_source_links"
                            value={props.building.age_cladding_date_source_links}
                            mode={props.mode}
                            copy={props.copy}
                            onChange={props.onChange}
                            tooltip={dataFields.age_cladding_date_source_links.tooltip}
                            placeholder="https://..."
                            editableEntries={true}
                            isUrl={true}
                        />
                    </>
                }
                <hr/>
                <NumericDataEntry
                    slug='age_extension_date'
                    title={dataFields.age_extension_date.title}
                    value={props.building.age_extension_date}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    step={1}
                    min={1}
                    max={currentYear}
                    tooltip={dataFields.extension_year.tooltip}
                    />
                <Verification
                    slug="age_extension_date"
                    allow_verify={props.user !== undefined && props.building.age_extension_date !== null && !props.edited}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("age_extension_date")}
                    user_verified_as={props.user_verified.age_extension_date}
                    verified_count={props.building.verified.age_extension_date}
                    />
                <SelectDataEntry
                    title={dataFields.age_extension_date_source_type.title}
                    slug="age_extension_date_source_type"
                    value={props.building.age_extension_date_source_type}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    tooltip={dataFields.age_extension_date_source_type.tooltip}
                    options={dataFields.age_extension_date_source_type.items}
                    placeholder={dataFields.age_extension_date_source_type.example}
                    />
                {(props.building.age_extension_date_source_type == dataFields.age_extension_date_source_type.items[0] ||
                    props.building.age_extension_date_source_type == dataFields.age_extension_date_source_type.items[1] ||
                    props.building.age_extension_date_source_type == null) ? <></> :
                    <>
                        <MultiDataEntry
                            title={dataFields.age_extension_date_source_links.title}
                            slug="age_extension_date_source_links"
                            value={props.building.age_extension_date_source_links}
                            mode={props.mode}
                            copy={props.copy}
                            onChange={props.onChange}
                            tooltip={dataFields.age_extension_date_source_links.tooltip}
                            placeholder="https://..."
                            editableEntries={true}
                            isUrl={true}
                        />
                    </>
                }
                <hr/>
                <NumericDataEntry
                    slug='age_retrofit_date'
                    title={dataFields.age_retrofit_date.title}
                    value={props.building.age_retrofit_date}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    step={1}
                    min={1}
                    max={currentYear}
                    tooltip={dataFields.extension_year.tooltip}
                    />
                <Verification
                    slug="age_retrofit_date"
                    allow_verify={props.user !== undefined && props.building.age_retrofit_date !== null && !props.edited}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("age_retrofit_date")}
                    user_verified_as={props.user_verified.age_retrofit_date}
                    verified_count={props.building.verified.age_retrofit_date}
                    />
                <SelectDataEntry
                    title={dataFields.age_retrofit_date_source_type.title}
                    slug="age_retrofit_date_source_type"
                    value={props.building.age_retrofit_date_source_type}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    tooltip={dataFields.age_retrofit_date_source_type.tooltip}
                    options={dataFields.age_retrofit_date_source_type.items}
                    placeholder={dataFields.age_retrofit_date_source_type.example}
                    />
                {(props.building.age_retrofit_date_source_type == dataFields.age_retrofit_date_source_type.items[0] ||
                    props.building.age_retrofit_date_source_type == dataFields.age_retrofit_date_source_type.items[1] ||
                    props.building.age_retrofit_date_source_type == null) ? <></> :
                    <>
                        <MultiDataEntry
                            title={dataFields.age_retrofit_date_source_links.title}
                            slug="age_retrofit_date_source_links"
                            value={props.building.age_retrofit_date_source_links}
                            mode={props.mode}
                            copy={props.copy}
                            onChange={props.onChange}
                            tooltip={dataFields.age_retrofit_date_source_links.tooltip}
                            placeholder="https://..."
                            editableEntries={true}
                            isUrl={true}
                        />
                    </>
                }
            </DataEntryGroup>
            <DataEntryGroup name="Lifespan & Site History" collapsed={subcat==null || subcat!="4"}>
                <DataEntryGroup name="Constructions & Demolitions on this Site" collapsed={subcat==null || subcat!="4"}>
                    <DynamicsBuildingPane>
                        <label>Current building (building age data editable above)</label>
                        <FieldRow>
                            <div>
                                <NumericDataEntry
                                    slug=''
                                    title={dataFields.demolished_buildings.items.year_constructed.title}
                                    value={currentBuildingConstructionYear}
                                    disabled={true}
                                    mode='view'
                                />
                            </div>
                            <div>
                                <NumericDataEntry
                                    slug=''
                                    title={dataFields.demolished_buildings.items.year_demolished.title}
                                    value={undefined}
                                    placeholder='---'
                                    disabled={true}
                                    mode='view'
                                />
                            </div>
                            <div style={{flex: '0 1 27%'}}>
                                <DataEntry
                                    slug=''
                                    title='Lifespan to date'
                                    value={ (thisYear - currentBuildingConstructionYear) + ''}
                                    disabled={true}
                                    mode='view'
                                />
                            </div>
                        </FieldRow>
                    </DynamicsBuildingPane>
                    {
                        currentBuildingConstructionYear == undefined ?
                            <InfoBox>To add historical records, fill in the building age data (above) first.</InfoBox> :
                            
                            <>
                                <LogicalDataEntry
                                    slug='dynamics_has_demolished_buildings'
                                    title={dataFields.dynamics_has_demolished_buildings.title}
                                    value={building.dynamics_has_demolished_buildings}
                                    disallowFalse={(building.demolished_buildings?.length ?? 0) > 0}
                                    disallowNull={(building.demolished_buildings?.length ?? 0) > 0}

                                    onChange={props.onSaveChange}
                                    mode={props.mode}
                                    copy={props.copy}
                                />
                                {
                                    building.dynamics_has_demolished_buildings &&
                                    <>
                                        <DynamicsDataEntry
                                            
                                            /* 
                                                Will clear the edits and new record data upon navigating to another building.
                                                Should get a better way to do this, plus a way to actually keep unsaved edits.
                                            */
                                            key={building.building_id} 
                                            
                                            value={building.demolished_buildings}
                                            editableEntries={true}
                                            slug='demolished_buildings'
                                            title={dataFields.demolished_buildings.title}
                                            mode={props.mode}
                                            onChange={props.onChange}
                                            onSaveAdd={props.onSaveAdd}
                                            hasEdits={props.edited}
                                            maxYear={currentBuildingConstructionYear}
                                            minYear={50}
                                        />
                                        {
                                            props.mode === 'view' &&
                                                <InfoBox>Switch to edit mode to add/edit past building records</InfoBox>
                                        }
                                    </>
                                }
                            </>
                    }
                </DataEntryGroup>
                <InfoBox type='warning'>
                    This section is under development in collaboration with the historic environment sector.
                    Please let us know your suggestions on the <a href="https://discuss.colouring.london/t/dynamics-category-discussion/107">discussion forum</a>! (external link - save your edits first)
                </InfoBox>
            </DataEntryGroup>
            <DataEntryGroup name="Survival Tracking" collapsed={subcat==null || subcat!="5"}>
                <div className={`alert alert-dark`} role="alert" style={{ fontSize: 13, backgroundColor: "#f6f8f9" }}>
                    <i>
                        Can you help us create a map that shows how many buildings in this area have survived since the 1890s? 
                        Choose a colour to indicate whether the building has survived.
                    </i>
                </div>
                {(historicMap === "enabled") ? 
                    <button className={`map-switcher-inline enabled-state btn btn-outline btn-outline-dark ${darkLightTheme}`} onClick={switchToAgeMapStyle}>
                        Click to hide the 1890s OS historical map.
                    </button>
                :
                    <button className={`map-switcher-inline disabled-state btn btn-outline btn-outline-dark ${darkLightTheme}`} onClick={switchToSurvivalMapStyle}>
                        Click to show the 1890s OS historical map.
                    </button>
                }
                {(historicData === "enabled") ? 
                    <button className={`map-switcher-inline enabled-state btn btn-outline btn-outline-dark ${darkLightTheme}`} onClick={switchToAgeMapStyle}>
                        Click to hide the 1890s OS historical map with modern footprints.
                    </button>
                :
                    <button className={`map-switcher-inline disabled-state btn btn-outline btn-outline-dark ${darkLightTheme}`} onClick={switchToSurvivalDataStyle}>
                        Click to show the 1890s OS historical map with modern footprints.
                    </button>
                }
                <SelectDataEntry
                    title={dataFields.survival_status.title}
                    slug="survival_status"
                    value={props.building.survival_status}
                    tooltip={dataFields.survival_status.tooltip}
                    options={dataFields.survival_status.items}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                />
                <SelectDataEntry
                    title={dataFields.survival_source.title}
                    slug="survival_source"
                    value={props.building.survival_source}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    tooltip={dataFields.survival_source.tooltip}
                    placeholder={dataFields.survival_source.example}
                    options={dataFields.survival_source.items}
                />
                {(props.building.survival_source == dataFields.survival_source.items[0] ||
                    props.building.survival_source == dataFields.survival_source.items[1] ||
                    props.building.survival_source == null) ? <></> :
                    <><MultiDataEntry
                        title={dataFields.survival_source_links.title}
                        slug="survival_source_links"
                        value={props.building.survival_source_links}
                        mode={props.mode}
                        copy={props.copy}
                        onChange={props.onChange}
                        tooltip={dataFields.survival_source_links.tooltip}
                        placeholder="https://..."
                        editableEntries={true}
                        isUrl={true}
                        />
                    </>
                }
            </DataEntryGroup>
            <DataEntryGroup name="Historical Map Data Options" collapsed={subcat==null || subcat!="6"}>
                <InfoBox type='warning'>
                    This section is under development
                </InfoBox>
                <div className={`alert alert-dark`} role="alert" style={{ fontSize: 13, backgroundColor: "#f6f8f9" }}>
                    <i>
                        This section provides links to open digitised historical maps/mapping data that we are using in the Colouring Cities platform.
                    </i>
                </div>
                <MultiDataEntry
                    title={dataFields.age_historical_raster_map_links.title}
                    slug="age_historical_raster_map_links"
                    value={props.building.age_historical_raster_map_links}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    tooltip={dataFields.age_historical_raster_map_links.tooltip}
                    placeholder="https://..."
                    editableEntries={true}
                    isUrl={true}
                />
                <MultiDataEntry
                    title={dataFields.age_historical_vectorised_footprint_links.title}
                    slug="age_historical_vectorised_footprint_links"
                    value={props.building.age_historical_vectorised_footprint_links}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    tooltip={dataFields.age_historical_vectorised_footprint_links.tooltip}
                    placeholder="https://..."
                    editableEntries={true}
                    isUrl={true}
                />
            </DataEntryGroup>
        </Fragment>
    );
};

const AgeHistoryContainer = withCopyEdit(AgeHistoryView);

export default AgeHistoryContainer;
