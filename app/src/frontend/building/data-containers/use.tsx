import React, { Fragment } from 'react';

import InfoBox from '../../components/info-box';
import { dataFields } from '../../data_fields';
import DataEntry from '../data-components/data-entry';
import MultiDataEntry from '../data-components/multi-data-entry/multi-data-entry';
import withCopyEdit from '../data-container';

import { CategoryViewProps } from './category-view-props';

/**
 * Use view/edit section
 */
const UseView: React.FunctionComponent<CategoryViewProps> = (props) => (
    <Fragment>
        <MultiDataEntry
            title={dataFields.current_landuse_group.title}
            slug="current_landuse_group"
            value={props.building.current_landuse_group}
            mode={props.mode}
            copy={props.copy}
            onChange={props.onChange}
            // tooltip={dataFields.current_landuse_class.tooltip}
            placeholder="New land use group..."
            autofill={true}
            showAllOptionsOnEmpty={true}
        />
        <DataEntry
            title={dataFields.current_landuse_order.title}
            slug="current_landuse_order"
            value={props.building.current_landuse_order}
            mode={props.mode}
            disabled={true}
            copy={props.copy}
            onChange={props.onChange}
        />
        {
            props.mode != 'view' &&
            <InfoBox msg="Land use order is automatically derived from the land use groups"></InfoBox>
        }
    </Fragment>
);
const UseContainer = withCopyEdit(UseView);

export default UseContainer;
