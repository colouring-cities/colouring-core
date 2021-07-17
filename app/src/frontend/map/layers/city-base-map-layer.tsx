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
    const layer = theme === 'light' ? 'Light_3857' : 'Light_3857';

    // In either theme case, we will use OS's light theme, but add our own filter
    const theme_class = theme === 'light' ? "light-theme" : "night-theme";

    const baseUrl = `https://api.os.uk/maps/raster/v1/zxy/${layer}/{z}/{x}/{y}.png?key=${apiKey}`;
    const attribution = 'Building attribute data is © Colouring London contributors. Maps contain OS data © Crown copyright: OS Maps baselayers and building outlines. <a href=/ordnance-survey-licence.html>OS licence</a>';

    return <TileLayer
        url={baseUrl}
        attribution={attribution}
        maxNativeZoom={18}
        maxZoom={19}
        detectRetina={true}
        className={theme_class}
    />;
}

