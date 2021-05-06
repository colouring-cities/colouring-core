import React, { Component, Fragment, useEffect } from 'react';
import { AttributionControl, MapContainer, ZoomControl, useMapEvent, Pane, useMap } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import './map.css';

import { apiGet } from '../apiHelpers';
import { HelpIcon } from '../components/icons';
import { categoryMapsConfig } from '../config/category-maps-config';
import { Category } from '../config/categories-config';
import { defaultMapPosition, mapBackgroundColor, MapTheme } from '../config/map-config';
import { Building } from '../models/building';

import { CityBaseMapLayer } from './layers/city-base-map-layer';
import { CityBoundaryLayer } from './layers/city-boundary-layer';
import { BuildingBaseLayer } from './layers/building-base-layer';
import { BuildingDataLayer } from './layers/building-data-layer';
import { BuildingNumbersLayer } from './layers/building-numbers-layer';
import { BuildingHighlightLayer } from './layers/building-highlight-layer';

import Legend from './legend';
import SearchBox from './search-box';
import ThemeSwitcher from './theme-switcher';

interface ColouringMapProps {
    selectedBuildingId: number;
    mode: 'basic' | 'view' | 'edit' | 'multi-edit';
    category: Category;
    revisionId: string;
    onBuildingAction: (building: Building) => void;
}

interface ColouringMapState {
    theme: MapTheme;
    lat: number;
    lng: number;
    zoom: number;
}

/**
 * Map area
 */
class ColouringMap extends Component<ColouringMapProps, ColouringMapState> {
    constructor(props) {
        super(props);
        this.state = {
            theme: 'light',
            ...defaultMapPosition
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleLocate = this.handleLocate.bind(this);
        this.themeSwitch = this.themeSwitch.bind(this);
    }

    handleLocate(lat, lng, zoom){
        this.setState({
            lat: lat,
            lng: lng,
            zoom: zoom
        });
    }

    handleClick(e) {
        const { lat, lng } = e.latlng;
        apiGet(`/api/buildings/locate?lat=${lat}&lng=${lng}`)
            .then(data => {
                const building = data?.[0];
                this.props.onBuildingAction(building);
            }).catch(err => console.error(err));
    }

    themeSwitch(e) {
        e.preventDefault();
        const newTheme = (this.state.theme === 'light')? 'night' : 'light';
        this.setState({theme: newTheme});
    }

    render() {
        const categoryMapDefinition = categoryMapsConfig[this.props.category];

        const position: [number, number] = [this.state.lat, this.state.lng];

        const tileset = categoryMapDefinition.mapStyle;

        const hasSelection = this.props.selectedBuildingId != undefined;
        const isEdit = ['edit', 'multi-edit'].includes(this.props.mode);

        return (
            <div className="map-container">
                <MapContainer
                    center={position}
                    zoom={this.state.zoom}
                    minZoom={9}
                    maxZoom={19}
                    doubleClickZoom={false}
                    zoomControl={false}
                    attributionControl={false}
                >
                    <ClickHandler onClick={this.handleClick} />
                    <MapBackgroundColor theme={this.state.theme} />

                    <Pane
                        key={this.state.theme}
                        name={'cc-base-pane'}
                        style={{zIndex: 50}}
                    >
                        <CityBaseMapLayer theme={this.state.theme} />
                        <BuildingBaseLayer theme={this.state.theme} />
                    </Pane>

                    {
                        tileset &&
                            <BuildingDataLayer
                                tileset={tileset}
                                revisionId={this.props.revisionId}
                            />
                    }

                    <Pane
                        name='cc-overlay-pane'
                        style={{zIndex: 300}}
                    >
                        <CityBoundaryLayer />
                        <BuildingNumbersLayer revisionId={this.props.revisionId} />
                        {
                            this.props.selectedBuildingId &&
                                <BuildingHighlightLayer
                                    selectedBuildingId={this.props.selectedBuildingId}
                                    baseTileset={tileset} 
                                />
                        }
                    </Pane>

                    <ZoomControl position="topright" />
                    <AttributionControl prefix=""/>
                </MapContainer>
                {
                    this.props.mode !== 'basic' &&
                    <Fragment>
                        {
                            !hasSelection &&
                            <div className="map-notice">
                                <HelpIcon /> {isEdit ? 'Click a building to edit' : 'Click a building for details'}
                            </div>
                        }
                        <Legend legendConfig={categoryMapDefinition?.legend} />
                        {/* <ThemeSwitcher onSubmit={this.themeSwitch} currentTheme={this.state.theme} /> */}
                        <SearchBox onLocate={this.handleLocate} />
                    </Fragment>
                }
            </div>
        );
    }
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

export default ColouringMap;
