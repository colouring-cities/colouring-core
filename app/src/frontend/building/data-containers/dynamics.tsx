import React from 'react';

import { dataFields } from '../../config/data-fields-config';

import withCopyEdit from '../data-container';
import NumericDataEntry from '../data-components/numeric-data-entry';
import { DynamicsBuildingPane, DynamicsDataEntry } from '../data-components/dynamics-data-entry/dynamics-data-entry';
import { FieldRow } from '../data-components/field-row';

import { CategoryViewProps } from './category-view-props';
import { Category } from '../../config/categories-config';
import { Link } from 'react-router-dom';
/**
* Dynamics view/edit section
*/
const DynamicsView: React.FunctionComponent<CategoryViewProps> = (props) => {
    const building = props.building;
    const thisYear = (new Date()).getFullYear();
    const currentBuildingConstructionYear = building.date_year || undefined;

    return (<>
        <DynamicsBuildingPane>
        <label><Link to={`/${props.mode}/${Category.Age}/${props.building.building_id}`}>Current building</Link></label>
        <FieldRow>
            <NumericDataEntry
                slug=''
                title={dataFields.past_buildings.items.year_constructed.title}
                value={currentBuildingConstructionYear}
                disabled={true}
                mode='view'
            />
            <NumericDataEntry
                slug=''
                title={dataFields.past_buildings.items.year_demolished.title}
                value={undefined}
                placeholder='---'
                disabled={true}
                mode='view'
            />
            <NumericDataEntry
                slug=''
                title='Lifespan (to date)'
                value={thisYear - currentBuildingConstructionYear}
                disabled={true}
                mode='view'
            />
        </FieldRow>
        </DynamicsBuildingPane>
        <DynamicsDataEntry
            value={building.past_buildings}
            editableEntries={true}
            slug='past_buildings'
            title={dataFields.past_buildings.title}
            mode={props.mode}
            onChange={props.onChange}
            maxYear={currentBuildingConstructionYear}
            minYear={1066}
        />
        {/* // moved from planning
            <CheckboxDataEntry
                title={dataFields.planning_demolition_complete.title}
                slug="planning_demolition_complete"
                value={props.building.planning_demolition_complete}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
                disabled={true}
                />
            <DataEntry
                title={dataFields.planning_demolition_history.title}
                slug="planning_demolition_history"
                value={props.building.planning_demolition_history}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
                disabled={true}
                />
            */}
            
        {/* <p className="data-intro">{props.intro}</p>
        <ul className="data-list">
            <li>Under threat of demolition (partial/complete?</li>
            <li>Demolition permit no. issued </li>
            <li>Whole building demolitions for current year</li>
            <li>Whole building demolitions since 2000</li>
            <li>Pairs of construction and demolition dates for previous buildings built on any part of the site</li>
        </ul> */}
    </>)
};

const DynamicsContainer = withCopyEdit(DynamicsView);

export default DynamicsContainer;
