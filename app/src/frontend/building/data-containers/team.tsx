import React, { Fragment } from 'react';
import InfoBox from '../../components/info-box';
import { dataFields } from '../../config/data-fields-config';
import SelectDataEntry from '../data-components/select-data-entry';
import NumericDataEntry from '../data-components/numeric-data-entry';
import Verification from '../data-components/verification';
import { MultiDataEntry } from '../data-components/multi-data-entry/multi-data-entry';

import withCopyEdit from '../data-container';

import { CategoryViewProps } from './category-view-props';

/**
* Team view/edit section
*/
const TeamView: React.FunctionComponent<CategoryViewProps> = (props) => {
    const building = props.building;
    const currentYear = new Date().getFullYear();
    const currentBuildingConstructionYear = building.date_year || undefined;
    if (props.building.is_extension == "The main building"){
      return (
          <Fragment>
              <InfoBox msg="Can you help us capture information on who built the current building?"></InfoBox>
          <SelectDataEntry
              title={dataFields.is_extension.title}
              slug="is_extension"
              value={props.building.is_extension}
              mode={props.mode}
              copy={props.copy}
              onChange={props.onChange}
              tooltip={dataFields.is_extension.tooltip}
              placeholder={dataFields.is_extension.example}
              options={dataFields.is_extension.items}
              />
            
          <NumericDataEntry
              slug='date_year'
              title={dataFields.extension_year.title}
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
              slug='developer_type'
              title={dataFields.developer_type.title}
              value={props.building.developer_type}
              options={dataFields.developer_type.items}
              onChange={props.onChange}
              mode={props.mode}
              copy={props.copy}
          />
          <MultiDataEntry
              title={dataFields.designers.title}
              slug="designers"
              value={props.building.designers}
              mode={props.mode}
              copy={props.copy}
              onChange={props.onChange}
              tooltip={dataFields.designers.tooltip}
              editableEntries={true}
              maxLength={747}
              />
          </Fragment>
    );
  };
  return ( // This is what gets used when is_extension == "A major extension"
      <Fragment>
          <InfoBox msg="Can you help us capture information on who built the building extension?"></InfoBox>
      <SelectDataEntry
          title={dataFields.is_extension.title}
          slug="is_extension"
          value={props.building.is_extension}
          mode={props.mode}
          copy={props.copy}
          onChange={props.onChange}
          tooltip={dataFields.is_extension.tooltip}
          placeholder={dataFields.is_extension.example}
          options={dataFields.is_extension.items}
          />
        
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
          slug='developer_type'
          title={dataFields.developer_type.title}
          value={props.building.developer_type}
          options={dataFields.developer_type.items}
          onChange={props.onChange}
          mode={props.mode}
          copy={props.copy}
      />
      <MultiDataEntry
          title={dataFields.designers.title}
          slug="designers"
          value={props.building.designers}
          mode={props.mode}
          copy={props.copy}
          onChange={props.onChange}
          tooltip={dataFields.designers.tooltip}
          editableEntries={true}
          maxLength={747}
          />
      </Fragment>
);
};
const TeamContainer = withCopyEdit(TeamView);

export default TeamContainer;
