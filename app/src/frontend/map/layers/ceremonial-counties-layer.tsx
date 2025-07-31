
import { GeoJsonObject } from 'geojson';
import React, { useEffect, useState } from 'react';
import { GeoJSON } from 'react-leaflet';
import { apiGet } from '../../apiHelpers';
import { useDisplayPreferences } from '../../displayPreferences-context';

export function CeremonialCountiesLayer() {
    const [ceremonialCountiesGeojson, setCeremonialCountiesGeojson] = useState<GeoJsonObject>(null);
    const { ceremonialCounties } = useDisplayPreferences();

    useEffect(() => {
        apiGet('/geometries/ceremonial_counties_simplified_by_5_m.geojson')
            .then(data => setCeremonialCountiesGeojson(data as GeoJsonObject));
    }, []);

    if(ceremonialCounties == "enabled") {
        return ceremonialCountiesGeojson &&
        <GeoJSON 
        attribution='County boundaries: <a href="https://www.ordnancesurvey.co.uk/products/boundary-line">Boundary-Line</a> - © Crown copyright and database rights - Ordnance Survey'
        data={ceremonialCountiesGeojson}
        style={{color: '#f00', fill: false, weight: 1, opacity: 0.6}}
    />;
    } else if (ceremonialCounties == "disabled") {
        return <div></div>
    }
}
