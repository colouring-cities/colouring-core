import React, { Fragment } from 'react';

import '../../map/map-button.css';
import { dataFields } from '../../config/data-fields-config';
import { MultiDataEntry } from '../data-components/multi-data-entry/multi-data-entry';
import { DataEntryGroup } from '../data-components/data-entry-group';
import { DynamicsBuildingPane, DynamicsDataEntry } from './dynamics/dynamics-data-entry';
import { FieldRow } from '../data-components/field-row';
import { Link } from 'react-router-dom';
import { Category } from '../../config/categories-config';
import NumericDataEntry from '../data-components/numeric-data-entry';
import SelectDataEntry from '../data-components/select-data-entry';
import Verification from '../data-components/verification';
import YearDataEntry from '../data-components/year-data-entry';
import withCopyEdit from '../data-container';
import DataEntry from '../data-components/data-entry';
import InfoBox from '../../components/info-box';

import { CategoryViewProps } from './category-view-props';
import { LogicalDataEntry } from '../data-components/logical-data-entry/logical-data-entry';
import { useDisplayPreferences } from '../../displayPreferences-context';

const SurvivalStatusOptions = [
    'Same as Historical Map (Unchanged)',
    'Similar to Historical Map (Some Changes)',
    'Historical Building(s) Demolished',
    'Current Building on Previous Green Space'
];

