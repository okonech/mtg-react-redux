import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {
    addCardByName as deckEditorAddCardByName,
    deleteCards as deckEditorDeleteCards,
    updateCards as deckEditorUpdateCards
} from '../../actions/deckEditorActions';
import Table from '../../components/deck-editor/Table';
import { AppState } from '../../reducers';
import { DeckEditorRow } from '../../reducers/deckEditorReducer';

const mapStateToProps = (state: AppState) => {
    return {
        cardList: state.deckEditor.cards,
        cardData: state.cards,
        editing: state.deckEditor.editing
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        addCardByName: (name: string) => dispatch(deckEditorAddCardByName(name)),
        deleteCards: (ids: string[]) => dispatch(deckEditorDeleteCards(ids)),
        updateCards: (rows: DeckEditorRow[]) => dispatch(deckEditorUpdateCards(rows))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
