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
        attribution='Flood zone from <a href=https://data.london.gov.uk/dataset/flood-risk-zones>London Datastore</a>: © Environment Agency copyright and/or database right 2017. All rights reserved. Some features of this map are based on digital spatial data from the Centre for Ecology & Hydrology, © NERC (CEH) © Crown copyright and database rights 2017 Ordnance Survey 100024198'
        data={boundaryGeojson}
        style={{color: '#00f', fill: true, weight: 1, opacity: 0.6}}
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

