import { GeoJsonObject } from 'geojson';
import React, { Component, Fragment } from 'react';
import { AttributionControl, GeoJSON, Map, TileLayer, ZoomControl } from 'react-leaflet-universal';

import 'leaflet/dist/leaflet.css';
import './map.css';

import { apiGet } from '../apiHelpers';
import { HelpIcon } from '../components/icons';
import { toggleValue } from '../helpers';
import { Building } from '../models/building';
import { MapMode, EDIT_MAP_MODES, MapTheme, ALL_MAP_THEMES } from '../types';

import Legend from './legend';
import SearchBox from './search-box';
import ThemeSwitcher from './theme-switcher';

const OS_API_KEY = 'NVUxtY5r8eA6eIfwrPTAGKrAAsoeI9E9';

interface ColouringMapProps {
    building?: Building;
    mode: MapMode;
    category: string;
    revision_id: number;
    selectBuilding: (building: Building) => void;
    colourBuilding: (building: Building) => void;
}

interface ColouringMapState {
    manualTheme: MapTheme;
    lat: number;
    lng: number;
    zoom: number;
    boundary: GeoJsonObject;
}
/**
 * Map area
 */
class ColouringMap extends Component<ColouringMapProps, ColouringMapState> {
    constructor(props) {
        super(props);
        this.state = {
            manualTheme: undefined,
            lat: 51.5245255,
            lng: -0.1338422,
            zoom: 16,
            boundary: undefined,
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleLocate = this.handleLocate.bind(this);
        this.handleSwitchTheme = this.handleSwitchTheme.bind(this);
    }

    handleLocate(lat, lng, zoom){
        this.setState({
            lat: lat,
            lng: lng,
            zoom: zoom
        });
    }

    handleClick(e) {
        const mode = this.props.mode;
        const { lat, lng } = e.latlng;
        apiGet(`/api/buildings/locate?lat=${lat}&lng=${lng}`)
        .then(data => {
            if (data && data.length){
                const building = data[0];
                if (mode === 'multi-edit') {
                    // colour building directly
                    this.props.colourBuilding(building);
                } else if (this.props.building == undefined || building.building_id !== this.props.building.building_id){
                    this.props.selectBuilding(building);
                } else {
                    this.props.selectBuilding(undefined);
                }
            } else {
                if (mode !== 'multi-edit') {
                    // deselect but keep/return to expected colour theme
                    // except if in multi-edit (never select building, only colour on click)
                    this.props.selectBuilding(undefined);
                }
            }
        }).catch(
            (err) => console.error(err)
        );
    }

    getCurrentTheme(mode: MapMode, manualTheme: MapTheme): MapTheme {
        const isEdit = EDIT_MAP_MODES.includes(mode);
        return manualTheme ?? (isEdit ? 'light' : 'night');
    }

    handleSwitchTheme(e): void {
        e.preventDefault();

        this.setState((state, props) => ({
            manualTheme: toggleValue(this.getCurrentTheme(props.mode, state.manualTheme), ALL_MAP_THEMES)
        }));
    }

    async getBoundary() {
        const data = await apiGet('/geometries/boundary-detailed.geojson') as GeoJsonObject;

        this.setState({
            boundary: data
        });
    }

    componentDidMount() {
        this.getBoundary();
    }

    render() {
        const position: [number, number] = [this.state.lat, this.state.lng];

        const isEdit = EDIT_MAP_MODES.includes(this.props.mode);
        const currentTheme = this.getCurrentTheme(this.props.mode, this.state.manualTheme);
        const baseColor = currentTheme == 'light' ? '#fff' : '#000';

        // baselayer
        const key = OS_API_KEY;
        const tilematrixSet = 'EPSG:3857';
        const layer = currentTheme === 'light' ? 'Light 3857' : 'Night 3857';
        const baseUrl = `https://api2.ordnancesurvey.co.uk/mapping_api/v1/service/zxy/${tilematrixSet}/${layer}/{z}/{x}/{y}.png?key=${key}`;
        const attribution = 'Building attribute data is © Colouring London contributors. Maps contain OS data © Crown copyright: OS Maps baselayers and building outlines. <a href=/ordnance-survey-licence.html>OS licence</a>';
        
        const baseLayer = <TileLayer
            url={baseUrl}
            attribution={attribution}
            maxNativeZoom={18}
            maxZoom={19}
        />;

        const buildingsBaseUrl = `/tiles/base_${currentTheme}/{z}/{x}/{y}{r}.png`;
        const buildingBaseLayer = <TileLayer url={buildingsBaseUrl} minZoom={14} maxZoom={19}/>;


        const boundaryStyleFn = () => ({color: '#bbb', fill: false});
        const boundaryLayer = this.state.boundary &&
                <GeoJSON data={this.state.boundary} style={boundaryStyleFn}/>;

        // colour-data tiles
        const cat = this.props.category;
        const tilesetByCat = {
            age: 'date_year',
            size: 'size_height',
            construction: 'construction_core_material',
            location: 'location',
            community: 'likes',
            planning: 'planning_combined',
            sustainability: 'sust_dec',
            type: 'building_attachment_form',
            use: 'landuse'
        };
        const tileset = tilesetByCat[cat];
        // pick revision id to bust browser cache
        const rev = this.props.revision_id;
        const dataLayer = tileset != undefined ?
            <TileLayer
                key={tileset}
                url={`/tiles/${tileset}/{z}/{x}/{y}{r}.png?rev=${rev}`}
                minZoom={9}
                maxZoom={19}
            />
            : null;

        // highlight
        const highlightLayer = this.props.building != undefined ?
            <TileLayer
                key={this.props.building.building_id}
                url={`/tiles/highlight/{z}/{x}/{y}{r}.png?highlight=${this.props.building.building_id}&base=${tileset}`}
                minZoom={13}
                maxZoom={19}
                zIndex={100}
            />
            : null;

        const numbersLayer = <TileLayer
            key={currentTheme}
            url={`/tiles/number_labels/{z}/{x}/{y}{r}.png?rev=${rev}`}
            zIndex={200}
            minZoom={17}
            maxZoom={19}
        />

        return (
            <div className="map-container">
                <Map
                    center={position}
                    zoom={this.state.zoom}
                    minZoom={9}
                    maxZoom={19}
                    doubleClickZoom={false}
                    zoomControl={false}
                    attributionControl={false}
                    onClick={this.handleClick}
                    detectRetina={true}
                    style={{
                        backgroundColor: baseColor
                    }}
                >
                    { baseLayer }
                    { buildingBaseLayer }
                    { boundaryLayer }
                    { dataLayer }
                    { highlightLayer }
                    { numbersLayer }
                    <ZoomControl position="topright" />
                    <AttributionControl prefix=""/>
                </Map>
                {
                    this.props.mode !== 'basic'? (
                        <Fragment>
                            {
                                this.props.building == undefined ?
                                    <div className="map-notice">
                                        <HelpIcon /> {isEdit ? 'Click a building to edit' : 'Click a building for details'}
                                    </div>
                                    : null
                            }
                            <Legend slug={cat} />
                            <ThemeSwitcher onSubmit={this.handleSwitchTheme} currentTheme={currentTheme} />
                            <SearchBox onLocate={this.handleLocate} />
                        </Fragment>
                    ) : null
                }
            </div>
        );
    }
}

export default ColouringMap;
