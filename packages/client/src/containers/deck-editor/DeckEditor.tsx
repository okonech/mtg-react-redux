import { AppState } from '../../reducers';
import { connect } from 'react-redux';
import DeckEditor from '../../components/deck-editor/DeckEditor';

const mapStateToProps = (state: AppState) =>
    ({
        editing: state.deckEditor.editing,
        loading: state.isLoading
    });

export default connect(mapStateToProps, null)(DeckEditor);
