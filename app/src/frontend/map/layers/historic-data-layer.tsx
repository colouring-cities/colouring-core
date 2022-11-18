import * as React from 'react';
import { TileLayer } from 'react-leaflet';
import { HistoricDataEnablementState } from '../../config/map-config';

export function HistoricDataLayer({enablement}: {enablement: HistoricDataEnablementState}) {
    if(enablement == "enabled") {
        return <TileLayer
            url="https://maps.georeferencer.com/georeferences/53c1ccd0-c169-5f9e-a850-dd34c066c369/2019-10-01T08:40:08.006175Z/map/{z}/{x}/{y}.png?key=xkWAs4LtX8CmpSTUqF9M"
            attribution='&copy; ???????????????????????????????????????'
        />
	} else {
        return null;
    }
}

