import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Players from '../components/Players';
import { AppState } from '../reducers';
import { GameState } from '../reducers/gameReducer';

export interface MappedPlayers {
    game: GameState;
    players: string[];
    loading: AppState['isLoading'];
    initPlayers: (game: GameState) => void;
}

const mapStateToProps = (state: AppState) => ({
    players: state.players.playerIds,
    loading: state.isLoading,
    game: state.game
});

// TODO: properly memoize this, it loads on each page change
const mapDispatchToProps = (dispatch: Dispatch) => ({
    initPlayers: (game: GameState) => dispatch(({ type: 'INIT_PLAYERS', payload: game.id }))
});

export default connect(mapStateToProps, mapDispatchToProps)(Players);
