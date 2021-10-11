import React from 'react';
import { Route, Switch } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { AuthRoute, PrivateRoute } from './route';
import { AuthProvider } from './auth-context';
import { Header } from './header';
import { MapApp } from './map-app';
import { Building, UserVerified } from './models/building';
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
import { Login } from './user/login';
import { MyAccountPage } from './user/my-account';
import PasswordReset from './user/password-reset';
import { SignUp } from './user/signup';
import { NotFound } from './pages/not-found';


interface AppProps {
    user?: User;
    building?: Building;
    user_verified?: UserVerified;
    revisionId: string;
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

export const App: React.FC<AppProps> = props => {
    const mapAppPaths = ['/', '/:mode(view|edit|multi-edit)/:category/:building(\\d+)?/(history)?'];

    return (
        <AuthProvider preloadedUser={props.user}>
            <Switch>
                <Route exact path={mapAppPaths}>
                    <Header animateLogo={false} />
                </Route>
                <Route>
                    <Header animateLogo={true} />
                </Route>
            </Switch>
            <Switch>
                <Route exact path="/about.html" component={AboutPage} />
                <AuthRoute exact path="/login.html" component={Login} />
                <AuthRoute exact path="/forgotten-password.html" component={ForgottenPassword} />
                <AuthRoute exact path="/password-reset.html" component={PasswordReset} />
                <AuthRoute exact path="/sign-up.html" component={SignUp} />
                <PrivateRoute exact path="/my-account.html" component={MyAccountPage} />
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
                <Route exact path={mapAppPaths} >
                    <MapApp
                        building={props.building}
                        user_verified={props.user_verified}
                        revisionId={props.revisionId}
                    />
                </Route>
                <Route component={NotFound} />
            </Switch>
        </AuthProvider>
    );
};
