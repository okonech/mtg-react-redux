import { AppState } from '../../reducers';
import { connect } from 'react-redux';
import CardsTextView from '../../components/deck-editor/CardsTextView';

const mapStateToProps = (state: AppState) => ({
        cardData: state.cards,
        cardList: state.deckEditor.cards
    });

export default connect(mapStateToProps, null)(CardsTextView);
