import * as React from 'react';
import { TileLayer } from 'react-leaflet';

import { MapTheme } from '../../config/map-config';

const OS_API_KEY = 'UVWEspgInusDKKYANE5bmyddoEmCSD4r';

/**
 * Base raster layer for the map.
 * @param theme map theme
 */
export function CityBaseMapLayer({ theme }: { theme: MapTheme }) {

    /**
     * Ordnance Survey maps - UK / London specific
     * (replace with appropriate base map for other cities/countries)
     */
    const apiKey = OS_API_KEY;

    // Note that OS APIs does not provide dark theme
    const layer = 'Light_3857';

    // In either theme case, we will use OS's light theme, but add our own filter

    const theme_class = theme === 'light' ? "light-theme" : "night-theme";    

    // osm: Open Street Map
    // const baseUrl = `https://openstreetmap.org/{z}/{x}/{y}.png`;

    const baseUrl = `https://serviciosgis.catastrobogota.gov.co/arcgis/rest/services/Mapa_Referencia/mapa_base_3857/MapServer/tile/{z}/{y}/{x}`;
    
    const attribution = `Building attribute data is © Colouring Cities contributors. Maps contain OS data © Crown copyright: OS Maps baselayers and building outlines. <a href=/ordnance-survey-licence.html>OS licence</a>`;

    return <TileLayer
        url={baseUrl}
        attribution={attribution}
        maxNativeZoom={14}
        maxZoom={18}
        detectRetina={false}
        className={theme_class}
    />;
}

