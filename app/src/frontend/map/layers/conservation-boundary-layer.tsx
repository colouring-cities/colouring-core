import { GeoJsonObject } from 'geojson';
import React, { useEffect, useState } from 'react';
import { GeoJSON } from 'react-leaflet';
import { ConservationAreasEnablementState } from '../../config/map-config';
import { apiGet } from '../../apiHelpers';

export function ConservationAreaBoundaryLayer({enablement}: {enablement: ConservationAreasEnablementState}) {
    const [boundaryGeojson, setBoundaryGeojson] = useState<GeoJsonObject>(null);

    useEffect(() => {
        apiGet('/geometries/conservation_areas.geojson')
            .then(data => setBoundaryGeojson(data as GeoJsonObject));
    }, []);

    if(enablement == "enabled") {
        return boundaryGeojson &&
        <GeoJSON 
        attribution='Conservation areas by <a href=http://www.bedfordpark.net/leo/planning/>Leo Hall</a> on CC-BY 4.0 licence, contains data under the Open Government Licence v.3.0'
        data={boundaryGeojson}
        style={{color: '#bc8f8f', fill: true, weight: 1, opacity: 0.8}}
    />;
    } else if (enablement == "disabled") {
        return <div></div>
    } else {
        return boundaryGeojson &&
        <GeoJSON data={boundaryGeojson} style={{color: '#fff', fill: true}}/>;
    }
}

