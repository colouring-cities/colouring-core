import { LatLngExpression } from 'leaflet';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { Map, TileLayer, ZoomControl, AttributionControl } from 'react-leaflet-universal';

import '../../../node_modules/leaflet/dist/leaflet.css'
import './map.css'

import { HelpIcon } from '../components/icons';
import Legend from './legend';
import { parseCategoryURL } from '../../parse';
import SearchBox from './search-box';
import ThemeSwitcher from './theme-switcher';

const OS_API_KEY = 'NVUxtY5r8eA6eIfwrPTAGKrAAsoeI9E9';

interface ColouringMapProps {
    building: any;
    mode: 'basic' | 'view' | 'edit' | 'multi-edit';
    category: string;
    revision_id: number;
    selectBuilding: any;
    colourBuilding: any;
}

interface ColouringMapState {
    theme: 'light' | 'night';
    lat: number;
    lng: number;
    zoom: number;
}
/**
 * Map area
 */
class ColouringMap extends Component<ColouringMapProps, ColouringMapState> { // TODO: add proper types
    static propTypes = { // TODO: generate propTypes from TS
        building: PropTypes.object,
        mode: PropTypes.string,
        category: PropTypes.string,
        revision_id: PropTypes.number,
        selectBuilding: PropTypes.func,
        colourBuilding: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            theme: 'night',
            lat: 51.5245255,
            lng: -0.1338422,
            zoom: 16
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
        const mode = this.props.mode;
        const lat = e.latlng.lat;
        const lng = e.latlng.lng;
        fetch(
            '/api/buildings/locate?lat='+lat+'&lng='+lng
        ).then(
            (res) => res.json()
        ).then(function(data){
            if (data && data.length){
                const building = data[0];
                if (mode === 'multi-edit') {
                    // colour building directly
                    this.props.colourBuilding(building);
                } else {
                    this.props.selectBuilding(building);
                }
            } else {
                // deselect but keep/return to expected colour theme
                this.props.selectBuilding(undefined);
            }
        }.bind(this)).catch(
            (err) => console.error(err)
        )
    }

    themeSwitch(e) {
        e.preventDefault();
        const newTheme = (this.state.theme === 'light')? 'night' : 'light';
        this.setState({theme: newTheme});
    }

    render() {
        const position: LatLngExpression = [this.state.lat, this.state.lng];

        // baselayer
        const key = OS_API_KEY;
        const tilematrixSet = 'EPSG:3857';
        const layer = (this.state.theme === 'light')? 'Light 3857' : 'Night 3857';
        const baseUrl = `https://api2.ordnancesurvey.co.uk/mapping_api/v1/service/zxy/${tilematrixSet}/${layer}/{z}/{x}/{y}.png?key=${key}`;
        const attribution = 'Building attribute data is © Colouring London contributors. Maps contain OS data © Crown copyright: OS Maps baselayers and building outlines.';
        const baseLayer = <TileLayer 
            url={baseUrl}
            attribution={attribution}
        />;

        const buildingsBaseUrl = `/tiles/base_${this.state.theme}/{z}/{x}/{y}.png`;
        const buildingBaseLayer = <TileLayer url={buildingsBaseUrl} minZoom={14} />;

        // colour-data tiles
        const cat = this.props.category;
        const tilesetByCat = {
            age: 'date_year',
            size: 'size_storeys',
            location: 'location',
            like: 'likes',
            planning: 'conservation_area',
        };
        const tileset = tilesetByCat[cat];
        // pick revision id to bust browser cache
        const rev = this.props.revision_id;
        const dataLayer = tileset != undefined ?
            <TileLayer
                key={tileset}
                url={`/tiles/${tileset}/{z}/{x}/{y}.png?rev=${rev}`}
                minZoom={9}
            />
            : null;

        // highlight
        const highlightLayer = this.props.building != undefined ?
            <TileLayer
                key={this.props.building.building_id}
                url={`/tiles/highlight/{z}/{x}/{y}.png?highlight=${this.props.building.geometry_id}`}
                minZoom={14} 
            />
            : null;

        const isEdit = ['edit', 'multi-edit'].includes(this.props.mode);

        return (
            <div className="map-container">
                <Map
                    center={position}
                    zoom={this.state.zoom}
                    minZoom={9}
                    maxZoom={18}
                    doubleClickZoom={false}
                    zoomControl={false}
                    attributionControl={false}
                    onClick={this.handleClick}
                >
                    { baseLayer }
                    { buildingBaseLayer }
                    { dataLayer }
                    { highlightLayer }
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
                            <ThemeSwitcher onSubmit={this.themeSwitch} currentTheme={this.state.theme} />
                            <SearchBox onLocate={this.handleLocate} />
                        </Fragment>
                    ) : null
                }
            </div>
        );
    }
}

export default ColouringMap;
