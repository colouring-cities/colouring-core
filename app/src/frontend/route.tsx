import React, { Fragment } from 'react'
import { Route, RouteProps, Redirect } from 'react-router-dom';
import { SpinnerIcon } from './components/icons';

import { useAuth } from './auth-context';

export const PrivateRoute: React.FC<RouteProps> = ({component: Component, children, ...rest}) => {
    const { isAuthenticated, isLoading } = useAuth();

    return <Route
        {...rest}
        render={props => {
            if(isAuthenticated) {
                if(Component) {
                    return <Component {...props} />;
                } else if(children) {
                    return <>{children}</>;
                }

            } else {
                if (isLoading) {
                    return <Fragment><SpinnerIcon spin={true} /> Loading user info...</Fragment>
                }
                return <Redirect to={{
                    pathname: "/login.html",
                    state: { from: props.location.pathname }
                }} />;
            }
        }}
    />
};

export const AuthRoute: React.FC<RouteProps> = ({ component: Component, children, ...rest}) => {
    const { isAuthenticated } = useAuth();

    return <Route
        {...rest}
        render={props => {
            if(isAuthenticated) {
                let state = props.location.state as any;
                let from = '/my-account.html';
                if (typeof state == 'object' && 'from' in state){
                    from = state.from;
                }

                return <Redirect to={{pathname: from }} />;
            } else {
                if(Component) {
                    return <Component {...props} />;
                } else if(children) {
                    return <>{children}</>;
                }
            }
        }}
    />
};
