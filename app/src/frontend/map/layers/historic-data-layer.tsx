import * as React from 'react';
import { TileLayer } from 'react-leaflet';
import { HistoricDataEnablementState } from '../../config/map-config';
import { BuildingBaseLayer } from './building-base-layer';

export function HistoricDataLayer({enablement}: {enablement: HistoricDataEnablementState}) {
    if(enablement == "enabled") {
        return <><TileLayer
            url="https://mapseries-tilesets.s3.amazonaws.com/london_1890s/{z}/{x}/{y}.png"
            attribution='&copy; CC BY 4.0 - Reproduced with the permission of the <a href="https://maps.nls.uk/">National Library of Scotland</a>'
        /><BuildingBaseLayer theme="night_outlines" /></>
	} else {
        return null;
    }
}

