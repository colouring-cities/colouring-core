import React, { Fragment } from 'react';

import { commonSourceTypes, dataFields } from '../../config/data-fields-config';
import DataEntry from '../data-components/data-entry';
import NumericDataEntry from '../data-components/numeric-data-entry';
import SelectDataEntry from '../data-components/select-data-entry';
import Verification from '../data-components/verification';
import withCopyEdit from '../data-container';
import InfoBox from '../../components/info-box';

import { CategoryViewProps } from './category-view-props';
import { DataEntryGroup } from '../data-components/data-entry-group';
import { MultiDataEntry } from '../data-components/multi-data-entry/multi-data-entry';
import { LogicalDataEntry } from '../data-components/logical-data-entry/logical-data-entry';
import { useDisplayPreferences } from '../../displayPreferences-context';


/**
* Sustainability view/edit section
*/
const SustainabilityView: React.FunctionComponent<CategoryViewProps> = (props) => {
    
    const queryParameters = new URLSearchParams(window.location.search);
    const subcat = queryParameters.get("sc");

    const { flood, floodSwitchOnClick, darkLightTheme } = useDisplayPreferences();

    return (
        <Fragment>
            <DataEntryGroup name="Green walls/roof" collapsed={subcat==null || subcat!="5"}>
            <LogicalDataEntry
                    title={dataFields.energy_green_roof.title}
                    slug="energy_green_roof"
                    value={props.building.energy_green_roof}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    tooltip={dataFields.energy_green_roof.tooltip}
                />
                <Verification
                    slug="energy_green_roof"
                    allow_verify={props.user !== undefined && props.building.energy_green_roof !== null && !props.edited}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("energy_green_roof")}
                    user_verified_as={props.user_verified.energy_green_roof}
                    verified_count={props.building.verified.energy_green_roof}
                    />
                {props.building.energy_green_roof == null ? <></> :
                    <>
                        <SelectDataEntry
                            title={dataFields.energy_green_roof_source_type.title}
                            slug="energy_green_roof_source_type"
                            value={props.building.energy_green_roof_source_type}
                            mode={props.mode}
                            copy={props.copy}
                            onChange={props.onChange}
                            tooltip={dataFields.energy_green_roof_source_type.tooltip}
                            options={dataFields.energy_green_roof_source_type.items}
                            placeholder={dataFields.energy_green_roof_source_type.example}
                        />
                        {(props.building.energy_green_roof_source_type == dataFields.energy_green_roof_source_type.items[0] ||
                            props.building.energy_green_roof_source_type == dataFields.energy_green_roof_source_type.items[1] ||
                            props.building.energy_green_roof_source_type == null) ? <></> :
                            <>
                                <MultiDataEntry
                                    title={dataFields.energy_green_roof_source_links.title}
                                    slug="energy_green_roof_source_links"
                                    value={props.building.energy_green_roof_source_links}
                                    mode={props.mode}
                                    copy={props.copy}
                                    onChange={props.onChange}
                                    tooltip={dataFields.energy_green_roof_source_links.tooltip}
                                    placeholder="https://..."
                                    editableEntries={true}
                                    isUrl={true}
                                />
                            </>
                        }
                    </>
                }
            </DataEntryGroup>
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
            <LogicalDataEntry
                slug='planning_flood_zone'
                title={dataFields.planning_flood_zone.title}
                tooltip={dataFields.planning_flood_zone.tooltip}
                value={props.building.planning_flood_zone}
                copy={props.copy}
                onChange={props.onChange}
                mode={props.mode}
                disabled={true}
            />
            <button className={`map-switcher-inline ${flood}-state btn btn-outline btn-outline-dark ${darkLightTheme}`} onClick={floodSwitchOnClick}>
                {(flood === 'enabled')? 'Click to hide Flood Zones' : 'Click to see Flood Zones mapped'}
            </button>
        </Fragment>
    );
    };
const SustainabilityContainer = withCopyEdit(SustainabilityView);

export default SustainabilityContainer;
