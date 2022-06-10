import React, { Fragment } from 'react';
import InfoBox from '../../components/info-box';
import { dataFields } from '../../config/data-fields-config';
import SelectDataEntry from '../data-components/select-data-entry';
import NumericDataEntry from '../data-components/numeric-data-entry';
import Verification from '../data-components/verification';
import { MultiDataEntry } from '../data-components/multi-data-entry/multi-data-entry';
import { LogicalDataEntry } from '../data-components/logical-data-entry/logical-data-entry';
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
          <InfoBox msg="Can you help us capture information on who built the current building?"></InfoBox>
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
          <LogicalDataEntry
              title={dataFields.has_extension.title}
              slug="has_extension"
              value={props.building.has_extension}
              mode={props.mode}
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
          </>
        ) : (null)}
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
          <SelectDataEntry
              slug='developer_name'
              title={dataFields.developer_name.title}
              value={props.building.developer_name}
              options={dataFields.developer_name.items}
              onChange={props.onChange}
              mode={props.mode}
              copy={props.copy}
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
              title={dataFields.developer_source_link.title}
              slug="developer_source_link"
              value={props.building.developer_source_link}
              mode={props.mode}
              copy={props.copy}
              onChange={props.onChange}
              tooltip={dataFields.developer_source_link.tooltip}
              placeholder="https://..."
              editableEntries={true}
              />
          <Verification
              slug="developer_source_link"
              allow_verify={props.user !== undefined && props.building.developer_source_link !== null && !props.edited}
              onVerify={props.onVerify}
              user_verified={props.user_verified.hasOwnProperty("developer_source_link")}
              user_verified_as={props.user_verified.developer_source_link}
              verified_count={props.building.verified.developer_source_link}
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
              title={dataFields.designers_source_link.title}
              slug="designers_source_link"
              value={props.building.designers_source_link}
              mode={props.mode}
              copy={props.copy}
              onChange={props.onChange}
              tooltip={dataFields.designers_source_link.tooltip}
              placeholder="https://..."
              editableEntries={true}
              />
          <Verification
              slug="designers_source_link"
              allow_verify={props.user !== undefined && props.building.designers_source_link !== null && !props.edited}
              onVerify={props.onVerify}
              user_verified={props.user_verified.hasOwnProperty("designers_source_link")}
              user_verified_as={props.user_verified.designers_source_link}
              verified_count={props.building.verified.designers_source_link}
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
          <LogicalDataEntry
              slug='designer_awards'
              title={dataFields.designer_awards.title}
              tooltip={dataFields.designer_awards.tooltip}
              value={props.building.designer_awards}

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
       <MultiDataEntry
           title={dataFields.builder_source_link.title}
           slug="builder_source_link"
           value={props.building.builder_source_link}
           mode={props.mode}
           copy={props.copy}
           onChange={props.onChange}
           placeholder="https://..."
           editableEntries={true}
           />
       <Verification
           slug="builder_source_link"
           allow_verify={props.user !== undefined && props.building.builder_source_link !== null && !props.edited}
           onVerify={props.onVerify}
           user_verified={props.user_verified.hasOwnProperty("builder_source_link")}
           user_verified_as={props.user_verified.builder_source_link}
           verified_count={props.building.verified.builder_source_link}
           />
       <MultiDataEntry
           title={dataFields.other_team.title}
           slug="other_team"
           value={props.building.other_team}
           mode={props.mode}
           copy={props.copy}
           onChange={props.onChange}
           placeholder=""
           editableEntries={true}
           />
       <Verification
           slug="other_team"
           allow_verify={props.user !== undefined && props.building.other_team !== null && !props.edited}
           onVerify={props.onVerify}
           user_verified={props.user_verified.hasOwnProperty("other_team")}
           user_verified_as={props.user_verified.other_team}
           verified_count={props.building.verified.other_team}
           />
       <MultiDataEntry
           title={dataFields.other_team_source_link.title}
           slug="other_team_source_link"
           value={props.building.other_team_source_link}
           mode={props.mode}
           copy={props.copy}
           onChange={props.onChange}
           placeholder="https://..."
           editableEntries={true}
           />
       <Verification
           slug="other_team_source_link"
           allow_verify={props.user !== undefined && props.building.other_team_source_link !== null && !props.edited}
           onVerify={props.onVerify}
           user_verified={props.user_verified.hasOwnProperty("other_team_source_link")}
           user_verified_as={props.user_verified.other_team_source_link}
           verified_count={props.building.verified.other_team_source_link}
           />
     </form>
    );
};
const TeamContainer = withCopyEdit(TeamView);

export default TeamContainer;
