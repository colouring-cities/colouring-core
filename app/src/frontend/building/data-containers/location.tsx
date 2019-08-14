import React from 'react';

import { withCopyEdit } from '../building-view';

const LocationView = (props) => (
    <dl className="data-list">

    </dl>
)
const LocationContainer = withCopyEdit(LocationView);

export default LocationContainer;
