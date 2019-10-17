import React, { Fragment } from 'react';

import withCopyEdit from '../data-container';
import DataEntry from '../data-components/data-entry';
import SelectDataEntry from '../data-components/select-data-entry';
import NumericDataEntry from '../data-components/numeric-data-entry';

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
    return (
        <Fragment>
            <SelectDataEntry
                title="BREEAM Rating"
                slug="sust_breeam_rating"
                value={props.building.sust_breeam_rating}
                tooltip="(Building Research Establishment Environmental Assessment Method) May not be present for many buildings"
                options={BreeamRatingOptions}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onUpdate}
            />
            <SelectDataEntry
                title="DEC Rating"
                slug="sust_dec"
                value={props.building.sust_dec}
                tooltip="(Display Energy Certificate) Any public building should have (and display) a DEC. Showing how the energy use for that building compares to other buildings with same use"
                options={EnergyCategoryOptions}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onUpdate}
            />
            <SelectDataEntry
                title="EPC Rating"
                slug="sust_aggregate_estimate_epc"
                value={props.building.sust_aggregate_estimate_epc}
                tooltip="(Energy Performance Certifcate) Any premises sold or rented is required to have an EPC to show how energy efficient it is. Only buildings rate grade E or higher maybe rented"
                options={EnergyCategoryOptions}
                disabled={true}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onUpdate}
            />
            <NumericDataEntry
                title="Last significant retrofit"
                slug="sust_retrofit_date"
                value={props.building.sust_retrofit_date}
                tooltip="Date of last major building refurbishment"
                step={1}
                min={1086}
                max={new Date().getFullYear()}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onUpdate}
            />
            <NumericDataEntry
                title="Expected lifespan for typology"
                slug="sust_life_expectancy"
                value={props.building.sust_life_expectancy}
                step={1}
                min={1}
                disabled={true}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onUpdate}
            />
        </Fragment>
    );
    }
const SustainabilityContainer = withCopyEdit(SustainabilityView);

export default SustainabilityContainer;
