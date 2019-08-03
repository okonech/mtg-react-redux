import { connect } from 'react-redux';
import CardsView from '../../components/deck-editor/CardsView';
import { AppState } from '../../reducers';

const mapStateToProps = (state: AppState) => {
    return {
        cardData: state.cards,
        cardList: state.deckEditor.cards
    };
};

export default connect(mapStateToProps, null)(CardsView);
