import React, { Fragment } from 'react';
import InfoBox from '../../components/info-box';
import { dataFields } from '../../config/data-fields-config';
import SelectDataEntry from '../data-components/select-data-entry';
import NumericDataEntry from '../data-components/numeric-data-entry';

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
              title={dataFields.work_carried_out.title}
              value={currentBuildingConstructionYear}
              mode={props.mode}
              copy={props.copy}
              onChange={props.onChange}
              step={1}
              min={1}
              max={currentYear}
              tooltip={dataFields.work_carried_out.tooltip}
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
          slug='work_carried_out'
          title={dataFields.work_carried_out.title}
          value={props.building.work_carried_out}
          mode={props.mode}
          copy={props.copy}
          onChange={props.onChange}
          step={1}
          min={1}
          max={currentYear}
          tooltip={dataFields.work_carried_out.tooltip_extension}
      />
      </Fragment>
);
};
const TeamContainer = withCopyEdit(TeamView);

export default TeamContainer;
