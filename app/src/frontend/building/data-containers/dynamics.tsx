import React, { Fragment } from 'react';
import InfoBox from '../../components/info-box';
import DataEntry from '../data-components/data-entry';
import { DataEntryGroup } from '../data-components/data-entry-group';

import withCopyEdit from '../data-container';

import { CategoryViewProps } from './category-view-props';

/**
* Dynamics view/edit section
*/
const DynamicsView: React.FunctionComponent<CategoryViewProps> = (props) => (
    <Fragment>
        <InfoBox msg="This is what we're planning to collect in this section" />
        <DataEntryGroup collapsed={false} name="Historical constructions and demolitions" showCount={false}>
            <DataEntry
                title="Current building"
                slug=""
                value=""
                mode='view'
            />
            <DataEntry
                title="Past buildings"
                slug=""
                value=""
                mode='view'
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
    </Fragment>
);
const DynamicsContainer = withCopyEdit(DynamicsView);

export default DynamicsContainer;
