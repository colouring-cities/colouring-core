import * as React from 'react';
import { TileLayer } from 'react-leaflet';
import { LayerEnablementState } from '../../config/map-config';
import { BuildingBaseLayerAllZoom } from './building-base-layer-all-zoom';
import { useDisplayPreferences } from '../../displayPreferences-context';
import { BuildingDataLayer } from './building-data-layer';

export function HistoricMapLayerWithoutFill({mapColourScale}: {mapColourScale: string}) {
    const { historicalMapAndFootprintsWithoutFill } = useDisplayPreferences();
    if(historicalMapAndFootprintsWithoutFill == "enabled" /* && mapColourScale == "survival_status" */ ) {
        return <>
                <TileLayer
                    url="https://mapseries-tilesets.s3.amazonaws.com/25_inch/leicestershire/{z}/{x}/{y}.png"
                    attribution='historical map: &copy; CC BY 4.0 - Reproduced with the permission of the <a href="https://maps.nls.uk/">National Library of Scotland</a>'
                />
                <TileLayer
                    url="https://mapseries-tilesets.s3.amazonaws.com/london_1890s/{z}/{x}/{y}.png"
                    attribution='&copy; CC BY 4.0 - Reproduced with the permission of the <a href="https://maps.nls.uk/">National Library of Scotland</a>'
                />
                <BuildingBaseLayerAllZoom theme="night_outlines" />
                </>
	} else {
        return null;
    }
}

