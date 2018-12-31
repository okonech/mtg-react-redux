import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { updatePlayers } from '../actions/playersActions';
import { updateZones } from '../actions/zonesActions';
import Player, { PlayerProps } from '../components/Player';
import { AppState } from '../reducers';
import { PlayerData, playerSelector } from '../selectors/player';

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
