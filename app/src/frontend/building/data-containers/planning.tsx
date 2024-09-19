import React, { Fragment } from 'react';

import '../../map/map-button.css';
import { Link } from 'react-router-dom';
import InfoBox from '../../components/info-box';
import NumericDataEntryWithFormattedLink from '../data-components/numeric-data-entry-with-formatted-link';
import { buildingUserFields, commonSourceTypes, dataFields } from '../../config/data-fields-config';
import NumericDataEntry from '../data-components/numeric-data-entry';
import UserOpinionEntry from '../data-components/user-opinion-data-entry';

import DataEntry from '../data-components/data-entry';
import { LogicalDataEntry } from '../data-components/logical-data-entry/logical-data-entry';
import { DataEntryGroup } from '../data-components/data-entry-group';
import SelectDataEntry from '../data-components/select-data-entry';
import Verification from '../data-components/verification';
import withCopyEdit from '../data-container';
import PlanningDataOfficialDataEntry from '../data-components/planning-data-entry';
import { CategoryViewProps } from './category-view-props';
import { Category } from '../../config/categories-config';
import { useDisplayPreferences } from '../../displayPreferences-context';
import { MultiDataEntry } from '../data-components/multi-data-entry/multi-data-entry';


const PlanningView: React.FunctionComponent<CategoryViewProps> = (props) => {
    
    const queryParameters = new URLSearchParams(window.location.search);
    const subcat = queryParameters.get("sc");

    return (
        <Fragment>
            <DataEntryGroup name="Street/pavement" collapsed={subcat==null || subcat!="2"}>
                <DataEntry
                    title="Walkability Index"
                    slug="context_walkability_index"
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
const PlanningContainer = withCopyEdit(PlanningView);

export default PlanningContainer;
