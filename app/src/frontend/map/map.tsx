import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { AttributionControl, MapContainer, ZoomControl, useMapEvent, Pane, useMap } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import './map.css';

import { apiGet } from '../apiHelpers';
import { HelpIcon } from '../components/icons';
import { categoryMapsConfig } from '../config/category-maps-config';
import { Category } from '../config/categories-config';
import { initialMapViewport, mapBackgroundColor, MapTheme, LayerEnablementState } from '../config/map-config';

import { Building } from '../models/building';

import { CityBaseMapLayer } from './layers/city-base-map-layer';
import { CityBoundaryLayer } from './layers/city-boundary-layer';
import { BoroughBoundaryLayer } from './layers/borough-boundary-layer';
import { ParcelBoundaryLayer } from './layers/parcel-boundary-layer';
import { HistoricDataLayer } from './layers/historic-data-layer';
import { FloodBoundaryLayer } from './layers/flood-boundary-layer';
import { ConservationAreaBoundaryLayer } from './layers/conservation-boundary-layer';
import { VistaBoundaryLayer } from './layers/vista-boundary-layer';
import { HousingBoundaryLayer } from './layers/housing-boundary-layer';
import { CreativeBoundaryLayer } from './layers/creative-boundary-layer';
import { BuildingBaseLayer } from './layers/building-base-layer';
import { BuildingDataLayer } from './layers/building-data-layer';
import { BuildingNumbersLayer } from './layers/building-numbers-layer';
import { BuildingHighlightLayer } from './layers/building-highlight-layer';

import { Legend } from './legend';
import SearchBox from './search-box';
import ThemeSwitcher from './theme-switcher';
import BoroughSwitcher from './borough-switcher';
import ParcelSwitcher from './parcel-switcher';
import FloodSwitcher from './flood-switcher';
import ConservationAreaSwitcher from './conservation-switcher';
import HistoricDataSwitcher from './historic-data-switcher';
import VistaSwitcher from './vista-switcher';
import CreativeSwitcher from './creative-switcher';
import HousingSwitcher from './housing-switcher';
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
    {/* TODO start change remaining ones */}
    const [borough, setBorough] = useState<LayerEnablementState>('enabled');
    const [parcel, setParcel] = useState<LayerEnablementState>('disabled');
    const [flood, setFlood] = useState<LayerEnablementState>('disabled');
    const [conservation, setConservation] = useState<LayerEnablementState>('disabled');
    const [historicData, setHistoricData] = useState<LayerEnablementState>('disabled');
    const [creative, setCreative] = useState<LayerEnablementState>('disabled');
    const [housing, setHousing] = useState<LayerEnablementState>('disabled');
    {/* TODO end */}
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

    {/* change remaining ones */}
    const boroughSwitch = useCallback(
        (e) => {
            e.preventDefault();
            const newBorough = (borough === 'enabled')? 'disabled' : 'enabled';
            setBorough(newBorough);
        },
        [borough],
    )

    const parcelSwitch = useCallback(
        (e) => {
            e.preventDefault();
            const newParcel = (parcel === 'enabled')? 'disabled' : 'enabled';
            setParcel(newParcel);
        },
        [parcel],
    )

    const floodSwitch = useCallback(
        (e) => {
            e.preventDefault();
            const newFlood = (flood === 'enabled')? 'disabled' : 'enabled';
            setFlood(newFlood);
        },
        [flood],
    )

    const conservationSwitch = useCallback(
        (e) => {
            e.preventDefault();
            const newConservation = (conservation === 'enabled')? 'disabled' : 'enabled';
            setConservation(newConservation);
        },
        [conservation],
    )

    const historicDataSwitch = useCallback(
        (e) => {
            e.preventDefault();
            const newHistoric = (historicData === 'enabled')? 'disabled' : 'enabled';
            setHistoricData(newHistoric);
        },
        [historicData],
    )

    const housingSwitch = useCallback(
        (e) => {
            e.preventDefault();
            const newHousing = (housing === 'enabled')? 'disabled' : 'enabled';
            setHousing(newHousing);
        },
        [housing],
    )

    const creativeSwitch = useCallback(
        (e) => {
            e.preventDefault();
            const newCreative = (creative === 'enabled')? 'disabled' : 'enabled';
            setCreative(newCreative);
        },
        [creative],
    )
    {/* TODO end */}

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
                    <HistoricDataLayer enablement={historicData}/>
                    <BoroughBoundaryLayer enablement={borough}/>
                    <ParcelBoundaryLayer enablement={parcel}/>
                    <FloodBoundaryLayer />
                    <ConservationAreaBoundaryLayer enablement={conservation}/>
                    <VistaBoundaryLayer />
                    <HousingBoundaryLayer />
                    <CreativeBoundaryLayer />
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

                    {/* TODO change remaining ones*/}
                    <BoroughSwitcher onSubmit={boroughSwitch} currentDisplay={borough} />
                    <ParcelSwitcher onSubmit={parcelSwitch} currentDisplay={parcel} />
                    <FloodSwitcher />
                    <ConservationAreaSwitcher onSubmit={conservationSwitch} currentDisplay={conservation} />
                    <HistoricDataSwitcher onSubmit={historicDataSwitch} currentDisplay={historicData} />
                    <VistaSwitcher />
                    <HousingSwitcher />
                    <CreativeSwitcher />
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
