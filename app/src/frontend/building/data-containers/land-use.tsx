import React, { Fragment } from 'react';
import { commonSourceTypes, dataFields } from '../../config/data-fields-config';
import DataEntry from '../data-components/data-entry';
import { MultiDataEntry } from '../data-components/multi-data-entry/multi-data-entry';
import SelectDataEntry from '../data-components/select-data-entry';
import withCopyEdit from '../data-container';
import { CategoryViewProps } from './category-view-props';
import Verification from '../data-components/verification';
import { useDisplayPreferences } from '../../displayPreferences-context';
import { DataEntryGroup } from '../data-components/data-entry-group';
import InfoBox from '../../components/info-box';

/**
 * Use view/edit section
 */
const LandUseView: React.FunctionComponent<CategoryViewProps> = (props) => {
    const switchToIsDomesticMapStyle = (e) => {
        e.preventDefault();
        props.onMapColourScale('is_domestic')
    }
    const switchToLandUseMapStyle = (e) => {
        e.preventDefault();
        props.onMapColourScale('landuse')
    }

    const queryParameters = new URLSearchParams(window.location.search);
    const subcat = queryParameters.get("sc");

    return (
        <Fragment>
            <DataEntryGroup name="Specific Land Use/s" collapsed={subcat==null || subcat!="1"}>
                <div className={`alert alert-dark`} role="alert" style={{ fontSize: 13, backgroundColor: "#f6f8f9" }}>
                    <i>
                        The vast majority of properties are residential (93% in the UK), so we have set 'residential' as the default value. Can you help us identify non-residential and mixed use buildings (and verify residential buildings too)?
                    </i>
                </div>
                {(props.mapColourScale != "landuse") ? 
                    <button className={`map-switcher-inline disabled-state btn btn-outline btn-outline-dark key-button`} onClick={switchToLandUseMapStyle}>
                        {"Click to see specific land use."}
                    </button>
                    :
                    <></>
                }
                <MultiDataEntry
                    title={dataFields.current_landuse_group.title}
                    slug="current_landuse_group"
                    value={props.building.current_landuse_group}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    confirmOnEnter={true}
                    tooltip={dataFields.current_landuse_group.tooltip}
                    placeholder="Enter new land use group here"
                    copyable={true}
                    autofill={true}
                    showAllOptionsOnEmpty={true}
                />
                <Verification
                    slug="current_landuse_group"
                    allow_verify={props.user !== undefined && props.building.current_landuse_group !== null && !props.edited}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("current_landuse_group")}
                    user_verified_as={props.user_verified.current_landuse_group && props.user_verified.current_landuse_group.join(", ")}
                    verified_count={props.building.verified.current_landuse_group}
                    />
                <SelectDataEntry
                    title={dataFields.current_landuse_source.title}
                    slug="current_landuse_source"
                    value={props.building.current_landuse_source}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    tooltip={dataFields.current_landuse_source.tooltip}
                    placeholder={dataFields.current_landuse_source.example}
                    options={dataFields.current_landuse_source.items}
                    />
                {(props.building.current_landuse_source == commonSourceTypes[0] ||
                    props.building.current_landuse_source == commonSourceTypes[1] ||
                    props.building.current_landuse_source == null) ? <></> :
                    <><MultiDataEntry
                        title={dataFields.current_landuse_link.title}
                        slug="current_landuse_link"
                        value={props.building.current_landuse_link}
                        mode={props.mode}
                        copy={props.copy}
                        onChange={props.onChange}
                        tooltip={dataFields.current_landuse_link.tooltip}
                        placeholder="https://..."
                        editableEntries={true}
                        isUrl={true}
                        />
                    </>
                }
                <DataEntry
                    title={dataFields.current_landuse_order.title}
                    tooltip={dataFields.current_landuse_order.tooltip}
                    slug="current_landuse_order"
                    value={props.building.current_landuse_order}
                    mode={props.mode}
                    disabled={true}
                    copy={props.copy}
                    onChange={props.onChange}
                />
            </DataEntryGroup>
            <DataEntryGroup name="General Land Use" collapsed={subcat==null || subcat!="2"}>
                {/*deprecate this field somehow */}
                <Fragment>
                    <div className="data-title">
                        <div className="data-title-text">
                            <div className="data-title-text">
                                <label>
                                    <span>Is the building residential, non-residential or mixed? (automatically generated from Specific Land Use/s)</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </Fragment>
                <InfoBox type='success'>
                    <Fragment>
                        {["Mixed Use", "Residential"].includes(props.building.current_landuse_order) ? props.building.current_landuse_order : "Non-residential"}
                    </Fragment>
                </InfoBox>
                {(props.mapColourScale != "is_domestic") ? 
                    <button className={`map-switcher-inline disabled-state btn btn-outline btn-outline-dark key-button`} onClick={switchToIsDomesticMapStyle}>
                        {"Click to see residential, non-residential and mixed-use buildings."}
                    </button>
                    :
                    <></>
                }
                {/* switched to automatically filled based on specific landuse data*/
                /*
                <SelectDataEntry
                    title={dataFields.is_domestic.title}
                    slug="is_domestic"
                    value={props.building.is_domestic}
                    options={dataFields.is_domestic.items}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    tooltip={dataFields.is_domestic.tooltip}
                />
                <Verification
                    slug="is_domestic"
                    allow_verify={props.user !== undefined && props.building.is_domestic !== null && !props.edited}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("is_domestic")}
                    user_verified_as={props.user_verified.is_domestic}
                    verified_count={props.building.verified.is_domestic}
                />
                <SelectDataEntry
                    title={dataFields.is_domestic_source.title}
                    slug="is_domestic_source"
                    value={props.building.is_domestic_source}
                    options={dataFields.is_domestic_source.items}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    tooltip={dataFields.is_domestic_source.tooltip}
                />
                {(props.building.is_domestic_source == commonSourceTypes[0] ||
                    props.building.is_domestic_source == commonSourceTypes[1] ||
                    props.building.is_domestic_source == null) ? <></> :
                    <><MultiDataEntry
                        title={dataFields.is_domestic_links.title}
                        slug="is_domestic_links"
                        value={props.building.is_domestic_links}
                        mode={props.mode}
                        copy={props.copy}
                        onChange={props.onChange}
                        tooltip={dataFields.is_domestic_links.tooltip}
                        placeholder="https://..."
                        editableEntries={true}
                        isUrl={true}
                        />
                    </>
                }
                */}
            </DataEntryGroup>
        </Fragment>
    );
};
const LandUseContainer = withCopyEdit(LandUseView);

export default LandUseContainer;
