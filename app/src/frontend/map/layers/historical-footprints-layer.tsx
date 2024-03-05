import { GeoJsonObject } from 'geojson';
import React, { useEffect, useState } from 'react';
import { GeoJSON } from 'react-leaflet';
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
        <GeoJSON 
            attribution='Digitised historical footprints test'
            data={boundaryGeojson}
            style={{color: '#fa7a2f', fill: false, weight: 1}}
        />;
    } else {
        return <></>
    }
}

