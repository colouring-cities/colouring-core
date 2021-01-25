import React, { Fragment } from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { Header } from './header';
import MapApp from './map-app';
import { Building } from './models/building';
import { User } from './models/user';
import AboutPage from './pages/about';
import ChangesPage from './pages/changes';
import CodeOfConductPage from './pages/code-of-conduct';
import ContactPage from './pages/contact';
import ContributorAgreementPage from './pages/contributor-agreement';
import DataAccuracyPage from './pages/data-accuracy';
import DataExtracts from './pages/data-extracts';
import LeaderboardPage from './pages/leaderboard';
import OrdnanceSurveyLicencePage from './pages/ordnance-survey-licence';
import OrdnanceSurveyUprnPage from './pages/ordnance-survey-uprn';
import PrivacyPolicyPage from './pages/privacy-policy';
import ForgottenPassword from './user/forgotten-password';
import Login from './user/login';
import MyAccountPage from './user/my-account';
import PasswordReset from './user/password-reset';
import SignUp from './user/signup';


interface AppProps {
    user?: User;
    building?: Building;
    building_like?: boolean;
    user_verified?: object;
    revisionId: number;
}

interface AppState {
    user?: User;
}

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
class App extends React.Component<AppProps, AppState> {
    static mapAppPaths = ['/', '/:mode(view|edit|multi-edit)/:category/:building(\\d+)?/(history)?'];

    constructor(props: Readonly<AppProps>) {
        super(props);

        this.state = {
            user: props.user
        };
        this.login = this.login.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.logout = this.logout.bind(this);
    }

    login(user) {
        if (user.error) {
            this.logout();
            return;
        }
        this.setState({user: user});
    }

    updateUser(user){
        this.setState({user: { ...this.state.user, ...user }});
    }

    logout() {
        this.setState({user: undefined});
    }

    render() {
        return (
            <Fragment>
            <Switch>
                <Route exact path={App.mapAppPaths}>
                    <Header user={this.state.user} animateLogo={false} />
                </Route>
                <Route>
                    <Header user={this.state.user} animateLogo={true} />
                </Route>
            </Switch>
            <Switch>
                <Route exact path="/about.html" component={AboutPage} />
                <Route exact path="/login.html">
                    <Login user={this.state.user} login={this.login} />
                </Route>
                <Route exact path="/forgotten-password.html" component={ForgottenPassword} />
                <Route exact path="/password-reset.html" component={PasswordReset} />
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
                <Route exact path="/privacy-policy.html" component={PrivacyPolicyPage} />
                <Route exact path="/contributor-agreement.html" component={ContributorAgreementPage} />
                <Route exact path="/ordnance-survey-licence.html" component={OrdnanceSurveyLicencePage} />
                <Route exact path="/ordnance-survey-uprn.html" component={OrdnanceSurveyUprnPage} />
                <Route exact path="/data-accuracy.html" component={DataAccuracyPage} />
                <Route exact path="/data-extracts.html" component={DataExtracts} />
                <Route exact path="/contact.html" component={ContactPage} />
                <Route exact path="/code-of-conduct.html" component={CodeOfConductPage} />
                <Route exact path="/leaderboard.html" component={LeaderboardPage} />
                <Route exact path="/history.html" component={ChangesPage} />
                <Route exact path={App.mapAppPaths} render={(props) => (
                    <MapApp
                        {...props}
                        building={this.props.building}
                        building_like={this.props.building_like}
                        user_verified={this.props.user_verified}
                        user={this.state.user}
                        revisionId={this.props.revisionId}
                    />
                )} />
                <Route component={NotFound} />
            </Switch>
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
