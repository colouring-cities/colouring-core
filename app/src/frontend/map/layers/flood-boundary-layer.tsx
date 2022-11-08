import { GeoJsonObject } from 'geojson';
import React, { useEffect, useState } from 'react';
import { GeoJSON } from 'react-leaflet';
import { FloodEnablementState } from '../../config/map-config';
import { apiGet } from '../../apiHelpers';

export function FloodBoundaryLayer({enablement}: {enablement: FloodEnablementState}) {
    const [boundaryGeojson, setBoundaryGeojson] = useState<GeoJsonObject>(null);

    useEffect(() => {
        apiGet('/geometries/flood_zones_simplified.geojson')
            .then(data => setBoundaryGeojson(data as GeoJsonObject));
    }, []);

    if(enablement == "enabled") {
        return boundaryGeojson &&
        <GeoJSON 
        data={boundaryGeojson}
        style={{color: '#00f', fill: false, weight: 1}}
    />;
    } else if (enablement == "disabled") {
        return <div></div>
        // do not display anything
        return boundaryGeojson &&
        <GeoJSON 
        data={boundaryGeojson}
        style={{color: '#0f0', fill: false, weight: 1}} />
    } else {
        return boundaryGeojson &&
        <GeoJSON data={boundaryGeojson} style={{color: '#0f0', fill: true}}/>;
    }
}

