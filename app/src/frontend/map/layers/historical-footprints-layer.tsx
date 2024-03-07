import { GeoJsonObject } from 'geojson';
import React, { useEffect, useState } from 'react';
import { GeoJSON, TileLayer } from 'react-leaflet';
import { useDisplayPreferences } from '../../displayPreferences-context';
import { apiGet } from '../../apiHelpers';
import { BuildingBaseLayerAllZoom } from './building-base-layer-all-zoom';

export function HistoricalFootprintsLayer({}) {
    const [boundaryGeojson, setBoundaryGeojson] = useState<GeoJsonObject>(null);
    const { historicalFootprints } = useDisplayPreferences();

    useEffect(() => {
        apiGet('/geometries/historial_footprints.geojson')
            .then(data => setBoundaryGeojson(data as GeoJsonObject));
    }, []);

    if(historicalFootprints == "enabled") {
        return boundaryGeojson &&
        <>
        <TileLayer
            url="https://mapseries-tilesets.s3.amazonaws.com/london_1890s/{z}/{x}/{y}.png"
            attribution='&copy; CC BY 4.0 - Reproduced with the permission of the <a href="https://maps.nls.uk/">National Library of Scotland</a>'
        />
        <GeoJSON 
            attribution='Digitised historical footprints test'
            data={boundaryGeojson}
            style={{color: '#fa7a2f', fill: false, weight: 1}}
        />
        </>;
    } else {
        return <></>
    }
}

