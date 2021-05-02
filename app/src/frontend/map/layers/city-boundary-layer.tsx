import { GeoJsonObject } from 'geojson';
import React, { useEffect, useState } from 'react';
import { GeoJSON } from 'react-leaflet';

import { apiGet } from '../../apiHelpers';

export function CityBoundaryLayer() {
    const [boundaryGeojson, setBoundaryGeojson] = useState<GeoJsonObject>(null);

    useEffect(() => {
        apiGet('/geometries/boundary-detailed.geojson')
            .then(data => setBoundaryGeojson(data as GeoJsonObject));
    }, []);

    return boundaryGeojson &&
        <GeoJSON data={boundaryGeojson} style={{color: '#bbb', fill: false}}/>;
}