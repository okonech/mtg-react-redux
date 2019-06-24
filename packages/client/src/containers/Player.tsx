import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { updatePlayers } from '../actions/playersActions';
import { selectCards } from '../actions/selectActions';
import { moveCards, updateZones } from '../actions/zonesActions';
import Player from '../components/Player';
import { AppState } from '../reducers';
import { Player as PlayerState } from '../reducers/playersReducer';
import { Zone } from '../reducers/zonesReducer';
import { PlayerData, playerSelector } from '../selectors/player';
import { selectedSelector } from '../selectors/selected';

export interface PlayerMappedProps {
    player: PlayerData;
    selected: string[];
    id: string;
}

export interface PlayerMappedDispatch {
    updatePlayers?: updatePlayers;
    updateZones?: updateZones;
    moveCards?: moveCards;
    selectCards?: selectCards;
}

const mapStateToProps = (state: AppState, ownProps: { id: string }) => ({
    player: playerSelector(state, ownProps.id),
    selected: selectedSelector(state),
    id: ownProps.id
});

const mapDispatchToProps = (dispatch: Dispatch<any>, props: PlayerMappedProps) => ({
    updatePlayers: (players: PlayerState[]) => (
        dispatch(updatePlayers(players))),
    updateZones: (zones: Zone[]) => (
        dispatch(updateZones(zones))),
    moveCards: (fromZone: string, cards: string[], toZone: string, toIdx: number, xCoord: number, yCoord: number) => (
        dispatch(moveCards(fromZone, cards, toZone, toIdx, xCoord, yCoord))),
    selectCards: (cards: string[]) => (
        dispatch(selectCards(cards)))
});

export default connect(mapStateToProps, mapDispatchToProps)(Player);
