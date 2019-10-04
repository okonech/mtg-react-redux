import { connect } from 'react-redux';
import { moveCards } from '../actions/gameCardsActions';
import InfoArea from '../components/InfoArea';

export interface MappedInfoArea {
    moveCards: typeof moveCards;
}

const mapDispatchToProps = {
    moveCards
};

export default connect(null, mapDispatchToProps)(InfoArea);
