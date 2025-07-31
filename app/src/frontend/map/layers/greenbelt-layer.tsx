
import { GeoJsonObject } from 'geojson';
import React, { useEffect, useState } from 'react';
import { GeoJSON } from 'react-leaflet';
import { apiGet } from '../../apiHelpers';
import { useDisplayPreferences } from '../../displayPreferences-context';

export function GreenbeltLayer() {
    const [greenbeltGeojson, setGreenbeltGeojson] = useState<GeoJsonObject>(null);
    const { greenbelt } = useDisplayPreferences();

    useEffect(() => {
        apiGet('/geometries/green-belt.geojson')
            .then(data => setGreenbeltGeojson(data as GeoJsonObject));
    }, []);

    if(greenbelt == "enabled") {
        return greenbeltGeojson &&
        <GeoJSON 
        attribution='<a href="https://www.planning.data.gov.uk/dataset/green-belt">Your use of OS OpenData is subject to the terms at http://os.uk/opendata/licence Contains Ordnance Survey data © Crown copyright and database right 2025</a>, licensed under <a href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/">the Open Government Licence v.3.0</a>.'
        data={greenbeltGeojson}
        style={{color: '#0f0', fill: true, weight: 1, opacity: 0.6}}
    />;
    } else if (greenbelt == "disabled") {
        return <div></div>
    }
}
