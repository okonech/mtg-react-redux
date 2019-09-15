import { connect } from 'react-redux';
import { updatePlayers } from '../actions/playersActions';
import { selectCards } from '../actions/selectActions';
import { moveCards, updateZones } from '../actions/zonesActions';
import Player from '../components/Player';
import { AppState } from '../reducers';
import { PlayerData, playerSelector } from '../selectors/player';
import { selectedSelector } from '../selectors/selected';

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
