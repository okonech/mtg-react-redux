import { connect } from 'react-redux';
import DeckEditor from '../../components/deck-editor/DeckEditor';
import { AppState } from '../../reducers';

const mapStateToProps = (state: AppState) => {
    return {
        editing: state.deckEditor.editing
    };
};

export default connect(mapStateToProps, null)(DeckEditor);
