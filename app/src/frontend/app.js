import React, { Fragment } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import AboutPage from './about';
import BetaBanner from './beta-banner';
import BuildingEdit from './building-edit';
import BuildingView from './building-view';
import ColouringMap from './map';
import Header from './header';
import Legend from './legend';
import Login from './login';
import MyAccountPage from './my-account';
import SignUp from './signup';
import Welcome from './welcome';



class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: props.user,
            building: props.building,
        };
        this.login = this.login.bind(this);
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

    logout() {
        this.setState({user: undefined});
    }

    selectBuilding(building) {
        this.setState({building: building})
    }

    render() {
        return (
            <Fragment>
                <BetaBanner />
                <Header user={this.state.user} />
                <main className="beta">
                    <TransitionGroup>
                        <CSSTransition timeout={3000} classNames='fade'>
                            <Switch>
                                <Route exact path="/">
                                    <Welcome />
                                </Route>
                                <Route exact path="/map/:map.html" component={Legend} />
                                <Route exact path="/building/:building.html" render={(props) => (
                                    <BuildingView
                                        {...props}
                                        {...this.state.building}
                                        user={this.state.user}
                                        />
                                ) } />
                                <Route exact path="/building/:building/edit.html" render={(props) => (
                                    <BuildingEdit
                                        {...props}
                                        {...this.state.building}
                                        user={this.state.user}
                                        selectBuilding={this.selectBuilding}
                                        />
                                ) } />
                            </Switch>
                        </CSSTransition>
                    </TransitionGroup>
                    <Switch>
                        <Route exact path="/(map.*|building.*)?" render={(props) => (
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
                            <MyAccountPage user={this.state.user} logout={this.logout} />
                        </Route>
                        <Route component={NotFound} />
                    </Switch>
                </main>
            </Fragment>
        );
    }
}
const NotFound = () => (
    <article>
        <section className="main-col">
            <h1 className="h1">Page not found</h1>
            <p className="lead">

            We can't find that one anywhere.

            </p>
            <Link className="btn btn-outline-dark" to="/">Back home</Link>
        </section>
    </article>
);

export default App;
