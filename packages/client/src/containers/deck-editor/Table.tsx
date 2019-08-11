import { connect } from 'react-redux';
import { addCardByNameAsync, removeCards, updateCards } from '../../actions/deckEditorActions';
import Table from '../../components/deck-editor/Table';
import { AppState } from '../../reducers';
import { CardsState } from '../../reducers/cardsReducer';
import { DeckEditorState } from '../../reducers/deckEditorReducer';

const mapStateToProps = (state: AppState) => {
    return {
        cardList: state.deckEditor.cards,
        cardData: state.cards,
        editing: state.deckEditor.editing
    };
};

export interface MappedTable {
    cardList: DeckEditorState['cards'];
    cardData: CardsState;
    editing: DeckEditorState['editing'];
    addCardByName: typeof addCardByNameAsync.request;
    removeCards: typeof removeCards;
    updateCards: typeof updateCards;
}

const mapDispatchToProps = {
    addCardByName: addCardByNameAsync.request,
    removeCards,
    updateCards
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
