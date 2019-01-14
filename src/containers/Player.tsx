import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { updatePlayers } from '../actions/playersActions';
import { moveCards, updateZones } from '../actions/zonesActions';
import Player, { PlayerProps } from '../components/Player';
import { AppState } from '../reducers';
import { PlayerData, playerSelector } from '../selectors/player';

interface InjectedProps {
    player: PlayerData;
    id: string;
}

const mapStateToProps = (state: AppState, ownProps: { id: string }) => ({
    player: playerSelector(state, ownProps.id),
    id: ownProps.id
}) as InjectedProps;

const mapDispatchToProps = (dispatch: Dispatch<any>, props: PlayerProps) => ({
    updatePlayers,
    updateZones,
    moveCard: (fromZone: string, cards: string[], toZone: string, toIdx: number) => (
        dispatch(moveCards(fromZone, cards, toZone, toIdx)))
});

// cool performance improvement
const options = {
    areStatePropsEqual: (next: InjectedProps, prev: InjectedProps) => {
        return (
            prev.player === next.player &&
            prev.id === next.id
        );
    }
};

export default connect(mapStateToProps, mapDispatchToProps, null, options)(Player);
