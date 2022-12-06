import { GeoJsonObject } from 'geojson';
import React, { useEffect, useState } from 'react';
import { GeoJSON } from 'react-leaflet';
import { apiGet } from '../../apiHelpers';
import { useDisplayPreferences } from '../../displayPreferences-context';

export function CreativeBoundaryLayer() {
    const [boundaryGeojson, setBoundaryGeojson] = useState<GeoJsonObject>(null);
    const { creative } = useDisplayPreferences();

    useEffect(() => {
        apiGet('/geometries/creative_enterprise_zones.geojson')
            .then(data => setBoundaryGeojson(data as GeoJsonObject));
    }, []);

    if(creative == "enabled") {
        return boundaryGeojson &&
        <GeoJSON 
        attribution="Creative Enterprise Zones data from <a href=https://apps.london.gov.uk/planning/?_gl=1*avicz4*_ga*MTg1MjY3MzMuMTY2NzcxMjIwMg..*_ga_PY4SWZN1RJ*MTY2NzcxMjI1NS4xLjAuMTY2NzcxMjI1NS42MC4wLjA>PLanning Datamap</a> licence: <a href=https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/>Open Government Licence v3.0</a> The boundaries are based on Ordnance Survey mapping and the data is published under Ordnance Survey's 'presumption to publish'. Contains OS data © Crown copyright and database rights 2019."
        data={boundaryGeojson}
        style={{color: '#f0f', fill: true, weight: 1, opacity: 0.6}}
    />;
    } else if (creative == "disabled") {
        return <div></div>
    }
}
