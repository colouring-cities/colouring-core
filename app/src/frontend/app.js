import React, { Fragment } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { parse } from 'query-string';

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import AboutPage from './about';
import BuildingEdit from './building-edit';
import BuildingView from './building-view';
import MultiEdit from './multi-edit';
import ColouringMap from './map';
import Header from './header';
import Overview from './overview';
import Login from './login';
import MyAccountPage from './my-account';
import SignUp from './signup';
import Welcome from './welcome';
import { parseCategoryURL } from '../parse';

/**
 * App component
 *
 * This is the top-level stateful frontend component
 * - rendered from props, instantiated either server-side in server.js or client-side in
 *   client.js
 * - state (including user, current building) is initialised from props
 * - callbacks to update top-level state are passed down to subcomponents
 * - render method wraps a react-router switch - this drives which version of the sidebar and
 *   map or other pages are rendered, based on the URL. Use a react-router-dom <Link /> in
 *   child components to navigate without a full page reload.
 */
class App extends React.Component {
    constructor(props) {
        super(props);
        // set building revision id, default 0
        const rev = (props.building)? props.building.revision_id : 0;
        this.state = {
            user: props.user,
            building: props.building,
            building_like: props.building_like,
            revision_id: rev
        };
        this.login = this.login.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.logout = this.logout.bind(this);
        this.selectBuilding = this.selectBuilding.bind(this);
        this.colourBuilding = this.colourBuilding.bind(this);
        this.increaseRevision = this.increaseRevision.bind(this);
    }

    login(user) {
        if (user.error) {
            this.logout();
            return
        }
        this.setState({user: user});
    }

    updateUser(user){
        this.setState({user: { ...this.state.user, ...user }});
    }

    logout() {
        this.setState({user: undefined});
    }

    increaseRevision(revision_id) {
        // bump revision id, only ever increasing
        if (revision_id > this.state.revision_id){
            this.setState({revision_id: revision_id})
        }
    }

    selectBuilding(building) {
        this.increaseRevision(building.revision_id);
        // get UPRNs and update
        fetch(`/building/${building.building_id}/uprns.json`, {
            method: 'GET',
            headers:{
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
                this.setState({building: building});
            }
        }).catch((err) => {
            console.error(err)
            this.setState({building: building});
        });

        // get if liked and update
        fetch(`/building/${building.building_id}/like.json`, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin'
        }).then(
            res => res.json()
        ).then((res) => {
            if (res.error) {
                console.error(res);
            } else {
                this.setState({building_like: res.like});
            }
        }).catch((err) => {
            console.error(err)
            this.setState({building_like: false});
        });
    }

    colourBuilding(building) {
        const cat = parseCategoryURL(window.location.pathname);
        const q = parse(window.location.search);
        let data;
        if (cat === 'like'){
            data = {like: true}
            this.likeBuilding(building.building_id)
        } else {
            data = {}
            data[q.k] = q.v;
            this.updateBuilding(building.building_id, data)
        }
    }

    likeBuilding(building_id) {
        fetch(`/building/${building_id}/like.json`, {
            method: 'POST',
            headers:{
              'Content-Type': 'application/json'
            },
            credentials: 'same-origin',
            body: JSON.stringify({like: true})
        }).then(
            res => res.json()
        ).then(function(res){
            if (res.error) {
                console.error({error: res.error})
            } else {
                this.increaseRevision(res.revision_id);
            }
        }.bind(this)).catch(
            (err) => console.error({error: err})
        );
    }

    updateBuilding(building_id, data){
        fetch(`/building/${building_id}.json`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
              'Content-Type': 'application/json'
            },
            credentials: 'same-origin'
        }).then(
            res => res.json()
        ).then(res => {
            if (res.error) {
                console.error({error: res.error})
            } else {
                this.increaseRevision(res.revision_id);
            }
        }).catch(
            (err) => console.error({error: err})
        );
    }

    render() {
        return (
            <Fragment>
                <Header user={this.state.user} />
                <main>
                    <Switch>
                        <Route exact path="/">
                            <Welcome />
                        </Route>
                        <Route exact path="/view/:cat.html" render={(props) => (
                            <Overview
                                {...props}
                                mode='view' user={this.state.user}
                            />
                        ) } />
                        <Route exact path="/edit/:cat.html" render={(props) => (
                            <Overview
                                {...props}
                                mode='edit' user={this.state.user}
                            />
                        ) } />
                        <Route exact path="/multi-edit/:cat.html" render={(props) => (
                            <MultiEdit
                                {...props}
                                user={this.state.user}
                                />
                        ) } />
                        <Route exact path="/view/:cat/building/:building.html" render={(props) => (
                            <BuildingView
                                {...props}
                                {...this.state.building}
                                user={this.state.user}
                                building_like={this.state.building_like}
                            />
                        ) } />
                        <Route exact path="/edit/:cat/building/:building.html" render={(props) => (
                            <BuildingEdit
                                {...props}
                                {...this.state.building}
                                user={this.state.user}
                                building_like={this.state.building_like}
                                selectBuilding={this.selectBuilding}
                            />
                        ) } />
                    </Switch>
                    <Switch>
                        <Route exact path="/(multi-edit.*|edit.*|view.*)?" render={(props) => (
                            <ColouringMap
                                {...props}
                                building={this.state.building}
                                revision_id={this.state.revision_id}
                                selectBuilding={this.selectBuilding}
                                colourBuilding={this.colourBuilding}
                            />
                        ) } />
                        <Route exact path="/about.html" component={AboutPage} />
                        <Route exact path="/login.html">
                            <Login user={this.state.user} login={this.login} />
                        </Route>
                        <Route exact path="/sign-up.html">
                            <SignUp user={this.state.user} login={this.login} />
                        </Route>
                        <Route exact path="/my-account.html">
                            <MyAccountPage
                                user={this.state.user}
                                updateUser={this.updateUser}
                                logout={this.logout}
                            />
                        </Route>
                        <Route component={NotFound} />
                    </Switch>
                </main>
            </Fragment>
        );
    }
}

App.propTypes = {
    user: PropTypes.object,
    building: PropTypes.object,
    building_like: PropTypes.bool
}

/**
 * Component to fall back on in case of 404 or no other match
 */
const NotFound = () => (
    <article>
        <section className="main-col">
            <h1 className="h1">Page not found</h1>
            <p className="lead">

            We can&rsquo;t find that one anywhere.

            </p>
            <Link className="btn btn-outline-dark" to="/">Back home</Link>
        </section>
    </article>
);

export default App;
