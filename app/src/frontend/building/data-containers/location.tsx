import React, { Fragment } from 'react';
import { commonSourceTypes, dataFields } from '../../config/data-fields-config';
import DataEntry from '../data-components/data-entry';
import NumericDataEntry from '../data-components/numeric-data-entry';
import UPRNsDataEntry from '../data-components/uprns-data-entry';
import Verification from '../data-components/verification';
import withCopyEdit from '../data-container';
import { PatternDataEntry } from '../data-components/pattern-data-entry';
import { CategoryViewProps } from './category-view-props';
import { DataEntryGroup } from '../data-components/data-entry-group';
import SelectDataEntry from '../data-components/select-data-entry';
import { MultiDataEntry } from '../data-components/multi-data-entry/multi-data-entry';
import { LogicalDataEntry } from '../data-components/logical-data-entry/logical-data-entry';

const locationNumberPattern = "[1-9]\\d*[a-z]?(-([1-9]\\d*))?"; ///[1-9]\d*[a-z]?(-([1-9]\d*))?/;
const postcodeCharacterPattern = "^[A-Z]{1,2}[0-9]{1,2}[A-Z]?(\\s*[0-9][A-Z]{1,2})?$";
const osmIdentifierPattern = "[0-9]{1,9}";

const LocationView: React.FunctionComponent<CategoryViewProps> = (props) => {
    const osm_url = "www.openstreetmap.org/way/"+props.building.ref_osm_id;
    
    const queryParameters = new URLSearchParams(window.location.search);
    const subcat = queryParameters.get("sc");

    return (
        <Fragment>
            <DataEntryGroup name="Property Address" collapsed={subcat==null || subcat!="1"}>
                {/* <DataEntry
                    title={dataFields.location_name.title}
                    slug="location_name"
                    value={props.building.location_name}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    tooltip={dataFields.location_name.tooltip}
                    placeholder=""
                    isUrl={false}
                    disabled={true}
                />
                <Verification
                    slug="location_name"
                    allow_verify={props.user !== undefined && props.building.location_name !== null && !props.edited}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("location_name")}
                    user_verified_as={props.user_verified.location_name}
                    verified_count={props.building.verified.location_name}
                /> */}
                <DataEntry
                    title={dataFields.location_name_link.title}
                    slug="location_name_link"
                    value={props.building.location_name_link}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    tooltip={dataFields.location_name_link.tooltip}
                    placeholder={props.mode=="edit"?dataFields.location_name_link.example:""}
                    isUrl={true}
                />
                {
                    (props.building.location_name_link == null) ? <></> :
                    <div className={`alert alert-dark`} role="alert" style={{ fontSize: 14, backgroundColor: "#f6f8f9" }}>
                        <i className="source-url">Source: <a href={props.building.location_name_link} target={"_blank"}>{props.building.location_name_link}</a></i>
                    </div>
                }
                {/* <DataEntry
                    title="Building name (residential)"
                    slug=""
                    value=""
                    mode='view'
                    tooltip="Not yet activated.<br><br>For security reasons, we do not allow the use of free text boxes and are currently looking into alternative ways to collect this data."
                /> */}
                <DataEntry
                    title={dataFields.location_residential_name_link.title}
                    slug="location_residential_name_link"
                    value={props.building.location_residential_name_link}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    tooltip={dataFields.location_residential_name_link.tooltip}
                    placeholder={props.mode=="edit"?dataFields.location_residential_name_link.example:""}
                    isUrl={true}
                />
                {
                    (props.building.location_residential_name_link == null) ? <></> :
                    <div className={`alert alert-dark`} role="alert" style={{ fontSize: 14, backgroundColor: "#f6f8f9" }}>
                        <i className="source-url">Source: <a href={props.building.location_residential_name_link} target={"_blank"}>{props.building.location_residential_name_link}</a></i>
                    </div>
                }
                <hr/>
                <PatternDataEntry
                    title={dataFields.location_number.title}
                    slug="location_number"
                    value={props.building.location_number}
                    pattern={locationNumberPattern}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    tooltip={dataFields.location_number.tooltip}
                    maxLength={5}
                    />
                <Verification
                    slug="location_number"
                    allow_verify={props.user !== undefined && props.building.location_number !== null && !props.edited}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("location_number")}
                    user_verified_as={props.user_verified.location_number}
                    verified_count={props.building.verified.location_number}
                    />
                <DataEntry
                    title={dataFields.location_street.title}
                    slug="location_street"
                    value={props.building.location_street}
                    tooltip={dataFields.location_street.tooltip}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    maxLength={30}
                    disabled={true}
                    />
                <Verification
                    slug="location_street"
                    allow_verify={props.user !== undefined && props.building.location_street !== null && !props.edited}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("location_street")}
                    user_verified_as={props.user_verified.location_street}
                    verified_count={props.building.verified.location_street}
                    />
                <DataEntry
                    title={dataFields.location_line_two.title}
                    slug="location_line_two"
                    value={props.building.location_line_two}
                    tooltip={dataFields.location_line_two.tooltip}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    maxLength={30}
                    disabled={true}
                    />
                <Verification
                    slug="location_line_two"
                    allow_verify={props.user !== undefined && props.building.location_line_two !== null && !props.edited}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("location_line_two")}
                    user_verified_as={props.user_verified.location_line_two}
                    verified_count={props.building.verified.location_line_two}
                    />
                <DataEntry
                    title={dataFields.location_town.title}
                    slug="location_town"
                    value={props.building.location_town}
                    tooltip={dataFields.location_town.tooltip}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    disabled={true}
                    />
                <Verification
                    slug="location_town"
                    allow_verify={props.user !== undefined && props.building.location_town !== null && !props.edited}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("location_town")}
                    user_verified_as={props.user_verified.location_town}
                    verified_count={props.building.verified.location_town}
                    />
                <PatternDataEntry
                    title={dataFields.location_postcode.title}
                    slug="location_postcode"
                    value={props.building.location_postcode}
                    pattern={postcodeCharacterPattern}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    maxLength={8}
                    valueTransform={x=>x.toUpperCase()}
                    tooltip={dataFields.location_postcode.tooltip}
                    />
                <Verification
                    slug="location_postcode"
                    allow_verify={props.user !== undefined && props.building.location_postcode !== null && !props.edited}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("location_postcode")}
                    user_verified_as={props.user_verified.location_postcode}
                    verified_count={props.building.verified.location_postcode}
                    />
                <SelectDataEntry
                    title={dataFields.location_address_source.title}
                    slug="location_address_source"
                    value={props.building.location_address_source}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    tooltip={dataFields.location_address_source.tooltip}
                    placeholder={dataFields.location_address_source.example}
                    options={dataFields.location_address_source.items}
                    />
                {(props.building.location_address_source == commonSourceTypes[0] ||
                    props.building.location_address_source == commonSourceTypes[1] ||
                    props.building.location_address_source == null) ? <></> :
                    <>
                        <MultiDataEntry
                            title={dataFields.location_address_links.title}
                            slug="location_address_links"
                            value={props.building.location_address_links}
                            mode={props.mode}
                            copy={props.copy}
                            onChange={props.onChange}
                            tooltip={dataFields.location_address_links.tooltip}
                            placeholder="https://..."
                            editableEntries={true}
                            isUrl={true}
                        />
                    </>
                }
            </DataEntryGroup>
            <DataEntryGroup name="Building Subdivision" collapsed={subcat==null || subcat!="2"}>
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
            </DataEntryGroup>
            <DataEntryGroup name="Open Property IDs/Footprint IDs" collapsed={subcat==null || subcat!="3"}>
            <DataEntry
                    title={dataFields.ref_toid.title}
                    slug="ref_toid"
                    value={props.building.ref_toid}
                    mode={props.mode}
                    tooltip={dataFields.ref_toid.tooltip}
                    onChange={props.onChange}
                    disabled={true}
                    />
                {
                    (props.building.ref_toid == null) ? <></> :
                    <div className={`alert alert-dark`} role="alert" style={{ fontSize: 14, backgroundColor: "#f6f8f9" }}>
                        <i className="source-url">Source: <a href="https://www.ordnancesurvey.co.uk/products/os-open-toid" target={"_blank"}>{"www.ordnancesurvey.co.uk/products/os-open-toid"}</a></i>
                    </div>
                }
                <hr/>
                <UPRNsDataEntry
                    title={dataFields.uprns.title}
                    slug="ref_uprns"
                    value={props.building.uprns}
                    tooltip={dataFields.uprns.tooltip}
                    />
                {
                    (props.building.uprns == null) ? <></> :
                    <div className={`alert alert-dark`} role="alert" style={{ fontSize: 14, backgroundColor: "#f6f8f9" }}>
                        <i className="source-url">Source: <a href="https://beta.ordnancesurvey.co.uk/products/os-open-uprn" target={"_blank"}>{"beta.ordnancesurvey.co.uk/products/os-open-uprn"}</a></i>
                    </div>
                }
                <hr/>
                <PatternDataEntry
                    title={dataFields.ref_osm_id.title}
                    slug="ref_osm_id"
                    value={props.building.ref_osm_id}
                    mode={props.mode}
                    tooltip={dataFields.ref_osm_id.tooltip}
                    maxLength={20}
                    onChange={props.onChange}
                    pattern={osmIdentifierPattern}
                    />
                <Verification
                    slug="ref_osm_id"
                    allow_verify={props.user !== undefined && props.building.ref_osm_id !== null && !props.edited}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("ref_osm_id")}
                    user_verified_as={props.user_verified.ref_osm_id}
                    verified_count={props.building.verified.ref_osm_id}
                    />
                {
                    (props.building.ref_osm_id == null) ? <></> :
                    <div className={`alert alert-dark`} role="alert" style={{ fontSize: 14, backgroundColor: "#f6f8f9" }}>
                        <i className="source-url">Source: <a href={"https://"+osm_url} target={"_blank"}>{osm_url}</a></i>
                    </div>
                }
                <hr/>
                <MultiDataEntry
                    title={dataFields.location_alternative_footprint_links.title}
                    slug="location_alternative_footprint_links"
                    value={props.building.location_alternative_footprint_links}
                    mode={props.mode}
                    onChange={props.onChange}
                    tooltip={dataFields.location_alternative_footprint_links.tooltip}
                    placeholder="https://..."
                    editableEntries={true}
                    isUrl={true}
                />
            </DataEntryGroup>
            <DataEntryGroup name="Base Building Footprints/Polygons Used for Data Collation, Verification & Visualisation" collapsed={subcat==null || subcat!="4"}>
                <NumericDataEntry
                    title={dataFields.location_latitude.title}
                    slug="location_latitude"
                    value={props.building.location_latitude}
                    tooltip={dataFields.location_latitude.tooltip}
                    mode={props.mode}
                    step={0.00001}
                    min={-90}
                    max={90}
                    placeholder="Latitude, e.g. 51.5467"
                    onChange={props.onChange}
                    />
                <Verification
                    slug="location_latitude"
                    allow_verify={props.user !== undefined && props.building.location_latitude !== null && !props.edited}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("location_latitude")}
                    user_verified_as={props.user_verified.location_latitude}
                    verified_count={props.building.verified.location_latitude}
                    />
                <NumericDataEntry
                    title={dataFields.location_longitude.title}
                    slug="location_longitude"
                    value={props.building.location_longitude}
                    tooltip={dataFields.location_longitude.tooltip}
                    mode={props.mode}
                    step={0.00001}
                    min={-180}
                    max={180}
                    placeholder="Longitude, e.g. -0.0586"
                    onChange={props.onChange}
                    />
                <Verification
                    slug="location_longitude"
                    allow_verify={props.user !== undefined && props.building.location_longitude !== null && !props.edited}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("location_longitude")}
                    user_verified_as={props.user_verified.location_longitude}
                    verified_count={props.building.verified.location_longitude}
                    />
                <SelectDataEntry
                    title={dataFields.location_coordinates_source.title}
                    slug="location_coordinates_source"
                    value={props.building.location_coordinates_source}
                    mode={props.mode}
                    onChange={props.onChange}
                    tooltip={dataFields.location_coordinates_source.tooltip}
                    placeholder={dataFields.location_coordinates_source.example}
                    options={dataFields.location_coordinates_source.items}
                    />
                {(props.building.location_coordinates_source == commonSourceTypes[0] ||
                    props.building.location_coordinates_source == commonSourceTypes[1] ||
                    props.building.location_coordinates_source == null) ? <></> :
                    <>
                        <MultiDataEntry
                            title={dataFields.location_coordinates_links.title}
                            slug="location_coordinates_links"
                            value={props.building.location_coordinates_links}
                            mode={props.mode}
                            onChange={props.onChange}
                            tooltip={dataFields.location_coordinates_links.tooltip}
                            placeholder="https://..."
                            editableEntries={true}
                            isUrl={true}
                        />
                    </>
                }
            </DataEntryGroup>
            <DataEntryGroup name="Building Footprint Section" collapsed={subcat==null || subcat!="4"}>
                <MultiDataEntry
                    title={dataFields.building_footprint_issues.title}
                    slug="building_footprint_issues"
                    value={props.building.building_footprint_issues}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    confirmOnEnter={true}
                    tooltip={dataFields.building_footprint_issues.tooltip}
                    placeholder="Select what is wrong with building footprint"
                    copyable={true}
                    autofill={true}
                    showAllOptionsOnEmpty={true}
                />
                <Verification
                    slug="building_footprint_issues"
                    allow_verify={props.user !== undefined && props.building.building_footprint_issues !== null && !props.edited}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("building_footprint_issues")}
                    user_verified_as={props.user_verified.building_footprint_issues}
                    verified_count={props.building.verified.building_footprint_issues}
                />
            </DataEntryGroup>
        </Fragment>
    );
}
const LocationContainer = withCopyEdit(LocationView);

export default LocationContainer;
