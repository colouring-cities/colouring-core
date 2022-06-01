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
    const currentBuildingConstructionYear = building.date_year || undefined;
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
            slug='work_carried_out'
            title={dataFields.work_carried_out.title}
            value={currentBuildingConstructionYear}
        />
        </Fragment>
  );
};
const TeamContainer = withCopyEdit(TeamView);

export default TeamContainer;
