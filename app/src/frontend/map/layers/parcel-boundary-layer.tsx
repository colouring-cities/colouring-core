import { GeoJsonObject } from 'geojson';
import React, { useEffect, useState } from 'react';
import { GeoJSON } from 'react-leaflet';
import { ParcelEnablementState } from '../../config/map-config';
import { apiGet } from '../../apiHelpers';

export function ParcelBoundaryLayer({enablement}: {enablement: ParcelEnablementState}) {
    const [boundaryGeojson, setBoundaryGeojson] = useState<GeoJsonObject>(null);

    useEffect(() => {
        apiGet('/geometries/parcels_city_of_london.geojson')
            .then(data => setBoundaryGeojson(data as GeoJsonObject));
    }, []);

    if(enablement == "enabled") {
        return boundaryGeojson &&
        <GeoJSON 
        attribution='Parcel boundary from <a href=https://use-land-property-data.service.gov.uk/datasets/inspire/download>Index polygons spatial data (INSPIRE)</a> - <a href=www.nationalarchives.gov.uk/doc/open-government-licence/version/3/>Open Government Licence v3</a>'
        data={boundaryGeojson}
        style={{color: '#ff0', fill: false, weight: 1}}
       /* minNativeZoom={17}*/
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

