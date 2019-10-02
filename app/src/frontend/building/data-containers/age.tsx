import React, { Fragment } from 'react';

import withCopyEdit from '../data-container';
import MultiDataEntry from '../data-components/multi-data-entry';
import NumericDataEntry from '../data-components/numeric-data-entry';
import SelectDataEntry from '../data-components/select-data-entry';
import TextboxDataEntry from '../data-components/textbox-data-entry';
import YearDataEntry from '../data-components/year-data-entry';

/**
* Age view/edit section
*/
const AgeView = (props) => (
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
            title="Facade year"
            slug="facade_year"
            value={props.building.facade_year}
            mode={props.mode}
            copy={props.copy}
            onChange={props.onChange}
            step={1}
            tooltip="Best estimate"
            />
        <SelectDataEntry
            title="Source of information"
            slug="date_source"
            value={props.building.date_source}
            mode={props.mode}
            copy={props.copy}
            onChange={props.onChange}
            tooltip="Source for the main start date"
            placeholder=""
            options={[
                "Survey of London",
                "Pevsner Guides",
                "Local history publication",
                "National Heritage List for England",
                "Historical map",
                "Archive research",
                "Expert knowledge of building",
                "Other book",
                "Other website",
                "Other"
            ]}
            />
        <TextboxDataEntry
            title="Source details"
            slug="date_source_detail"
            value={props.building.date_source_detail}
            mode={props.mode}
            copy={props.copy}
            onChange={props.onChange}
            tooltip="References for date source (max 500 characters)"
            />
        <MultiDataEntry
            title="Text and Image Links"
            slug="date_link"
            value={props.building.date_link}
            mode={props.mode}
            copy={props.copy}
            onChange={props.onUpdate}
            tooltip="URL for age and date reference"
            placeholder="https://..."
            />
    </Fragment>
)
const AgeContainer = withCopyEdit(AgeView);

export default AgeContainer;
