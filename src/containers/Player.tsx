import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { updatePlayers } from '../actions/playersActions';
import { moveCards, selectCards, updateZones } from '../actions/zonesActions';
import Player, { PlayerProps } from '../components/Player';
import { AppState } from '../reducers';
import { PlayerData, playerSelector } from '../selectors/player';

export interface PlayerMappedProps {
    player: PlayerData;
    id: string;
}

export interface PlayerMappedDispatch {
    moveCards?: moveCards;
    selectCards?: selectCards;
}

const mapStateToProps = (state: AppState, ownProps: { id: string }) => ({
    player: playerSelector(state, ownProps.id),
    id: ownProps.id
}) as PlayerMappedProps;

const mapDispatchToProps = (dispatch: Dispatch<any>, props: PlayerProps) => ({
    updatePlayers,
    updateZones,
    moveCards: (fromZone: string, cards: string[], toZone: string, toIdx: number) => (
        dispatch(moveCards(fromZone, cards, toZone, toIdx))),
    selectCards: (zone: string, cards: string[]) => (
        dispatch(selectCards(zone, cards)))
});

// cool performance improvement
const options = {
    areStatePropsEqual: (next: PlayerMappedProps, prev: PlayerMappedProps) => {
        return (
            prev.player === next.player &&
            prev.id === next.id
        );
    }
};

export default connect(mapStateToProps, mapDispatchToProps, null, options)(Player);
