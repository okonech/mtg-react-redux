import { connect } from 'react-redux';
import DeckEditor from '../../components/deck-editor/DeckEditor';
import { AppState } from '../../reducers';

const mapStateToProps = (state: AppState) =>
    ({
        editing: state.deckEditor.editing,
        loading: state.isLoading
    });

export default connect(mapStateToProps, null)(DeckEditor);
