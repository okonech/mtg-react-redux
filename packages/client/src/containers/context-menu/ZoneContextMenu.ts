import { AppState } from '../../reducers';
import { closeContextMenu } from '../../actions/clickActions';
import { connect } from 'react-redux';
import { Data } from '../../components/context-menu/ContextMenuTrigger';
import { moveCardsFixCoords } from '../../actions/gameCardsActions';
import { Player, singlePlayerSelector } from '../../reducers/playersReducer';
import { shuffleZone } from '../../actions/zonesActions';
import { singleZoneSelector, Zone } from '../../reducers/zonesReducer';
import ZoneContextMenu from '../../components/context-menu/ZoneContextMenu';

export interface MappedZoneContextMenuProps {
    player: Player;
    zone: Zone;
    moveCardsFixCoords: typeof moveCardsFixCoords;
    shuffleZone: typeof shuffleZone;
}

const mapStateToProps = (state: AppState, props: { data: Data }) => ({
    player: singlePlayerSelector(state.players, props.data.player),
    zone: singleZoneSelector(state.zones, props.data.zone)
});

const mapDispatchToProps = {
    moveCardsFixCoords,
    shuffleZone,
    closeContextMenu
};

export default connect(mapStateToProps, mapDispatchToProps)(ZoneContextMenu);
