import { parse as parseQuery } from 'query-string';
import React, { Fragment } from 'react';
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';

import { parseJsonOrDefault } from '../helpers';
import { strictParseInt } from '../parse';

import { apiGet, apiPost } from './apiHelpers';
import BuildingView from './building/building-view';
import Categories from './building/categories';
import { EditHistory } from './building/edit-history/edit-history';
import MultiEdit from './building/multi-edit';
import Sidebar from './building/sidebar';
import ColouringMap from './map/map';
import { Building } from './models/building';
import Welcome from './pages/welcome';

interface MapAppRouteParams {
    mode: 'view' | 'edit' | 'multi-edit';
    category: string;
    building?: string;
}

interface MapAppProps extends RouteComponentProps<MapAppRouteParams> {
    building?: Building;
    building_like?: boolean;
    user?: any;
    revisionId?: number;
}

interface MapAppState {
    category: string;
    revision_id: number;
    building: Building;
    building_like: boolean;
}

class MapApp extends React.Component<MapAppProps, MapAppState> {
    constructor(props: Readonly<MapAppProps>) {
        super(props);

        this.state = {
            category: this.getCategory(props.match.params.category),
            revision_id: props.revisionId || 0,
            building: props.building,
            building_like: props.building_like
        };

        this.selectBuilding = this.selectBuilding.bind(this);
        this.colourBuilding = this.colourBuilding.bind(this);
        this.increaseRevision = this.increaseRevision.bind(this);
    }

    componentWillReceiveProps(props: Readonly<MapAppProps>) {
        const newCategory = this.getCategory(props.match.params.category);
        if (newCategory != undefined) {
            this.setState({ category: newCategory });
        }
    }

    componentDidMount() {
        this.fetchLatestRevision();
        this.fetchBuildingData();
    }

    async fetchLatestRevision() {
        try {
            const {latestRevisionId} = await apiGet(`/api/buildings/revision`);

            this.increaseRevision(latestRevisionId);
        } catch(error) {
            console.error(error);
        }
    }

    /**
     * Fetches building data if a building is selected but no data provided through
     * props (from server-side rendering)
     */
    async fetchBuildingData() {
        if(this.props.match.params.building != undefined && this.props.building == undefined) {
            try {
                // TODO: simplify API calls, create helpers for fetching data
                const buildingId = strictParseInt(this.props.match.params.building);
                let [building, building_uprns, building_like] = await Promise.all([
                    apiGet(`/api/buildings/${buildingId}.json`),
                    apiGet(`/api/buildings/${buildingId}/uprns.json`),
                    apiGet(`/api/buildings/${buildingId}/like.json`)
                ]);

                building.uprns = building_uprns.uprns;

                this.setState({
                    building: building,
                    building_like: building_like.like
                });
            } catch(error) {
                console.error(error);
                // TODO: add UI for API errors
            }
        }
    }

    getCategory(category: string) {
        if (category === 'categories') return undefined;

        return category;
    }

    getMultiEditDataString(): string {
        const q = parseQuery(this.props.location.search);
        if(Array.isArray(q.data)) {
            throw new Error('Invalid format');
        } else return q.data;
    }

    increaseRevision(revisionId) {
        revisionId = +revisionId;
        // bump revision id, only ever increasing
        if (revisionId > this.state.revision_id) {
            this.setState({ revision_id: revisionId });
        }
    }

    selectBuilding(building: Building) {
        const mode = this.props.match.params.mode || 'view';
        const category = this.props.match.params.category || 'age';

        if (building == undefined) {
            this.setState({ building: undefined });
            this.props.history.push(`/${mode}/${category}`);
            return;
        }

        this.increaseRevision(building.revision_id);
        // get UPRNs and update
        apiGet(`/api/buildings/${building.building_id}/uprns.json`)
        .then((res) => {
            if (res.error) {
                console.error(res);
            } else {
                building.uprns = res.uprns;
                this.setState({ building: building });
            }
        }).catch((err) => {
            console.error(err);
            this.setState({ building: building });
        });

        // get if liked and update
        apiGet(`/api/buildings/${building.building_id}/like.json`)
        .then((res) => {
            if (res.error) {
                console.error(res);
            } else {
                this.setState({ building_like: res.like });
                this.props.history.push(`/${mode}/${category}/${building.building_id}`);
            }
        }).catch((err) => {
            console.error(err);
            this.setState({ building_like: false });
        });
    }

    /**
     * Colour building
     *
     * Used in multi-edit mode to colour buildings on map click
     *
     * Pulls data from URL to form update
     *
     * @param {Building} building
     */
    colourBuilding(building: Building) {
        const cat = this.props.match.params.category;

        if (cat === 'like') {
            this.likeBuilding(building.building_id);
        } else {
            const data = parseJsonOrDefault(this.getMultiEditDataString());


            if (data != undefined && !Object.values(data).some(x => x == undefined)) {
                this.updateBuilding(building.building_id, data);
            }
        }
    }

    likeBuilding(buildingId) {
        apiPost(`/api/buildings/${buildingId}/like.json`, { like: true })
        .then(res => {
            if (res.error) {
                console.error({ error: res.error });
            } else {
                this.increaseRevision(res.revision_id);
            }
        }).catch(
            (err) => console.error({ error: err })
        );
    }

    updateBuilding(buildingId, data) {
        apiPost(`/api/buildings/${buildingId}.json`, data)
        .then(res => {
            if (res.error) {
                console.error({ error: res.error });
            } else {
                this.increaseRevision(res.revision_id);
            }
        }).catch(
            (err) => console.error({ error: err })
        );
    }

    render() {
        const mode = this.props.match.params.mode;
        const viewEditMode = mode === 'multi-edit' ? undefined : mode;

        let category = this.state.category || 'age';

        const building_id = this.state.building && this.state.building.building_id;

        return (
            <Fragment>
                <Switch>
                    <Route exact path="/">
                        <Welcome />
                    </Route>
                    <Route exact path="/:mode/categories/:building?">
                        <Sidebar>
                            <Categories mode={mode || 'view'} building_id={building_id} />
                        </Sidebar>
                    </Route>
                    <Route exact path="/multi-edit/:cat" render={(props) => (
                        <MultiEdit
                            category={category}
                            dataString={this.getMultiEditDataString()}
                            user={this.props.user}
                        />
                    )} />
                    <Route exact path="/:mode/:cat/:building?">
                        <Sidebar>
                            <Categories mode={mode || 'view'} building_id={building_id} />
                            <BuildingView
                                mode={viewEditMode}
                                cat={category}
                                building={this.state.building}
                                building_like={this.state.building_like}
                                selectBuilding={this.selectBuilding}
                                user={this.props.user}
                            />
                        </Sidebar>
                    </Route>
                    <Route exact path="/:mode/:cat/:building/history">
                        <Sidebar>
                            <Categories mode={mode || 'view'} building_id={building_id} />
                            <EditHistory building={this.state.building} />
                        </Sidebar>
                    </Route>
                    <Route exact path="/:mode(view|edit|multi-edit)"
                        render={props => (<Redirect to={`/${props.match.params.mode}/categories`} />)}
                    />
                </Switch>
                <ColouringMap
                    building={this.state.building}
                    mode={mode || 'basic'}
                    category={category}
                    revision_id={this.state.revision_id}
                    selectBuilding={this.selectBuilding}
                    colourBuilding={this.colourBuilding}
                />
            </Fragment>
        );
    }
}

export default MapApp;
