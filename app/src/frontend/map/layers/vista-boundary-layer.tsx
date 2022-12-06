import { GeoJsonObject } from 'geojson';
import React, { useEffect, useState } from 'react';
import { GeoJSON } from 'react-leaflet';
import { apiGet } from '../../apiHelpers';
import { useDisplayPreferences } from '../../displayPreferences-context';

export function VistaBoundaryLayer() {
    const [boundaryGeojson, setBoundaryGeojson] = useState<GeoJsonObject>(null);
    const { vista } = useDisplayPreferences();

    useEffect(() => {
        apiGet('/geometries/protected_vistas.geojson')
            .then(data => setBoundaryGeojson(data as GeoJsonObject));
    }, []);

    if(vista == "enabled") {
        return boundaryGeojson &&
        <GeoJSON 
        attribution=' London Views Management Framework (LVMF) – Extended background vistas from <a href=https://data.london.gov.uk/dataset/london-views-management-framework-lvmf-extended-background-vistas>London Datastore</a>: <a href=https://creativecommons.org/licenses/by/4.0/legalcode>CC-BY-SA 4.0</a> by Greater London Authority (GLA)'
        data={boundaryGeojson}
        style={{color: '#0f0', fill: true, weight: 1, opacity: 0.6}}
    />;
    } else {
        return <></>
    }
}
