import { GeoJsonObject } from 'geojson';
import React, { useEffect, useState } from 'react';
import { GeoJSON } from 'react-leaflet';
import { FloodEnablementState } from '../../config/map-config';
import { apiGet } from '../../apiHelpers';

export function VistaBoundaryLayer({enablement}: {enablement: FloodEnablementState}) {
    const [boundaryGeojson, setBoundaryGeojson] = useState<GeoJsonObject>(null);

    useEffect(() => {
        apiGet('/geometries/protected_vistas.geojson')
            .then(data => setBoundaryGeojson(data as GeoJsonObject));
    }, []);

    if(enablement == "enabled") {
        return boundaryGeojson &&
        <GeoJSON 
        attribution=' London Views Management Framework (LVMF) – Extended background vistas from <a href=https://data.london.gov.uk/dataset/london-views-management-framework-lvmf-extended-background-vistas>London Datastore</a>: <a href=https://creativecommons.org/licenses/by/4.0/legalcode>CC-BY-SA 4.0</a> by Greater London Authority (GLA)'
        data={boundaryGeojson}
        style={{color: '#0f0', fill: true, weight: 1, opacity: 0.6}}
    />;
    } else if (enablement == "disabled") {
        return <div></div>
    }
}
