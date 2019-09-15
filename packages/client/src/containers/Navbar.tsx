import { connect } from 'react-redux';
import { logoutAsync } from '../actions/authActions';
import Navbar from '../components/Navbar';
import { AppState } from '../reducers';

export interface MappedNavBar {
    auth: any;
    logout: typeof logoutAsync.request;
}

const mapStateToProps = (state: AppState) => {
    return {
        auth: state.firebase.auth
    };
};

const mapDispatchToProps = {
    logout: logoutAsync.request
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
