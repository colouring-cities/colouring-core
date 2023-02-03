import React from 'react';
import { Link } from 'react-router-dom';
import InfoBox from '../../components/info-box';

import { Category } from '../../config/categories-config';
import { dataFields } from '../../config/data-fields-config';

import DataEntry from '../data-components/data-entry';
import { DataEntryGroup } from '../data-components/data-entry-group';
import { DynamicsBuildingPane, DynamicsDataEntry } from './dynamics/dynamics-data-entry';
import { FieldRow } from '../data-components/field-row';
import NumericDataEntry from '../data-components/numeric-data-entry';
import withCopyEdit from '../data-container';

import { CategoryViewProps } from './category-view-props';
import { LogicalDataEntry } from '../data-components/logical-data-entry/logical-data-entry';

/**
* Dynamics view/edit section
*/
const ResilienceView: React.FunctionComponent<CategoryViewProps> = (props) => {
    

    return (<>
        <InfoBox>
            This section is under development.
        </InfoBox>
        <DataEntry
            title="Building age"
            slug=""
            value=""
            mode='view'
        />
        <DataEntry
            title="Typical typology lifespan"
            slug=""
            value=""
            mode='view'
        />
        <DataEntry
            title="Typology adaptability rating"
            slug=""
            value=""
            mode='view'
        />
        <DataEntry
            title="Physical adaptability rating - within plot"
            slug=""
            value=""
            mode='view'
        />
        <DataEntry
            title="Landuse adaptability rating"
            slug=""
            value=""
            mode='view'
        />
        <DataEntry
            title="Structural material lifespan rating"
            slug=""
            value=""
            mode='view'
        />
        <DataEntry
            title="Protection from demolition rating"
            slug=""
            value=""
            mode='view'
        />
        <DataEntry
            title="Flood risk rating"
            slug=""
            value=""
            mode='view'
        />
        <DataEntry
            title="Surface geology type"
            slug=""
            value=""
            mode='view'
        />
        <DataEntry
            title="Average community value rating for typology"
            slug=""
            value=""
            mode='view'
        />
        <DataEntry
            title="Other rating"
            slug=""
            value=""
            mode='view'
        />
        <DataEntry
            title="Total resilience rating"
            slug=""
            value=""
            mode='view'
        />
    </>)
};

const ResilienceContainer = withCopyEdit(ResilienceView);

export default ResilienceContainer;
