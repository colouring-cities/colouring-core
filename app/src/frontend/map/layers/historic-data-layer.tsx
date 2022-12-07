import * as React from 'react';
import { TileLayer } from 'react-leaflet';
import { LayerEnablementState } from '../../config/map-config';
import { BuildingBaseLayer } from './building-base-layer';
import { useDisplayPreferences } from '../../displayPreferences-context';

export function HistoricDataLayer({}) {
    const { historicData } = useDisplayPreferences();
    if(historicData == "enabled") {
        return <><TileLayer
            url="https://mapseries-tilesets.s3.amazonaws.com/london_1890s/{z}/{x}/{y}.png"
            attribution='&copy; CC BY 4.0 - Reproduced with the permission of the <a href="https://maps.nls.uk/">National Library of Scotland</a>'
        /><BuildingBaseLayer theme="night_outlines" /></>
	} else {
        return null;
    }
}

