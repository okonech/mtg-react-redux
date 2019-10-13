
import { CardDragObject } from './DraggableCard';
import { connect } from 'react-redux';
import { ConnectDropTarget, DropTarget, DropTargetSpec } from 'react-dnd';
import { moveCardsFixCoords, setCardsFlipped, setCardsTapped } from '../actions/gameCardsActions';
import { selectCards } from '../actions/selectActions';
import { snapToGrid } from '../util/snapToGrid';
import { Types } from '../Constants';
import BattleField from '../components/BattleField';

export interface BattleFieldMappedProps {
    moveCardsFixCoords: typeof moveCardsFixCoords;
    selectCards: typeof selectCards;
    setCardsFlipped: typeof setCardsFlipped;
    setCardsTapped: typeof setCardsTapped;
}

export interface BattleFieldTargetCollectedProps {
    connectDropTarget: ConnectDropTarget;
    isOver: boolean;
    canDrop: boolean;
    dragItem: CardDragObject;
}

const battlefieldTarget: DropTargetSpec<typeof BattleField.defaultProps> = {
    drop(props: typeof BattleField.defaultProps, monitor, component) {
        const { moveCardsFixCoords: moveCardsAction, zone } = props;
        const { zoneId, cards } = monitor.getItem() as CardDragObject;

        cards.forEach((id) => {
            const element = document.getElementById(id);
            if (element) {
                element.style.display = 'block';
            }
        });

        const node = component.battleFieldRef.current as HTMLElement;
        const { x, y } = monitor.getSourceClientOffset();

        const { x: snapX, y: snapY } = snapToGrid({ x, y });

        const xCoord = snapX - node.offsetLeft;
        const yCoord = snapY - node.offsetTop;

        moveCardsAction(zoneId, zone.id, cards, zone.cards.length, xCoord, yCoord);
    }
};

const mapDispatchToProps = {
    selectCards,
    moveCardsFixCoords,
    setCardsFlipped,
    setCardsTapped
};

export default connect(null, mapDispatchToProps)(DropTarget(Types.CARD, battlefieldTarget, (connector, monitor) => ({
    connectDropTarget: connector.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
    dragItem: monitor.getItem()
}))(BattleField));
