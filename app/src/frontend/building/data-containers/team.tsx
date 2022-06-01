import React, { Fragment } from 'react';
import InfoBox from '../../components/info-box';
import { dataFields } from '../../config/data-fields-config';
import SelectDataEntry from '../data-components/select-data-entry';
import NumericDataEntry from '../data-components/numeric-data-entry';
import Verification from '../data-components/verification';

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
              title={dataFields.year_work_carried_out.title}
              value={currentBuildingConstructionYear}
              mode={props.mode}
              copy={props.copy}
              onChange={props.onChange}
              step={1}
              min={1}
              max={currentYear}
              tooltip={dataFields.year_work_carried_out.tooltip}
          />
          <Verification
              slug="date_year"
              allow_verify={props.user !== undefined && props.building.date_year !== null && !props.edited}
              onVerify={props.onVerify}
              user_verified={props.user_verified.hasOwnProperty("date_year")}
              user_verified_as={props.user_verified.date_year}
              verified_count={props.building.verified.date_year}
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
          slug='year_work_carried_out'
          title={dataFields.year_work_carried_out.title}
          value={props.building.year_work_carried_out}
          mode={props.mode}
          copy={props.copy}
          onChange={props.onChange}
          step={1}
          min={1}
          max={currentYear}
          tooltip={dataFields.year_work_carried_out.tooltip_extension}
      />
      <Verification
          slug="year_work_carried_out"
          allow_verify={props.user !== undefined && props.building.year_work_carried_out !== null && !props.edited}
          onVerify={props.onVerify}
          user_verified={props.user_verified.hasOwnProperty("year_work_carried_out")}
          user_verified_as={props.user_verified.year_work_carried_out}
          verified_count={props.building.verified.year_work_carried_out}
          />
      </Fragment>
);
};
const TeamContainer = withCopyEdit(TeamView);

export default TeamContainer;
