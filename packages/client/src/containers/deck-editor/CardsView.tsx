import { AppState } from '../../reducers';
import { connect } from 'react-redux';
import CardsView from '../../components/deck-editor/CardsView';

const mapStateToProps = (state: AppState) => ({
        cardData: state.cards,
        cardList: state.deckEditor.cards
    });

export default connect(mapStateToProps, null)(CardsView);
