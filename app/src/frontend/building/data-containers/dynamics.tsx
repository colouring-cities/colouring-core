import React, { Fragment } from 'react';

import withCopyEdit from '../data-container';

import { CategoryViewProps } from './category-view-props';

/**
* Dynamics view/edit section
*/
const DynamicsView: React.FunctionComponent<CategoryViewProps> = (props) => (
    <Fragment>
        <p className="data-intro">{props.intro}</p>
        <ul className="data-list">
            <li>Under threat of demolition (partial/complete?</li>
            <li>Demolition permit no. issued </li>
            <li>Whole building demolitions for current year</li>
            <li>Whole building demolitions since 2000</li>
            <li>Pairs of construction and demolition dates for previous buildings built on any part of the site</li>
        </ul>
    </Fragment>
);
const DynamicsContainer = withCopyEdit(DynamicsView);

export default DynamicsContainer;
