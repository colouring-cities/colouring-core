import * as React from 'react';
import { TileLayer } from 'react-leaflet';
import { useDisplayPreferences } from '../../displayPreferences-context';
import { BuildingBaseLayerAllZoom } from './building-base-layer-all-zoom';
import { BuildingDataLayer } from './building-data-layer';

export function AerialPhotosMapLayer({revisionId}: {revisionId: string}) {
    const { aerialPhotosMap } = useDisplayPreferences();
    if(aerialPhotosMap == "enabled") {
        return <>
                <TileLayer
                    url="https://geo.nls.uk/maps/air-photos-1250/{z}/{x}/{y}.png"
                    attribution='&copy; CC BY 4.0 - Reproduced with the permission of the <a href="https://maps.nls.uk/">National Library of Scotland</a>'
                />
                <BuildingBaseLayerAllZoom theme="night_outlines" />
            </>
	} else {
        return null;
    }
}

//https://geo.nls.uk/maps/air-photos-1250/{z}/{x}/{y}.png
//https://geo.nls.uk/maps/air-photos-10560/{z}/{x}/{y}.png