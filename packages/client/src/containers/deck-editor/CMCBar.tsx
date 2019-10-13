import { AppState } from '../../reducers';
import { connect } from 'react-redux';
import CMCBar from '../../components/deck-editor/CMCBar';

const mapStateToProps = (state: AppState) => ({
        cardData: state.cards,
        cardList: state.deckEditor.cards
    });

export default connect(mapStateToProps, null)(CMCBar);
