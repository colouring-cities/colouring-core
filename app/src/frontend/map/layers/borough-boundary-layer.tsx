import { GeoJsonObject } from 'geojson';
import React, { useEffect, useState } from 'react';
import { GeoJSON } from 'react-leaflet';
import { BoroughEnablementState } from '../../config/map-config';
import { apiGet } from '../../apiHelpers';

export function BoroughBoundaryLayer({enablement}: {enablement: BoroughEnablementState}) {
    const [boundaryGeojson, setBoundaryGeojson] = useState<GeoJsonObject>(null);

    useEffect(() => {
        apiGet('/geometries/boroughs.geojson')
            .then(data => setBoundaryGeojson(data as GeoJsonObject));
    }, []);

    if(enablement == "enabled") {
        return boundaryGeojson &&
        <GeoJSON 
        data={boundaryGeojson}
        style={{color: '#f00', fill: false, weight: 1}}
       /* minNativeZoom={17}*/
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

