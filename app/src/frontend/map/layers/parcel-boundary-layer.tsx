import { GeoJsonObject } from 'geojson';
import React, { useEffect, useState } from 'react';
import { GeoJSON } from 'react-leaflet';
import { LayerEnablementState } from '../../config/map-config';
import { apiGet } from '../../apiHelpers';
import { useDisplayPreferences } from '../../displayPreferences-context';

export function ParcelBoundaryLayer() {
    const [boundaryGeojson, setBoundaryGeojson] = useState<GeoJsonObject>(null);
    const { parcel } = useDisplayPreferences();

    useEffect(() => {
        apiGet('/geometries/parcels_city_of_london.geojson')
            .then(data => setBoundaryGeojson(data as GeoJsonObject));
    }, []);

    if(parcel == "enabled") {
        return boundaryGeojson &&
        <GeoJSON 
        attribution='Parcel boundary from <a href=https://use-land-property-data.service.gov.uk/datasets/inspire/download>Index polygons spatial data (INSPIRE)</a> - <a href=www.nationalarchives.gov.uk/doc/open-government-licence/version/3/>Open Government Licence v3</a>'
        data={boundaryGeojson}
        style={{color: '#ff0', fill: false, weight: 1}}
       /* minNativeZoom={17}*/
    />;
    } else {
        return <div></div>
    }
}

