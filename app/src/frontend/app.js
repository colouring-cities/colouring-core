import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

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

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './main.css'


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
        this.setState({user: user});
    }

    logout() {
        this.setState({user: undefined});
    }

    selectBuilding(building) {
        console.log(building)
        this.setState({building: building})
    }

    render() {
        return (
            <Fragment>
                <BetaBanner />
                <Header user={this.state.user} />
                <main className="beta">
                    <Switch>
                        <Route path="/(map|building)?(/\w+)?(.html)?" render={props => (
                            <Fragment>
                                <Switch>
                                    <Route exact path="/">
                                        <Welcome />
                                    </Route>
                                    <Route exact path="/map/:map.html" component={Legend} />
                                    <Route exact path="/building/:building.html">
                                        <BuildingView {...this.state.building} />
                                    </Route>
                                    <Route exact path="/building/:building/edit.html">
                                        <BuildingEdit {...this.state.building} />
                                    </Route>
                                </Switch>
                                <ColouringMap {...props}
                                              building={this.state.building}
                                              selectBuilding={this.selectBuilding} />
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
            <h1>Not found&hellip;</h1>
        </section>
    </article>
);

export default App;
