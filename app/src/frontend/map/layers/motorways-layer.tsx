
import { GeoJsonObject } from 'geojson';
import React, { useEffect, useState } from 'react';
import { GeoJSON } from 'react-leaflet';
import { apiGet } from '../../apiHelpers';
import { useDisplayPreferences } from '../../displayPreferences-context';

export function MotorwaysLayer() {
    const [motorwaysGeojson, setMotorwaysGeojson] = useState<GeoJsonObject>(null);
    const { motorways } = useDisplayPreferences();

    useEffect(() => {
        apiGet('/geometries/motorways.geojson')
            .then(data => setMotorwaysGeojson(data as GeoJsonObject));
    }, []);

    if(motorways == "enabled") {
        return motorwaysGeojson &&
        <GeoJSON 
        attribution='motorways: <a href="https://www.ordnancesurvey.co.uk/products/os-open-roads">OS Open Roads</a> - © Crown copyright and database rights'
        data={motorwaysGeojson}
        style={{color: '#00f', fill: false, weight: 1, opacity: 0.6}}
    />;
    } else if (motorways == "disabled") {
        return <div></div>
    }
}
