import React from 'react';

import withCopyEdit from '../data-container';
import DataEntry from '../data-components/data-entry';

/**
* Age view/edit section
*/
const AgeView = (props) => (
    <dl className="data-list">
        <DataEntry
            title="Year built (best estimate)"
            slug="date_year"
            value={props.building.date_year}
            copy={props.copy}
            // "type": "year_estimator"
            />
        <DataEntry
            title="Latest possible start year"
            slug="date_upper"
            value={props.building.date_upper}
            copy={props.copy}
            // "type": "number", "step": 1,
            tooltip="This should be the latest year in which building could have started."
            />
        <DataEntry
            title="Earliest possible start date"
            slug="date_lower"
            value={props.building.date_lower}
            copy={props.copy}
            // "type": "number", "step": 1,
            tooltip="This should be the earliest year in which building could have started."
            />
        <DataEntry
            title="Facade year"
            slug="facade_year"
            value={props.building.facade_year}
            copy={props.copy}
            // "type": "number", "step": 1,
            tooltip="Best estimate"
            />
        <DataEntry
            title="Source of information"
            slug="date_source"
            value={props.building.date_source}
            copy={props.copy}
            // "type": "text_list",
            tooltip="Source for the main start date"
            // "options": [
            //     "Survey of London",
            //     "Pevsner Guides",
            //     "Local history publication",
            //     "National Heritage List for England",
            //     "Historical map",
            //     "Archive research",
            //     "Expert knowledge of building",
            //     "Other book",
            //     "Other website",
            //     "Other"
            // ]
            />
        <DataEntry
            title="Source details"
            slug="date_source_detail"
            value={props.building.date_source_detail}
            copy={props.copy}
            // "type": "text_long",
            tooltip="References for date source (max 500 characters)"
            />
        <DataEntry
            title="Text and Image Links"
            slug="date_link"
            value={props.building.date_link}
            copy={props.copy}
            // "type": "text_multi",
            tooltip="URL for age and date reference"
            // "placeholder": "https://..."
            />
    </dl>
)
const AgeContainer = withCopyEdit(AgeView);

export default AgeContainer;
