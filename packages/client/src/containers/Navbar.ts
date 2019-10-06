import { AppState } from '../reducers';
import { connect } from 'react-redux';
import { logoutAsync } from '../actions/authActions';
import Navbar from '../components/Navbar';

export interface MappedNavBar {
    auth: any;
    logout: typeof logoutAsync.request;
}

const mapStateToProps = (state: AppState) =>
    ({
        auth: state.firebase.auth
    });

const mapDispatchToProps = {
    logout: logoutAsync.request
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
