import { AppState } from '../reducers';
import { connect } from 'react-redux';
import { flipCards, moveCards, tapCards } from '../actions/gameCardsActions';
import { PlayerData, playerSelector } from '../selectors/player';
import { selectCards } from '../actions/selectActions';
import { selectedSelector } from '../selectors/selected';
import { updatePlayers } from '../actions/playersActions';
import { updateZones } from '../actions/zonesActions';
import Player from '../components/Player';

export interface MappedPlayer {
    player?: PlayerData;
    selected?: string[];
    id: string;
    updatePlayers: typeof updatePlayers;
    updateZones: typeof updateZones;
    moveCards: typeof moveCards;
    selectCards: typeof selectCards;
    flipCards: typeof flipCards;
    tapCards: typeof tapCards;
}

const mapStateToProps = (state: AppState, ownProps: { id: string }) => ({
    player: playerSelector(state, ownProps.id),
    selected: selectedSelector(state)
});

const mapDispatchToProps = {
    updatePlayers,
    updateZones,
    moveCards,
    selectCards,
    flipCards,
    tapCards
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
