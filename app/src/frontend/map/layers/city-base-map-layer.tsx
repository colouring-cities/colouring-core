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

    const baseUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const attribution = ' <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors ';


    return <TileLayer
        url={baseUrl}
        attribution={attribution}
        maxNativeZoom={20}
        maxZoom={20}
        detectRetina={true}
        className={theme_class}
    />;
}

