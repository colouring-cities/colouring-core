import * as React from 'react';
import { TileLayer } from 'react-leaflet';
import { useDisplayPreferences } from '../../displayPreferences-context';

export function OpenStreetMapLayer() {
    const { openStreetMap } = useDisplayPreferences();
    if(openStreetMap == "enabled") {
        return <>
                <TileLayer
                    url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href=https://www.openstreetmap.org/copyright>OpenStreetMap contributors</a>'
                />
            </>
	} else {
        return null;
    }
}

