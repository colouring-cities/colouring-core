import { GeoJsonObject } from 'geojson';
import React, { useEffect, useState } from 'react';
import { GeoJSON } from 'react-leaflet';
import { HousingEnablementState } from '../../config/map-config';
import { apiGet } from '../../apiHelpers';

export function HousingBoundaryLayer({enablement}: {enablement: HousingEnablementState}) {
    const [boundaryGeojson, setBoundaryGeojson] = useState<GeoJsonObject>(null);

    useEffect(() => {
        apiGet('/geometries/housing_zones.geojson')
            .then(data => setBoundaryGeojson(data as GeoJsonObject));
    }, []);

    if(enablement == "enabled") {
        return boundaryGeojson &&
        <GeoJSON 
        attribution="Housing Zones from <a href=https://data.london.gov.uk/dataset/housing_zones>London Datastore</a>. The boundaries are based on Ordnance Survey mapping and the data is published under Ordnance Survey's 'presumption to publish'. Contains OS data © Crown copyright and database rights 2019. Greater London Authority - Contains public sector information licensed under the <a href=https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/>Open Government Licence v3.0</a>'"
        data={boundaryGeojson}
        style={{color: '#00f', fill: true, weight: 1, opacity: 0.6}}
    />;
    } else if (enablement == "disabled") {
        return <div></div>
    }
}
