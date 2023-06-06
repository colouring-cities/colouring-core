import * as React from 'react';
import { TileLayer } from 'react-leaflet';
import { LayerEnablementState } from '../../config/map-config';
import { BuildingBaseLayerAllZoom } from './building-base-layer-all-zoom';
import { useDisplayPreferences } from '../../displayPreferences-context';
import { BuildingDataLayer } from './building-data-layer';

export function HistoricDataLayer({revisionId}: {revisionId: string}) {
    const { historicData } = useDisplayPreferences();
    if(historicData == "enabled") {
        return <>
                <TileLayer
                    url="https://mapseries-tilesets.s3.amazonaws.com/london_1890s/{z}/{x}/{y}.png"
                    attribution='&copy; CC BY 4.0 - Reproduced with the permission of the <a href="https://maps.nls.uk/">National Library of Scotland</a>'
                />
                <BuildingBaseLayerAllZoom theme="night_outlines" />
                <BuildingDataLayer tileset={'survival_status'} revisionId={revisionId} />
            </>
	} else {
        return null;
    }
}

