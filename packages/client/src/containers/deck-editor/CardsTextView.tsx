import { connect } from 'react-redux';
import CardsTextView from '../../components/deck-editor/CardsTextView';
import { AppState } from '../../reducers';

const mapStateToProps = (state: AppState) => {
    return {
        cardData: state.cards,
        cardList: state.deckEditor.cards
    };
};

export default connect(mapStateToProps, null)(CardsTextView);
