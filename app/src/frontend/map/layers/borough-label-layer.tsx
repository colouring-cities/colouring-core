import { GeoJsonObject } from 'geojson';
import React, { useEffect, useState } from 'react';
import { GeoJSON } from 'react-leaflet';
import { useDisplayPreferences } from '../../displayPreferences-context';
import { apiGet } from '../../apiHelpers';
import { BuildingBaseLayerAllZoom } from './building-base-layer-all-zoom';

export function BoroughLabelLayer({}) {
    const { borough } = useDisplayPreferences();

    if(borough == "enabled") {
        return <BuildingBaseLayerAllZoom theme="boroughs" />;
    } else {
        return <></>
    }
}

