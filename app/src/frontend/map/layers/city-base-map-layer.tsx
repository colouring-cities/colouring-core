import * as React from 'react';
import { TileLayer } from 'react-leaflet';

import { MapTheme } from '../../config/map-config';

const OS_API_KEY = 'NVUxtY5r8eA6eIfwrPTAGKrAAsoeI9E9';

/**
 * Base raster layer for the map.
 * @param theme map theme
 */
export function CityBaseMapLayer({theme}: {theme: MapTheme}) {

    /**
     * Ordnance Survey maps - UK / London specific
     * (replace with appropriate base map for other cities/countries)
     */
    const key = OS_API_KEY;
    const tilematrixSet = 'EPSG:3857';
    const layer = theme === 'light' ? 'Light 3857' : 'Night 3857';
    const baseUrl = `https://api2.ordnancesurvey.co.uk/mapping_api/v1/service/zxy/${tilematrixSet}/${layer}/{z}/{x}/{y}.png?key=${key}`;
    const attribution = 'Building attribute data is © Colouring London contributors. Maps contain OS data © Crown copyright: OS Maps baselayers and building outlines. <a href=/ordnance-survey-licence.html>OS licence</a>';
    
    return <TileLayer
        key={theme} /* needed because TileLayer.key is not mutabe in react-leaflet v3 */
        url={baseUrl}
        attribution={attribution}
        maxNativeZoom={18}
        maxZoom={19}
        detectRetina={true}
    />;
}

