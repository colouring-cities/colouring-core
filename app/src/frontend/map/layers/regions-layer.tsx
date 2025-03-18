
import { GeoJsonObject } from 'geojson';
import React, { useEffect, useState } from 'react';
import { GeoJSON } from 'react-leaflet';
import { apiGet } from '../../apiHelpers';
import { useDisplayPreferences } from '../../displayPreferences-context';

export function RegionsLayer() {
    const [regionsGeojson, setRegionsGeojson] = useState<GeoJsonObject>(null);
    const { regions } = useDisplayPreferences();
    const { darkLightTheme } = useDisplayPreferences();

    useEffect(() => {
        apiGet('/geometries/regions_simplified_by_5_m.geojson')
            .then(data => setRegionsGeojson(data as GeoJsonObject));
    }, []);

    if(regions == "enabled") {
        return regionsGeojson &&
        <GeoJSON 
        attribution='Region boundaries: <a href="https://www.ordnancesurvey.co.uk/products/boundary-line">Boundary-Line</a> - © Crown copyright and database rights - Ordnance Survey'
        data={regionsGeojson}
        style={{color: (darkLightTheme === 'light')? '#000' : '#fff', fill: false, weight: 2, opacity: 0.6}}
    />;
    } else if (regions == "disabled") {
        return <div></div>
    }
}
