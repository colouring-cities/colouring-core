import { GeoJsonObject } from 'geojson';
import React, { useEffect, useState } from 'react';
import { GeoJSON } from 'react-leaflet';
import { useDisplayPreferences } from '../../displayPreferences-context';
import { apiGet } from '../../apiHelpers';

export function ConservationAreaBoundaryLayer({}) {
    const [boundaryGeojson, setBoundaryGeojson] = useState<GeoJsonObject>(null);
    const { conservation } = useDisplayPreferences();

    useEffect(() => {
        apiGet('/geometries/conservation_areas.geojson')
            .then(data => setBoundaryGeojson(data as GeoJsonObject));
    }, []);

    if(conservation == "enabled") {
        return boundaryGeojson &&
        <GeoJSON 
        attribution='Conservation areas by <a href=http://www.bedfordpark.net/leo/planning/>Leo Hall</a> on <a href=https://creativecommons.org/licenses/by/4.0/legalcode>CC-BY 4.0 licence</a>, contains data under <a href=https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/>the Open Government Licence v.3.0</a>'
        data={boundaryGeojson}
        style={{color: '#cd7090', fill: true, weight: 1, opacity: 1, fillOpacity: 0.8}}
    />;
    } else if (conservation == "disabled") {
        return <div></div>
    } else {
        return boundaryGeojson &&
        <GeoJSON data={boundaryGeojson} style={{color: '#fff', fill: true}}/>;
    }
}

