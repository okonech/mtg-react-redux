import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import { AppState } from '../reducers';
import { AuthState } from '../reducers/authReducer';

interface PrivateRouteProps extends RouteProps {
    auth: any;
    authState: AuthState;
}

const PrivateRoute: React.FC<PrivateRouteProps> = (props) => {
    const { auth, authState, path, ...rest } = props;

    if (authState.authLoading && !auth.uid && !authState.authError) {
        return (<LoadingSpinner />);
    }

    if (!auth.uid) {
        return (
            <Redirect
                to={{
                    pathname: '/login',
                    state: {
                        prevLocation: path
                    }
                }}
            />
        );
    }

    return (
        <Route
            path={path}
            {...rest}
        />
    );
};

const mapStateToProps = (state: AppState) => {
    return {
        auth: state.firebase.auth,
        authState: state.auth
    };
};

export default connect(mapStateToProps, {})(PrivateRoute);
