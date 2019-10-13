import { AppState } from '../../reducers';
import { closeContextMenu } from '../../actions/clickActions';
import { connect } from 'react-redux';
import { Data } from '../../components/context-menu/ContextMenuTrigger';
import { GameCardPrimitive } from '@mtg-react-redux/models';
import { moveCards } from '../../actions/gameCardsActions';
import { Player, singlePlayerSelector } from '../../reducers/playersReducer';
import { selectCards } from '../../actions/selectActions';
import { selectedSelector } from '../../selectors/selected';
import { singleGameCardSelector } from '../../reducers/gameCardsReducer';
import { singleZoneSelector, Zone } from '../../reducers/zonesReducer';
import CardContextMenu from '../../components/context-menu/CardContextMenu';

export interface MappedCardContextMenuProps {
    player: Player;
    zone: Zone;
    card: GameCardPrimitive;
    selected: string[];
    moveCards: typeof moveCards;
    selectCards: typeof selectCards;
}

const mapStateToProps = (state: AppState, props: { data: Data }) => ({
    player: singlePlayerSelector(state.players, props.data.player),
    zone: singleZoneSelector(state.zones, props.data.zone),
    card: singleGameCardSelector(state.gameCards, props.data.card),
    selected: selectedSelector(state)
});

const mapDispatchToProps = {
    selectCards,
    moveCards,
    closeContextMenu
};

export default connect(mapStateToProps, mapDispatchToProps)(CardContextMenu);
