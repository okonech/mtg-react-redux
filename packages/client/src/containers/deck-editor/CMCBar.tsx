import { connect } from 'react-redux';
import CMCBar from '../../components/deck-editor/CMCBar';
import { AppState } from '../../reducers';

const mapStateToProps = (state: AppState) => {
    return {
        cardData: state.cards,
        cardList: state.deckEditor.cards
    };
};

export default connect(mapStateToProps, null)(CMCBar);
