import { connect } from 'react-redux';
import { moveCardsFixCoords } from '../actions/gameCardsActions';
import InfoArea from '../components/InfoArea';

export interface MappedInfoArea {
    moveCardsFixCoords: typeof moveCardsFixCoords;
}

const mapDispatchToProps = {
    moveCardsFixCoords
};

export default connect(null, mapDispatchToProps)(InfoArea);
