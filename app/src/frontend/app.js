import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

import AboutPage from './about';
import BetaBanner from './beta-banner';
import Header from './header';
import Login from './login';
import ColouringMap from './map';
import SignUp from './signup';
import Welcome from './welcome';

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './main.css'
import MyAccountPage from './my-account';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { user: props.user };
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    login(user) {
        console.log(user)
        this.setState({user: user});
    }

    logout(user) {
        this.setState({user: undefined});
    }

    render() {
        return (
            <Fragment>
                <BetaBanner />
                <Header user={this.state.user} />
                <main className="beta">
                <Switch>
                    <Route exact path="/" component={Welcome} />
                    <Route exact path="/about.html" component={AboutPage} />
                    <Route exact path="/maps.html" component={ColouringMap} />
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
