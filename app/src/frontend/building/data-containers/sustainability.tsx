import React, { Fragment } from 'react';

import { dataFields } from '../../config/data-fields-config';
import DataEntry from '../data-components/data-entry';
import NumericDataEntry from '../data-components/numeric-data-entry';
import SelectDataEntry from '../data-components/select-data-entry';
import Verification from '../data-components/verification';
import withCopyEdit from '../data-container';
import InfoBox from '../../components/info-box';

import { CategoryViewProps } from './category-view-props';

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
const SustainabilityView: React.FunctionComponent<CategoryViewProps> = (props) => {
    return (
        <Fragment>
            <SelectDataEntry
                title={dataFields.sust_breeam_rating.title}
                slug="sust_breeam_rating"
                value={props.building.sust_breeam_rating}
                tooltip={dataFields.sust_breeam_rating.tooltip}
                options={BreeamRatingOptions}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
            />
            <Verification
                slug="sust_breeam_rating"
                allow_verify={props.user !== undefined && props.building.sust_breeam_rating !== null && !props.edited}
                onVerify={props.onVerify}
                user_verified={props.user_verified.hasOwnProperty("sust_breeam_rating")}
                user_verified_as={props.user_verified.sust_breeam_rating}
                verified_count={props.building.verified.sust_breeam_rating}
                />

            <SelectDataEntry
                title={dataFields.sust_dec.title}
                slug="sust_dec"
                value={props.building.sust_dec}
                tooltip={dataFields.sust_dec.tooltip}
                options={EnergyCategoryOptions}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
            />
            <Verification
                slug="sust_dec"
                allow_verify={props.user !== undefined && props.building.sust_dec !== null && !props.edited}
                onVerify={props.onVerify}
                user_verified={props.user_verified.hasOwnProperty("sust_dec")}
                user_verified_as={props.user_verified.sust_dec}
                verified_count={props.building.verified.sust_dec}
                />

            <SelectDataEntry
                title={dataFields.sust_aggregate_estimate_epc.title}
                slug="sust_aggregate_estimate_epc"
                value={props.building.sust_aggregate_estimate_epc}
                tooltip={dataFields.sust_aggregate_estimate_epc.tooltip}
                options={EnergyCategoryOptions}
                disabled={true}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
            />

            <NumericDataEntry
                title={dataFields.sust_retrofit_date.title}
                slug="sust_retrofit_date"
                value={props.building.sust_retrofit_date}
                tooltip={dataFields.sust_retrofit_date.tooltip}
                step={1}
                min={1086}
                max={new Date().getFullYear()}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
            />
            <Verification
                slug="sust_retrofit_date"
                allow_verify={props.user !== undefined && props.building.sust_retrofit_date !== null && !props.edited}
                onVerify={props.onVerify}
                user_verified={props.user_verified.hasOwnProperty("sust_retrofit_date")}
                user_verified_as={props.user_verified.sust_retrofit_date}
                verified_count={props.building.verified.sust_retrofit_date}
                />
            <DataEntry
                title="Date of Significant Retrofits"
                slug=""
                value=""
                mode='view'
            />
            <Verification
                slug="date_link"
                allow_verify={props.user !== undefined && props.building.date_link !== null && !props.edited}
                onVerify={props.onVerify}
                user_verified={props.user_verified.hasOwnProperty("date_link")}
                user_verified_as={props.user_verified.date_link}
                verified_count={props.building.verified.date_link}
                />
            <DataEntry
                title="Source"
                slug=""
                value=""
                mode='view'
            />
            <DataEntry
                title="Green Walls / Green Roof"
                slug=""
                value=""
                mode='view'
            />
        </Fragment>
    );
    };
const SustainabilityContainer = withCopyEdit(SustainabilityView);

export default SustainabilityContainer;
