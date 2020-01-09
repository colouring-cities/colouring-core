import React, { Fragment } from 'react';

import { dataFields } from '../../data_fields';
import MultiDataEntry from '../data-components/multi-data-entry/multi-data-entry';
import NumericDataEntry from '../data-components/numeric-data-entry';
import SelectDataEntry from '../data-components/select-data-entry';
import TextboxDataEntry from '../data-components/textbox-data-entry';
import YearDataEntry from '../data-components/year-data-entry';
import withCopyEdit from '../data-container';

import { CategoryViewProps } from './category-view-props';

/**
* Age view/edit section
*/
const AgeView: React.FunctionComponent<CategoryViewProps> = (props) => {
    const currentYear = new Date().getFullYear();
    
    return (
        <Fragment>
            <YearDataEntry
                year={props.building.date_year}
                upper={props.building.date_upper}
                lower={props.building.date_lower}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
                />
            <NumericDataEntry
                title={dataFields.facade_year.title}
                slug="facade_year"
                value={props.building.facade_year}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
                step={1}
                min={1}
                max={currentYear}
                tooltip={dataFields.facade_year.tooltip}
                />
            <SelectDataEntry
                title={dataFields.date_source.title}
                slug="date_source"
                value={props.building.date_source}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
                tooltip={dataFields.date_source.tooltip}
                placeholder=""
                options={[
                    "Expert knowledge of building",
                    "Expert estimate from image",
                    "Survey of London",
                    "Pevsner Guides",
                    "Victoria County History",
                    "Local history publication",
                    "Other publication",
                    "National Heritage List for England",
                    "Other database or gazetteer",
                    "Historical map",
                    "Other archive document",
                    "Film/Video",
                    "Other website",
                    "Other"
                ]}
                />
            <TextboxDataEntry
                title={dataFields.date_source_detail.title}
                slug="date_source_detail"
                value={props.building.date_source_detail}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
                tooltip={dataFields.date_source_detail.tooltip}
                />
            <MultiDataEntry
                title={dataFields.date_link.title}
                slug="date_link"
                value={props.building.date_link}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
                tooltip={dataFields.date_link.tooltip}
                placeholder="https://..."
                />
        </Fragment>
    );
};
const AgeContainer = withCopyEdit(AgeView);

export default AgeContainer;
