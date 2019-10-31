import React, { Fragment } from 'react';
import { Switch, Route, RouteComponentProps, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import Welcome from './pages/welcome';
import Sidebar from './building/sidebar';
import Categories from './building/categories';
import MultiEdit from './building/multi-edit';
import BuildingView from './building/building-view';
import ColouringMap from './map/map';
import { parse } from 'query-string';
import { EditHistory } from './building/edit-history/edit-history';
import { Building } from './models/building';

interface MapAppRouteParams {
    mode: 'view' | 'edit' | 'multi-edit';
    category: string;
    building?: string;
}

interface MapAppProps extends RouteComponentProps<MapAppRouteParams> {
    building: Building;
    building_like: boolean;
    user: any;
    revisionId: number;
}

interface MapAppState {
    category: string;
    revision_id: number;
    building: Building;
    building_like: boolean;
}

class MapApp extends React.Component<MapAppProps, MapAppState> {
    static propTypes = {
        category: PropTypes.string,
        revision_id: PropTypes.number,
        building: PropTypes.object,
        building_like: PropTypes.bool,
        user: PropTypes.object
    };
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
    }

    async fetchLatestRevision() {
        try {
            const res = await fetch(`/api/buildings/revision`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'same-origin'
            });
            const data = await res.json();
            
            this.increaseRevision(data.latestRevisionId);
        } catch(error) {
            console.error(error);
        }
    }

    getCategory(category: string) {
        if (category === 'categories') return undefined;

        return category;
    }

    increaseRevision(revisionId) {
        revisionId = +revisionId;
        // bump revision id, only ever increasing
        if (revisionId > this.state.revision_id) {
            this.setState({ revision_id: revisionId })
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
        fetch(`/api/buildings/${building.building_id}/uprns.json`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin'
        }).then(
            res => res.json()
        ).then((res) => {
            if (res.error) {
                console.error(res);
            } else {
                building.uprns = res.uprns;
                this.setState({ building: building });
            }
        }).catch((err) => {
            console.error(err)
            this.setState({ building: building });
        });

        // get if liked and update
        fetch(`/api/buildings/${building.building_id}/like.json`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin'
        }).then(
            res => res.json()
        ).then((res) => {
            if (res.error) {
                console.error(res);
            } else {
                this.setState({ building_like: res.like });
                this.props.history.push(`/${mode}/${category}/${building.building_id}`);
            }
        }).catch((err) => {
            console.error(err)
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
     * @param {object} building
     */
    colourBuilding(building) {
        const cat = this.props.match.params.category;
        const q = parse(window.location.search);

        if (cat === 'like') {
            this.likeBuilding(building.building_id)
        } else {
            try {
                // TODO: verify what happens if data is string[]
                const data = JSON.parse(q.data as string);
                this.updateBuilding(building.building_id, data)
            } catch (error) {
                console.error(error, q)
            }
        }
    }

    likeBuilding(buildingId) {
        fetch(`/api/buildings/${buildingId}/like.json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin',
            body: JSON.stringify({ like: true })
        }).then(
            res => res.json()
        ).then(function (res) {
            if (res.error) {
                console.error({ error: res.error })
            } else {
                this.increaseRevision(res.revision_id);
            }
        }.bind(this)).catch(
            (err) => console.error({ error: err })
        );
    }

    updateBuilding(buildingId, data) {
        fetch(`/api/buildings/${buildingId}.json`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin'
        }).then(
            res => res.json()
        ).then(res => {
            if (res.error) {
                console.error({ error: res.error })
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
                            <Categories mode={mode} building_id={building_id} />
                        </Sidebar>
                    </Route>
                    <Route exact path="/multi-edit/:cat" render={(props) => (
                        <MultiEdit
                            {...props}
                            user={this.props.user}
                        />
                    )} />
                    <Route exact path="/:mode/:cat/:building?">
                        <Sidebar>
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
