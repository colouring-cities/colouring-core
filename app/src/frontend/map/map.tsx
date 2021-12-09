import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { AttributionControl, MapContainer, ZoomControl, useMapEvent, Pane, useMap } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import './map.css';

import { apiGet } from '../apiHelpers';
import { HelpIcon } from '../components/icons';
import { categoryMapsConfig } from '../config/category-maps-config';
import { Category } from '../config/categories-config';
import { initialMapViewport, mapBackgroundColor, MapTheme } from '../config/map-config';
import { Building } from '../models/building';

import { CityBaseMapLayer } from './layers/city-base-map-layer';
import { CityBoundaryLayer } from './layers/city-boundary-layer';
import { BuildingBaseLayer } from './layers/building-base-layer';
import { BuildingDataLayer } from './layers/building-data-layer';
import { BuildingNumbersLayer } from './layers/building-numbers-layer';
import { BuildingHighlightLayer } from './layers/building-highlight-layer';

import { Legend } from './legend';
import SearchBox from './search-box';
import ThemeSwitcher from './theme-switcher';
import { BuildingMapTileset } from '../config/tileserver-config';

interface ColouringMapProps {
    selectedBuildingId: number;
    mode: 'basic' | 'view' | 'edit' | 'multi-edit';
    category: Category;
    revisionId: string;
    onBuildingAction: (building: Building) => void;
}

export const ColouringMap : FC<ColouringMapProps> = ({
    category,
    mode,
    revisionId,
    onBuildingAction,
    selectedBuildingId,
    children
}) => {

    const [theme, setTheme] = useState<MapTheme>('night');
    const [position, setPosition] = useState(initialMapViewport.position);
    const [zoom, setZoom] = useState(initialMapViewport.zoom);

    const [mapColourScale, setMapColourScale] = useState<BuildingMapTileset>();

    const handleLocate = useCallback(
        (lat: number, lng: number, zoom: number) => {
            setPosition([lat, lng]);
            setZoom(zoom);
        },
        []
    );

    const handleClick = useCallback(
        async (e) => {
            const {lat, lng} = e.latlng;
            const data = await apiGet(`/api/buildings/locate?lat=${lat}&lng=${lng}`);
            const building = data?.[0];
            onBuildingAction(building);
        },
        [onBuildingAction],
    )

    const themeSwitch = useCallback(
        (e) => {
            e.preventDefault();
            const newTheme = (theme === 'light')? 'night' : 'light';
            setTheme(newTheme);
        },
        [theme],
    )

    const categoryMapDefinitions = useMemo(() => categoryMapsConfig[category], [category]);

    useEffect(() => {
        if(!categoryMapDefinitions.some(def => def.mapStyle === mapColourScale)) {
            setMapColourScale(categoryMapDefinitions[0].mapStyle);
        }
    }, [categoryMapDefinitions, mapColourScale]);

    const hasSelection = selectedBuildingId != undefined;
    const isEdit = ['edit', 'multi-edit'].includes(mode);

    return (
        <div className="map-container">
            <MapContainer
                center={initialMapViewport.position}
                zoom={initialMapViewport.zoom}
                minZoom={9}
                maxZoom={18}
                doubleClickZoom={false}
                zoomControl={false}
                attributionControl={false}
            >
                <ClickHandler onClick={handleClick} />
                <MapBackgroundColor theme={theme} />
                <MapViewport position={position} zoom={zoom} />

                <Pane
                    key={theme}
                    name={'cc-base-pane'}
                    style={{zIndex: 50}}
                >
                    <CityBaseMapLayer theme={theme} />
                    <BuildingBaseLayer theme={theme} />
                </Pane>

                {
                    mapColourScale &&
                        <BuildingDataLayer
                            tileset={mapColourScale}
                            revisionId={revisionId}
                        />
                }

                <Pane
                    name='cc-overlay-pane'
                    style={{zIndex: 300}}
                >
                    <CityBoundaryLayer />
                    <BuildingNumbersLayer revisionId={revisionId} />
                    {
                        selectedBuildingId &&
                            <BuildingHighlightLayer
                                selectedBuildingId={selectedBuildingId}
                                baseTileset={mapColourScale} 
                            />
                    }
                </Pane>

                <ZoomControl position="topright" />
                <AttributionControl prefix=""/>
            </MapContainer>
            {
                mode !== 'basic' &&
                <>
                    {
                        !hasSelection &&
                        <div className="map-notice">
                            <HelpIcon /> {isEdit ? 'Click a building to edit' : 'Click a building for details'}
                        </div>
                    }
                    <Legend mapColourScaleDefinitions={categoryMapDefinitions} mapColourScale={mapColourScale} onMapColourScale={setMapColourScale}/>
                    <ThemeSwitcher onSubmit={themeSwitch} currentTheme={theme} />
                    <SearchBox onLocate={handleLocate} />
                </>
            }
        </div>
    );
}

function ClickHandler({ onClick }: {onClick: (e) => void}) {
    useMapEvent('click', (e) => onClick(e));
    
    return null;
}

function MapBackgroundColor({ theme}: {theme: MapTheme}) {
    const map = useMap();
    useEffect(() => {
        map.getContainer().style.backgroundColor = mapBackgroundColor[theme];
    });

    return null;
}

function MapViewport({
    position,
    zoom
}: {
    position: [number, number];
    zoom: number;
}) {
    const map = useMap();

    useEffect(() => {
        map.setView(position, zoom)
    }, [position, zoom]);

    return null;
}
