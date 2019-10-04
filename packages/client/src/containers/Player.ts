import { AppState } from '../reducers';
import { connect } from 'react-redux';
import { PlayerData, playerSelector } from '../selectors/player';
import { selectedSelector } from '../selectors/selected';
import Player from '../components/Player';

export interface MappedPlayer {
    player?: PlayerData;
    selected?: string[];
    id: string;
}

const mapStateToProps = (state: AppState, ownProps: { id: string }) => ({
    player: playerSelector(state, ownProps.id),
    selected: selectedSelector(state)
});

export default connect(mapStateToProps, null)(Player);
