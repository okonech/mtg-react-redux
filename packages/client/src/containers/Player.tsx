import { AppState } from '../reducers';
import { connect } from 'react-redux';
import { moveCards, updateZones } from '../actions/zonesActions';
import { PlayerData, playerSelector } from '../selectors/player';
import { selectCards } from '../actions/selectActions';
import { selectedSelector } from '../selectors/selected';
import { updatePlayers } from '../actions/playersActions';
import Player from '../components/Player';

export interface MappedPlayer {
    player?: PlayerData;
    selected?: string[];
    id: string;
    updatePlayers: typeof updatePlayers;
    updateZones: typeof updateZones;
    moveCards: typeof moveCards;
    selectCards: typeof selectCards;
}

const mapStateToProps = (state: AppState, ownProps: { id: string }) => ({
    player: playerSelector(state, ownProps.id),
    selected: selectedSelector(state)
});

const mapDispatchToProps = {
    updatePlayers,
    updateZones,
    moveCards,
    selectCards
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
