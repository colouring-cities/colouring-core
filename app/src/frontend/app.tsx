import React, { Fragment } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import Header from './header';
import AboutPage from './pages/about';
import ContributorAgreementPage from './pages/contributor-agreement';
import PrivacyPolicyPage from './pages/privacy-policy';
import DataExtracts from './pages/data-extracts';

import Login from './user/login';
import MyAccountPage from './user/my-account';
import SignUp from './user/signup';
import ForgottenPassword from './user/forgotten-password';
import PasswordReset from './user/password-reset';

import MapApp from './map-app';
import ContactPage from './pages/contact';
import DataAccuracyPage from './pages/data-accuracy';
import OrdnanceSurveyLicencePage from './pages/ordnance-survey-licence';
import OrdnanceSurveyUprnPage from './pages/ordnance-survey-uprn';


interface AppProps {
    user?: any;
    building?: any;
    building_like?: boolean;
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
class App extends React.Component<AppProps, any> { // TODO: add proper types
    static propTypes = { // TODO: generate propTypes from TS
        user: PropTypes.object,
        building: PropTypes.object,
        building_like: PropTypes.bool
    };

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
            <Header user={this.state.user} />
            <main>
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
                <Route exact path={["/", "/:mode(view|edit|multi-edit)/:category?/:building(\\d+)?"]} render={(props) => (
                    <MapApp
                        {...props}
                        building={this.props.building}
                        building_like={this.props.building_like}
                        user={this.state.user}
                    />
                )} />
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