/**
* Age view/edit section
*/
const AgeView: React.FunctionComponent<CategoryViewProps> = (props) => {
    const currentYear = new Date().getFullYear();

    const building = props.building;
    const thisYear = (new Date()).getFullYear();
    const currentBuildingConstructionYear = building.date_year || undefined;

    const ageLinkUrl = `/${props.mode}/${Category.Age}/${props.building.building_id}`;

    const { historicData, historicDataSwitchOnClick, darkLightTheme } = useDisplayPreferences();

    const switchToSurvivalMapStyle = (e) => {
        e.preventDefault();

        if (props.mapColourScale == "survival_status") {
            props.onMapColourScale('date_year');
            historicDataSwitchOnClick(e);
        }
        else {
            props.onMapColourScale('survival_status');
            historicDataSwitchOnClick(e);
        }
    }

    if (props.building.date_source == "Expert knowledge of building" ||
        props.building.date_source == "Expert estimate from image" ||
        props.building.date_source == null
       ){
      return (
          <Fragment>
            <DataEntryGroup name="Building age">
                <YearDataEntry
                    year={props.building.date_year}
                    upper={props.building.date_upper}
                    lower={props.building.date_lower}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}

                    allow_verify={props.user !== undefined && props.building.date_year !== null && !props.edited}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("date_year")}
                    user_verified_as={props.user_verified.date_year}
                    verified_count={props.building.verified.date_year}
                    
                    allow_verify_upper={props.user !== undefined && props.building.date_upper !== null && !props.edited}
                    onVerify_upper={props.onVerify}
                    user_verified_upper={props.user_verified.hasOwnProperty("date_upper")}
                    user_verified_as_upper={props.user_verified.date_upper}
                    verified_count_upper={props.building.verified.date_upper}
                    
                    allow_verify_lower={props.user !== undefined && props.building.date_lower !== null && !props.edited}
                    onVerify_lower={props.onVerify}
                    user_verified_lower={props.user_verified.hasOwnProperty("date_lower")}
                    user_verified_as_lower={props.user_verified.date_lower}
                    verified_count_lower={props.building.verified.date_lower}
                    />
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

                <SelectDataEntry
                    title={dataFields.date_source.title}
                    slug="date_source"
                    value={props.building.date_source}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    tooltip={dataFields.date_source.tooltip}
                    placeholder={dataFields.date_source.example}
                    options={dataFields.date_source.items}
                    />
                {(props.building.date_source == dataFields.date_source.items[0] ||
                props.building.date_source == dataFields.date_source.items[1] ||
                props.building.date_source == null) ? <></> :
                <>
                    <MultiDataEntry
                        title={dataFields.date_link.title}
                        slug="date_link"
                        value={props.building.date_link}
                        mode={props.mode}
                        copy={props.copy}
                        onChange={props.onChange}
                        tooltip={dataFields.date_link.tooltip}
                        placeholder="https://..."
                        editableEntries={true}
                        isUrl={true}
                    />
                </>
                }
            </DataEntryGroup>
            <DataEntryGroup name="Cladding, extensions and retrofits">
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
            <DataEntryGroup name="Lifespan and site history">
                <button className={`map-switcher-inline ${props.mapColourScale == "survival_status" ? "enabled-state" : "disabled-state"} btn btn-outline btn-outline-dark ${darkLightTheme}`} onClick={switchToSurvivalMapStyle}>
                    {(props.mapColourScale == "is_domestic")? 'Click here to hide historical maps':'Click here to show historical maps'}
                </button>
                <DataEntryGroup name="Constructions and demolitions on this site" showCount={false}>
                    <DynamicsBuildingPane>
                        <label>Current building (age data <Link to={ageLinkUrl}>editable here</Link>)</label>
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
                            <InfoBox>To add historical records, fill in the <Link to={ageLinkUrl}>Age</Link> data first.</InfoBox> :
                            
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
            <DataEntryGroup name="Survival and loss tracked using historical maps" collapsed={true} >
                <div className={`alert alert-dark`} role="alert" style={{ fontSize: 13, backgroundColor: "#f6f8f9" }}>
                    <i>
                        Can you help us create a map that shows how many buildings in London have survived since the 1890s? 
                        Choose a colour to indicate whether the building has survived.
                    </i>
                </div>
                <button className={`map-switcher-inline ${props.mapColourScale == "survival_status" ? "enabled-state" : "disabled-state"} btn btn-outline btn-outline-dark ${darkLightTheme}`} onClick={switchToSurvivalMapStyle}>
                    {(props.mapColourScale == "is_domestic")? 'Click here to hide historical maps':'Click here to show historical maps'}
                </button>
                <SelectDataEntry
                    title={dataFields.survival_status.title}
                    slug="survival_status"
                    value={props.building.survival_status}
                    tooltip={dataFields.survival_status.tooltip}
                    options={SurvivalStatusOptions}
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
                {(props.building.survival_source == dataFields.survival_source_links[0] ||
                    props.building.survival_source == dataFields.survival_source_links[1] ||
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
          </Fragment>
        );
      };
    return (
        <Fragment>
            <DataEntryGroup name="Building age">
                <YearDataEntry
                    year={props.building.date_year}
                    upper={props.building.date_upper}
                    lower={props.building.date_lower}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}

                    allow_verify={props.user !== undefined && props.building.date_year !== null && !props.edited}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("date_year")}
                    user_verified_as={props.user_verified.date_year}
                    verified_count={props.building.verified.date_year}
                    
                    allow_verify_upper={props.user !== undefined && props.building.date_upper !== null && !props.edited}
                    onVerify_upper={props.onVerify}
                    user_verified_upper={props.user_verified.hasOwnProperty("date_upper")}
                    user_verified_as_upper={props.user_verified.date_upper}
                    verified_count_upper={props.building.verified.date_upper}
                    
                    allow_verify_lower={props.user !== undefined && props.building.date_lower !== null && !props.edited}
                    onVerify_lower={props.onVerify}
                    user_verified_lower={props.user_verified.hasOwnProperty("date_lower")}
                    user_verified_as_lower={props.user_verified.date_lower}
                    verified_count_lower={props.building.verified.date_lower}
                    />
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
                {(props.building.date_source == dataFields.date_source.items[0] ||
                    props.building.date_source == dataFields.date_source.items[1] ||
                    props.building.date_source == null) ? <></> :
                    <>
                        <MultiDataEntry
                            title={dataFields.date_link.title}
                            slug="date_link"
                            value={props.building.date_link}
                            mode={props.mode}
                            copy={props.copy}
                            onChange={props.onChange}
                            tooltip={dataFields.date_link.tooltip}
                            placeholder="https://..."
                            editableEntries={true}
                            isUrl={true}
                        />
                    </>
                }
            </DataEntryGroup>
            <DataEntryGroup name="Cladding, extensions and retrofits">
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
            <DataEntryGroup name="Lifespan and site history">
                <button className={`map-switcher-inline ${props.mapColourScale == "survival_status" ? "enabled-state" : "disabled-state"} btn btn-outline btn-outline-dark ${darkLightTheme}`} onClick={switchToSurvivalMapStyle}>
                    {(props.mapColourScale == "is_domestic")? 'Click here to hide historical maps':'Click here to show historical maps'}
                </button>
                <DataEntryGroup name="Constructions and demolitions on this site" showCount={false}>
                    <DynamicsBuildingPane>
                        <label>Current building (age data <Link to={ageLinkUrl}>editable here</Link>)</label>
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
                            <InfoBox>To add historical records, fill in the <Link to={ageLinkUrl}>Age</Link> data first.</InfoBox> :
                            
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
            <DataEntryGroup name="Survival and loss tracked using historical maps" collapsed={true} >
                <div className={`alert alert-dark`} role="alert" style={{ fontSize: 13, backgroundColor: "#f6f8f9" }}>
                    <i>
                        Can you help us create a map that shows how many buildings in London have survived since the 1890s? 
                        Choose a colour to indicate whether the building has survived.
                    </i>
                </div>
                <button className={`map-switcher-inline ${props.mapColourScale == "survival_status" ? "enabled-state" : "disabled-state"} btn btn-outline btn-outline-dark ${darkLightTheme}`} onClick={switchToSurvivalMapStyle}>
                    {(props.mapColourScale == "is_domestic")? 'Click here to hide historical maps':'Click here to show historical maps'}
                </button>
                <SelectDataEntry
                    title={dataFields.survival_status.title}
                    slug="survival_status"
                    value={props.building.survival_status}
                    tooltip={dataFields.survival_status.tooltip}
                    options={SurvivalStatusOptions}
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
        </Fragment>
    );
};
const AgeContainer = withCopyEdit(AgeView);

export default AgeContainer;
