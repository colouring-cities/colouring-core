import React from 'react';

import withCopyEdit from '../data-container';
import DataEntry from '../data-components/data-entry';

const LocationView = (props) => (
    <dl className="data-list">

    </dl>
)
const LocationContainer = withCopyEdit(LocationView);

export default LocationContainer;
