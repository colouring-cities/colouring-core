import React, { Fragment } from 'react';
import InfoBox from '../../components/info-box';
import { commonSourceTypes, dataFields } from '../../config/data-fields-config';
import SelectDataEntry from '../data-components/select-data-entry';
import NumericDataEntry from '../data-components/numeric-data-entry';
import Verification from '../data-components/verification';
import { MultiDataEntry } from '../data-components/multi-data-entry/multi-data-entry';
import { LogicalDataEntry, LogicalDataEntryYesOnly } from '../data-components/logical-data-entry/logical-data-entry';
import { DataEntryGroup } from '../data-components/data-entry-group';

import withCopyEdit from '../data-container';

import { CategoryViewProps } from './category-view-props';

/**
* Team view/edit section
*/
const TeamView: React.FunctionComponent<CategoryViewProps> = (props) => {
    const building = props.building;
    const currentYear = new Date().getFullYear();
    const currentBuildingConstructionYear = building.date_year || undefined;
      return (
       <form>
            <DataEntryGroup name="Data relating to original building or extension?">
                <NumericDataEntry
                    slug='date_year'
                    title={dataFields.date_year.title}
                    value={currentBuildingConstructionYear}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    step={1}
                    min={1}
                    max={currentYear}
                    tooltip={dataFields.extension_year.tooltip}
                    />
                <Verification
                    slug="date_year"
                    allow_verify={props.user !== undefined && props.building.date_year !== null && !props.edited}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("date_year")}
                    user_verified_as={props.user_verified.date_year}
                    verified_count={props.building.verified.date_year}
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
                <hr/>
                <LogicalDataEntry
                    title={dataFields.has_extension.title}
                    slug="has_extension"
                    value={props.building.has_extension}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    tooltip={dataFields.has_extension.tooltip}
                    />
                {props.building.has_extension ? (
                <>
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
                    />
                    <Verification
                        slug="extension_year"
                        allow_verify={props.user !== undefined && props.building.extension_year !== null && !props.edited}
                        onVerify={props.onVerify}
                        user_verified={props.user_verified.hasOwnProperty("extension_year")}
                        user_verified_as={props.user_verified.extension_year}
                        verified_count={props.building.verified.extension_year}
                        />
                    <SelectDataEntry
                        title={dataFields.extension_source_type.title}
                        slug="extension_source_type"
                        value={props.building.extension_source_type}
                        mode={props.mode}
                        copy={props.copy}
                        onChange={props.onChange}
                        tooltip={dataFields.extension_source_type.tooltip}
                        options={dataFields.extension_source_type.items}
                        placeholder={dataFields.extension_source_type.example}
                        />
                    {(props.building.extension_source_type == dataFields.extension_source_type.items[0] ||
                        props.building.extension_source_type == dataFields.extension_source_type.items[1] ||
                        props.building.extension_source_type == null) ? <></> :
                        <>
                            <MultiDataEntry
                                title={dataFields.extension_source_links.title}
                                slug="extension_source_links"
                                value={props.building.extension_source_links}
                                mode={props.mode}
                                copy={props.copy}
                                onChange={props.onChange}
                                tooltip={dataFields.extension_source_links.tooltip}
                                placeholder="https://..."
                                editableEntries={true}
                                isUrl={true}
                            />
                        </>
                    }
                </>
                ) : (null)}
            </DataEntryGroup>
            <DataEntryGroup name="Land ownership data">
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
                    />
                <Verification
                    slug="landowner"
                    allow_verify={props.user !== undefined && props.building.landowner !== null && !props.edited}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("landowner")}
                    user_verified_as={props.user_verified.landowner}
                    verified_count={props.building.verified.landowner}
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
            <DataEntryGroup name="Developer data">
                <SelectDataEntry
                    slug='developer_type'
                    title={dataFields.developer_type.title}
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
                    />
                <Verification
                    slug="developer_name"
                    allow_verify={props.user !== undefined && props.building.developer_name !== null && !props.edited}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("developer_name")}
                    user_verified_as={props.user_verified.developer_name}
                    verified_count={props.building.verified.developer_name}
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
            <DataEntryGroup name="Designer data">
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
                    />
                <Verification
                    slug="designers"
                    allow_verify={props.user !== undefined && props.building.designers !== null && !props.edited}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("designers")}
                    user_verified_as={props.user_verified.designers}
                    verified_count={props.building.verified.designers}
                    />

                <SelectDataEntry
                    slug='lead_designer_type'
                    title={dataFields.lead_designer_type.title}
                    value={props.building.lead_designer_type}
                    options={dataFields.lead_designer_type.items}
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
                <hr/>
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
        <DataEntryGroup name="Builder data">
            <MultiDataEntry
                title={dataFields.builder.title}
                slug="builder"
                value={props.building.builder}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
                placeholder=""
                editableEntries={true}
                />
            <Verification
                slug="builder"
                allow_verify={props.user !== undefined && props.building.builder !== null && !props.edited}
                onVerify={props.onVerify}
                user_verified={props.user_verified.hasOwnProperty("builder")}
                user_verified_as={props.user_verified.builder}
                verified_count={props.building.verified.builder}
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
     </form>
    );
};
const TeamContainer = withCopyEdit(TeamView);

export default TeamContainer;
