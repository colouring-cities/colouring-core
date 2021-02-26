import React from 'react';
import { Link } from 'react-router-dom';

import { Category } from '../../config/categories-config';
import { dataFields } from '../../config/data-fields-config';

import DataEntry from '../data-components/data-entry';
import { DataEntryGroup } from '../data-components/data-entry-group';
import { DynamicsBuildingPane, DynamicsDataEntry } from '../data-components/dynamics-data-entry/dynamics-data-entry';
import { FieldRow } from '../data-components/field-row';
import NumericDataEntry from '../data-components/numeric-data-entry';
import withCopyEdit from '../data-container';

import { CategoryViewProps } from './category-view-props';

/**
* Dynamics view/edit section
*/
const DynamicsView: React.FunctionComponent<CategoryViewProps> = (props) => {
    const building = props.building;
    const thisYear = (new Date()).getFullYear();
    const currentBuildingConstructionYear = building.date_year || undefined;

    return (<>
        <DataEntryGroup collapsed={false} name="Historical constructions and demolitions" showCount={false}>
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
                title={undefined}
                mode={props.mode}
                onChange={props.onChange}
                maxYear={currentBuildingConstructionYear}
                minYear={1066}
            />
        </DataEntryGroup>
            
        <DataEntry
            title="Historical land use change"
            slug=""
            value=""
            mode='view'
        />
        <DataEntry
            title="Longitudinal historical footprints (raster) link"
            slug=""
            value=""
            mode='view'
        />
        <DataEntry
            title="Longitudinal historical footprints (vector) link"
            slug=""
            value=""
            mode='view'
        />
    </>)
};

const DynamicsContainer = withCopyEdit(DynamicsView);

export default DynamicsContainer;
