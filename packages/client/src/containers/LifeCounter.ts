import { connect } from 'react-redux';
import { setLife, setPoison } from '../actions/playersActions';
import LifeCounter from '../components/LifeCounter';

export interface MappedLifeCounter {
    setLife: typeof setLife;
    setPoison: typeof setPoison;
}

const mapDispatchToProps = {
    setLife,
    setPoison
};

export default connect(null, mapDispatchToProps)(LifeCounter);
