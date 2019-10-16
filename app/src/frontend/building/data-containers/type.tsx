import React, { Fragment } from 'react';

import withCopyEdit from '../data-container';
import SelectDataEntry from '../data-components/select-data-entry';
import NumericDataEntry from '../data-components/numeric-data-entry';
import DataEntry from '../data-components/data-entry';

const AttachmentFormOptions = [
    "Detached",
    "Semi-Detached",
    "End-Terrace",
    "Mid-Terrace"
];

/**
* Type view/edit section
*/
const TypeView = (props) => {
    return (
        <Fragment>
            <SelectDataEntry
                title="Building configuration (attachment)?"
                slug="building_attachment_form"
                value={props.building.building_attachment_form}
                tooltip="We have prepopulated these based on their current attachment. A building can either be detached, semi-detached or part of a terrace (middle or end)"
                options={AttachmentFormOptions}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
            />
            <NumericDataEntry
                title="When did use change?"
                slug="date_change_building_use"
                value={props.building.date_change_building_use}
                tooltip="This is the date the building stopped being used for for the function it was built for. I.e. if it was Victorian warehouse which is now an office this would be when it became an office or if it was something before that, maybe a garage then the date that happened"
                min={1086}
                max={new Date().getFullYear()}
                step={1}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onUpdate}
            />
            <DataEntry
                title="Original building use"
                tooltip="What was the building originally used for when it was built? I.e. If it was Victorian warehouse which is now an office this would be warehouse"
                disabled={true}
            />
        </Fragment>
    );
    }
const TypeContainer = withCopyEdit(TypeView);

export default TypeContainer;
