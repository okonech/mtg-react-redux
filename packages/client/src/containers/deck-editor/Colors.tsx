import { connect } from 'react-redux';
import Colors from '../../components/deck-editor/Colors';
import { AppState } from '../../reducers';

const mapStateToProps = (state: AppState) => {
    return {
        cardData: state.cards,
        cardList: state.deckEditor.cards
    };
};

export default connect(mapStateToProps, null)(Colors);
