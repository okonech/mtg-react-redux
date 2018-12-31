import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { updatePlayers } from '../actions/playersActions';
import { updateZones } from '../actions/zonesActions';
import { AppState } from '../reducers'
import Player, { PlayerProps } from '../components/Player';
import { playerSelector, PlayerData } from '../selectors/player';


const mapStateToProps = (state: AppState, ownProps: { id: string }) => ({
    // todo: fix type
    player: playerSelector(state, ownProps.id) as PlayerData,
    id: ownProps.id
});

const mapDispatchToProps = (dispatch: Dispatch<any>, props: PlayerProps) => ({
    updatePlayers,
    updateZones
});

export default connect(mapStateToProps, mapDispatchToProps)(Player);