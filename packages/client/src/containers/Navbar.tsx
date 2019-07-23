import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { logout } from '../actions/authActions';
import Navbar from '../components/Navbar';
import { AppState } from '../reducers';

const mapStateToProps = (state: AppState) => {
    return {
        auth: state.firebase.auth
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        logOut: () => dispatch(logout())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
