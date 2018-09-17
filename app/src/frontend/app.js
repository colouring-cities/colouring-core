import React, { Fragment } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './main.css';

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
        console.log("Logging in")
        console.log(user)
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
                    <Switch>
                        <Route path="/(map|building)?(/\w+)?(.html)?" render={(props) => (
                            <Fragment>
                                <TransitionGroup>
                                    <CSSTransition timeout={3000} classNames='fade' key={props.location.key}>
                                        <Switch location={props.location}>
                                            <Route exact path="/">
                                                <Welcome />
                                            </Route>
                                            <Route exact path="/map/:map.html" component={Legend} />
                                            <Route exact path="/building/:building.html">
                                                <BuildingView
                                                    {...this.state.building}
                                                    user={this.state.user}
                                                    selectBuilding={this.selectBuilding}
                                                    />
                                            </Route>
                                            <Route exact path="/building/:building/edit.html">
                                                <BuildingEdit
                                                    {...this.state.building}
                                                    {...props} // includes route history/match
                                                    user={this.state.user}
                                                    selectBuilding={this.selectBuilding}
                                                    />
                                            </Route>
                                        </Switch>
                                    </CSSTransition>
                                </TransitionGroup>
                                <ColouringMap
                                    {...props}
                                    building={this.state.building}
                                    selectBuilding={this.selectBuilding}
                                    />
                            </Fragment>
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
            <h1 class="h1">Page not found</h1>
            <p className="lead">

            We can't find that one anywhere.

            </p>
            <Link className="btn btn-outline-dark" to="/">Back home</Link>
        </section>
    </article>
);

export default App;
