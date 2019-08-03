import { connect } from 'react-redux';
import { deleteDeck, setCardsByName, setEditing, setTitle, updateDeck } from '../../actions/deckEditorActions';
import Title from '../../components/deck-editor/Title';
import { AppState } from '../../reducers';

const mapStateToProps = (state: AppState) => {
    return {
        cardData: state.cards,
        data: state.deckEditor
    };
};

const mapDispatchToProps = {
    setCardsByName,
    setTitle,
    setEditing,
    deleteDeck,
    updateDeck
};

export default connect(mapStateToProps, mapDispatchToProps)(Title);
