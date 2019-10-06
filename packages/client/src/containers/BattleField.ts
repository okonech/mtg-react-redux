
import { CardDragObject } from './DraggableCard';
import { connect } from 'react-redux';
import { ConnectDropTarget, DropTarget, DropTargetSpec } from 'react-dnd';
import { findDOMNode } from 'react-dom';
import { moveCards, setCardsFlipped, setCardsTapped } from '../actions/gameCardsActions';
import { selectCards } from '../actions/selectActions';
import { snapToGrid } from '../util/snapToGrid';
import { Types } from '../Constants';
import BattleField from '../components/BattleField';

export interface BattleFieldMappedProps {
    moveCards: typeof moveCards;
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
        const { moveCards: moveCardsAction, zone } = props;
        const { zoneId, cards } = monitor.getItem() as CardDragObject;

        cards.forEach((id) => {
            const element = document.getElementById(id);
            if (element) {
                element.style.display = 'block';
            }
        });

        const node = findDOMNode(component) as Element;
        const bounds = node.getBoundingClientRect();
        const { x, y } = monitor.getSourceClientOffset();

        const { x: snapX, y: snapY } = snapToGrid({ x, y });

        const xCoord = snapX - bounds.left;
        const yCoord = snapY - bounds.top;

        moveCardsAction(zoneId, cards, zone.id, zone.cards.length, xCoord, yCoord);
    }
};

const mapDispatchToProps = {
    selectCards,
    moveCards,
    setCardsFlipped,
    setCardsTapped
};

export default connect(null, mapDispatchToProps)(DropTarget(Types.CARD, battlefieldTarget, (connector, monitor) => ({
    connectDropTarget: connector.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
    dragItem: monitor.getItem()
}))(BattleField));
