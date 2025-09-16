import { GeoJsonObject } from 'geojson';
import React, { useEffect, useState } from 'react';
import { GeoJSON } from 'react-leaflet';
import { useDisplayPreferences } from '../../displayPreferences-context';
import { apiGet } from '../../apiHelpers';
import { BuildingBaseLayerAllZoom } from './building-base-layer-all-zoom';

export function BoroughBoundaryLayer({}) {
    const [boundaryGeojson, setBoundaryGeojson] = useState<GeoJsonObject>(null);
    const { borough } = useDisplayPreferences();

    useEffect(() => {
        apiGet('/geometries/boroughs.geojson')
            .then(data => setBoundaryGeojson(data as GeoJsonObject));
    }, []);

    if(borough == "enabled") {
        return boundaryGeojson &&
        <GeoJSON 
            attribution='Borough boundary from <a href=https://data.london.gov.uk/dataset/london_boroughs>London Datastore</a> Ordnance Survey Open Data - Contains public sector information licensed under the <a href=https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/>Open Government Licence v3.0</a>'
            data={boundaryGeojson}
            style={{color: '#a5a5a5', fill: false, weight: 0.8}}
        />;
    } else {
        return <></>
    }
}

