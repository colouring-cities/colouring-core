import React, { Fragment } from 'react';

import InfoBox from '../../components/info-box';
import { dataFields } from '../../data_fields';
import DataEntry from '../data-components/data-entry';
import MultiDataEntry from '../data-components/multi-data-entry';
import withCopyEdit from '../data-container';

import { CategoryViewProps } from './category-view-props';

/**
 * Use view/edit section
 */
const UseView: React.FunctionComponent<CategoryViewProps> = (props) => (
    <Fragment>
        <InfoBox msg="This category is currently read-only. We are working on enabling its editing soon." />
        <MultiDataEntry
            title={dataFields.current_landuse_class.title}
            slug="current_landuse_class"
            value={props.building.current_landuse_class}
            mode="view"
            copy={props.copy}
            onChange={props.onChange}
            // tooltip={dataFields.current_landuse_class.tooltip}
            placeholder="New land use class..."
        />
        <MultiDataEntry
            title={dataFields.current_landuse_group.title}
            slug="current_landuse_group"
            value={props.building.current_landuse_group}
            mode="view"
            copy={props.copy}
            onChange={props.onChange}
            // tooltip={dataFields.current_landuse_class.tooltip}
            placeholder="New land use group..."
        />
        <DataEntry
            title={dataFields.current_landuse_order.title}
            slug="current_landuse_order"
            value={props.building.current_landuse_order}
            mode="view"
            copy={props.copy}
            onChange={props.onChange}
        />
    </Fragment>
);
const UseContainer = withCopyEdit(UseView);

export default UseContainer;
