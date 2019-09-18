import { AppState } from '../../reducers';
import { CardsState } from '../../reducers/cardsReducer';
import { connect } from 'react-redux';
import { DeckEditorState } from '../../reducers/deckEditorReducer';
import { deleteDeckAsync, putDeckAsync, setCardsByNameAsync, setEditing, setTitle } from '../../actions/deckEditorActions';
import Title from '../../components/deck-editor/Title';

export interface MappedTitle {
    cardData: CardsState;
    data: DeckEditorState;
    setCardsByName: typeof setCardsByNameAsync.request;
    setTitle: typeof setTitle;
    setEditing: typeof setEditing;
    deleteDeck: typeof deleteDeckAsync.request;
    putDeck: typeof putDeckAsync.request;
}

const mapStateToProps = (state: AppState) => ({
        cardData: state.cards,
        data: state.deckEditor
    });

const mapDispatchToProps = {
    setCardsByName: setCardsByNameAsync.request,
    setTitle,
    setEditing,
    deleteDeck: deleteDeckAsync.request,
    putDeck: putDeckAsync.request
};

export default connect(mapStateToProps, mapDispatchToProps)(Title);
