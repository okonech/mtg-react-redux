import { AppState } from '../reducers';
import { AuthState } from '../reducers/authReducer';
import { connect } from 'react-redux';
import { isEmpty, isLoaded } from 'react-redux-firebase';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import React from 'react';

interface PrivateRouteProps extends RouteProps {
    auth: any;
    authState: AuthState;
}

const PrivateRoute: React.FC<PrivateRouteProps> = (props) => {
    const { auth, authState, path, ...rest } = props;

    if (!isLoaded(auth)) {
        return (<LoadingSpinner />);
    }

    if (isEmpty(auth)) {
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

const mapStateToProps = (state: AppState) =>
    ({
        auth: state.firebase.auth,
        authState: state.auth
    });

export default connect(mapStateToProps, {})(PrivateRoute);
