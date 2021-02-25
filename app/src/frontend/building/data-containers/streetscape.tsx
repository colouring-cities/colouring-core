import React, { Fragment } from 'react';
import InfoBox from '../../components/info-box';
import { dataFields } from '../../config/data-fields-config';
import DataEntry from '../data-components/data-entry';
import NumericDataEntry from '../data-components/numeric-data-entry';

import withCopyEdit from '../data-container';

import { CategoryViewProps } from './category-view-props';

/**
* Streetscape view/edit section
*/
const StreetscapeView: React.FunctionComponent<CategoryViewProps> = (props) => (
    <Fragment>
        <InfoBox msg="This is what we're planning to collect on the building's context" />
        <ul className="data-list">
            <li>Gardens</li>
            <li>Trees</li>
            <li>Green walls</li>
            <li>Green roof</li>
            <li>Proximity to parks and open greenspace</li>
            <li>Building shading</li>
        </ul>
        <NumericDataEntry
            title={dataFields.size_plot_area_total.title}
            slug="size_plot_area_total"
            value={props.building.size_plot_area_total}
            mode={props.mode}
            copy={props.copy}
            onChange={props.onChange}
            step={0.1}
            min={0}
            disabled={true}
            />
        <NumericDataEntry
            title={dataFields.size_far_ratio.title}
            slug="size_far_ratio"
            value={props.building.size_far_ratio}
            mode={props.mode}
            copy={props.copy}
            onChange={props.onChange}
            step={0.1}
            min={0}
            disabled={true}
            />
        <DataEntry
            title="Plot dimensions"
            slug=""
            value=""
            mode='view'
        />
        <DataEntry
            title="Plot geometry link"
            slug=""
            value=""
            mode='view'
        />
        <DataEntry
            title="Land ownership parcel link"
            slug=""
            value=""
            mode='view'
        />
        <DataEntry
            title="Land ownership type"
            slug=""
            value=""
            mode='view'
        />
        <DataEntry
            title="Street width"
            slug=""
            value=""
            mode='view'
        />
        <DataEntry
            title="Street network geometry link"
            slug=""
            value=""
            mode='view'
        />
    </Fragment>
);
const StreetscapeContainer = withCopyEdit(StreetscapeView);

export default StreetscapeContainer;
