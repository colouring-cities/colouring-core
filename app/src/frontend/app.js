import React, { Fragment } from 'react';
import { Route, Switch, Link } from 'react-router-dom';

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import AboutPage from './about';
import BuildingEdit from './building-edit';
import BuildingView from './building-view';
import ColouringMap from './map';
import Header from './header';
import Overview from './overview';
import Login from './login';
import MyAccountPage from './my-account';
import SignUp from './signup';
import Welcome from './welcome';


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
        this.state = {
            user: props.user,
            building: props.building,
            building_like: props.building_like
        };
        this.login = this.login.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.logout = this.logout.bind(this);
        this.selectBuilding = this.selectBuilding.bind(this);
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

    selectBuilding(building) {
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
                        <Route exact path="/(edit.*|view.*)?" render={(props) => (
                            <ColouringMap
                                {...props}
                                building={this.state.building}
                                selectBuilding={this.selectBuilding}
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
