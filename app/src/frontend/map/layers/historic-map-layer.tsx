import * as React from 'react';
import { TileLayer } from 'react-leaflet';
import { LayerEnablementState } from '../../config/map-config';
import { BuildingBaseLayerAllZoom } from './building-base-layer-all-zoom';
import { useDisplayPreferences } from '../../displayPreferences-context';
import { BuildingDataLayer } from './building-data-layer';

export function HistoricMapLayer({revisionId}: {revisionId: string}) {
    const { historicMap } = useDisplayPreferences();
    if(historicMap == "enabled") {
        return <>
                <TileLayer
                    url="https://mapseries-tilesets.s3.amazonaws.com/london_1890s/{z}/{x}/{y}.png"
                    attribution='&copy; CC BY 4.0 - Reproduced with the permission of the <a href="https://maps.nls.uk/">National Library of Scotland</a>'
                />
            </>
	} else {
        return null;
    }
}

