
import { GeoJsonObject } from 'geojson';
import React, { useEffect, useState } from 'react';
import { GeoJSON } from 'react-leaflet';
import { apiGet } from '../../apiHelpers';
import { useDisplayPreferences } from '../../displayPreferences-context';

export function WorldHeritageSitesLayer() {
    const [worldHeritageSitesGeojson, setWorldHeritageSitesGeojson] = useState<GeoJsonObject>(null);
    const { worldHeritageSites } = useDisplayPreferences();

    useEffect(() => {
        apiGet('/geometries/world_heritage_sites_simplified_1m.geojson')
            .then(data => setWorldHeritageSitesGeojson(data as GeoJsonObject));
    }, []);

    if(worldHeritageSites == "enabled") {
        return worldHeritageSitesGeojson &&
        <GeoJSON 
        attribution='<a href="https://historicengland.org.uk/terms/website-terms-conditions/open-data-hub/">Historic England - Open Government Licence.</a>'
        data={worldHeritageSitesGeojson}
        style={{color: '#80ff80', fill: true, weight: 1, opacity: 1, fillOpacity: 0.5}}
    />;
    } else if (worldHeritageSites == "disabled") {
        return <div></div>
    }
}
