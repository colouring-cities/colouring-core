import React, { Fragment } from 'react';

import withCopyEdit from '../data-container';
import DataEntry from '../data-components/data-entry';
import SelectDataEntry from '../data-components/select-data-entry';
import NumericDataEntry from '../data-components/numeric-data-entry';
import { dataFields } from '../../data_fields';

const EnergyCategoryOptions = ["A", "B", "C", "D", "E", "F", "G"];
const BreeamRatingOptions = [
    'Outstanding',
    'Excellent',
    'Very good',
    'Good',
    'Pass',
    'Unclassified'
];
/**
* Sustainability view/edit section
*/
const SustainabilityView = (props) => {
    const dataEntryProps = {
        mode: props.mode,
        copy: props.copy,
        onChange: props.onChange
    };
    return (
        <Fragment>
            <SelectDataEntry
                title={dataFields.sust_breeam_rating.title}
                slug="sust_breeam_rating"
                value={props.building.sust_breeam_rating}
                tooltip={dataFields.sust_breeam_rating.tooltip}
                options={BreeamRatingOptions}
                {...dataEntryProps}
            />
            <SelectDataEntry
                title={dataFields.sust_dec.title}
                slug="sust_dec"
                value={props.building.sust_dec}
                tooltip={dataFields.sust_dec.tooltip}
                options={EnergyCategoryOptions}
                {...dataEntryProps}
            />
            <SelectDataEntry
                title={dataFields.sust_aggregate_estimate_epc.title}
                slug="sust_aggregate_estimate_epc"
                value={props.building.sust_aggregate_estimate_epc}
                tooltip={dataFields.sust_aggregate_estimate_epc.tooltip}
                options={EnergyCategoryOptions}
                disabled={true}
                {...dataEntryProps}
            />
            <NumericDataEntry
                title={dataFields.sust_retrofit_date.title}
                slug="sust_retrofit_date"
                value={props.building.sust_retrofit_date}
                tooltip={dataFields.sust_retrofit_date.tooltip}
                step={1}
                min={1086}
                max={new Date().getFullYear()}
                {...dataEntryProps}
            />
            <NumericDataEntry
                title={dataFields.sust_life_expectancy.title}
                slug="sust_life_expectancy"
                value={props.building.sust_life_expectancy}
                step={1}
                min={1}
                disabled={true}
                {...dataEntryProps}
            />
        </Fragment>
    );
    }
const SustainabilityContainer = withCopyEdit(SustainabilityView);

export default SustainabilityContainer;
