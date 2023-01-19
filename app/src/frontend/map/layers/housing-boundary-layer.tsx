import { GeoJsonObject } from 'geojson';
import React, { useEffect, useState } from 'react';
import { GeoJSON } from 'react-leaflet';
import { apiGet } from '../../apiHelpers';
import { useDisplayPreferences } from '../../displayPreferences-context';

export function HousingBoundaryLayer() {
    const [boundaryGeojson, setBoundaryGeojson] = useState<GeoJsonObject>(null);
    const { housing } = useDisplayPreferences();

    useEffect(() => {
        apiGet('/geometries/housing_zones.geojson')
            .then(data => setBoundaryGeojson(data as GeoJsonObject));
    }, []);

    if(housing == "enabled") {
        return boundaryGeojson &&
        <GeoJSON 
        attribution="Housing Zones from <a href=https://data.london.gov.uk/dataset/housing_zones>London Datastore</a>. The boundaries are based on Ordnance Survey mapping and the data is published under Ordnance Survey's 'presumption to publish'. Contains OS data © Crown copyright and database rights 2019. The Greater London Authority - Contains public sector information licensed under the <a href=https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/>Open Government Licence v3.0</a>'"
        data={boundaryGeojson}
        style={{color: '#FF8000', fill: true, weight: 1, opacity: 0.6}}
    />;
    } else if (housing == "disabled") {
        return <div></div>
    }
}
