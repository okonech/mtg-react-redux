import { AppState } from '../../reducers';
import { connect } from 'react-redux';
import Colors from '../../components/deck-editor/Colors';

const mapStateToProps = (state: AppState) => ({
        cardData: state.cards,
        cardList: state.deckEditor.cards
    });

export default connect(mapStateToProps, null)(Colors);
