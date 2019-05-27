import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Players from '../components/Players';
import { AppState } from '../reducers';

const mapStateToProps = (state: AppState) => ({
    players: state.players.playerIds,
    loading: state.isLoading
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    initPlayers: (game: string) => dispatch(({ type: 'INIT_PLAYERS', payload: game }))
});

export default connect(mapStateToProps, mapDispatchToProps)(Players);
