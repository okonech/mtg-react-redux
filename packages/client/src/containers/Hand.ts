import { CardDragObject } from './DraggableCard';
import { connect } from 'react-redux';
import { ConnectDropTarget, DropTarget, DropTargetMonitor, DropTargetSpec } from 'react-dnd';
import { findDOMNode } from 'react-dom';
import { GameCardZone } from '../selectors/player';
import { moveCards } from '../actions/gameCardsActions';
import { selectCards } from '../actions/selectActions';
import { Types } from '../Constants';
import Hand from '../components/Hand';

const handTarget: DropTargetSpec<typeof Hand.defaultProps> = {
  hover(props: typeof Hand.defaultProps, monitor: DropTargetMonitor, component) {
    const node = findDOMNode(component) as Element;
    const placeholderIndex = getPlaceholderIndex(props.zone, monitor, node);
    if (component.state.placeholderIndex !== placeholderIndex) {
      component.setState({ placeholderIndex });
    }

  },
  drop(props: typeof Hand.defaultProps, monitor, component) {
    const { moveCards: moveCardsAction, zone } = props;
    const { zoneId, cards } = monitor.getItem() as CardDragObject;
    const { placeholderIndex } = component.state;
    cards.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        element.style.display = 'block';
      }
    });
    moveCardsAction(zoneId, cards, zone.id, placeholderIndex, 0, 0);
  }
};

export interface HandMappedProps {
  moveCards: typeof moveCards;
  selectCards: typeof selectCards;
}

export interface HandTargetCollectedProps {
  connectDropTarget: ConnectDropTarget;
  isOver: boolean;
  canDrop: boolean;
  dragItem: CardDragObject;
}

function getPlaceholderIndex(zone: GameCardZone, monitor: DropTargetMonitor, handElement: Element) {

  if (zone.cards.length === 0) {
    return 0;
  }
  const selectable = handElement.firstChild.lastChild as Element;
  const mouseX = monitor.getClientOffset().x;
  const bounds = handElement.getBoundingClientRect();
  // shift placeholder if x position more than card width / 2
  const xPos = mouseX - bounds.left + selectable.scrollLeft;

  let cardWidth = 0;

  // loop through cards until one with width is found, or return 0
  const cardElements = selectable.children;
  const len = cardElements.length;
  for (let idx = len - 1; idx >= 0; idx--) {
    cardWidth = cardElements[idx].clientWidth;
    if (cardWidth > 0) {
      break;
    }
  }

  if (cardWidth === 0) {
    // all elements hidden, place at 0 
    return 0;
  }

  if (xPos < cardWidth) {
    return 0; // place at the start
  }
  return Math.floor(xPos / cardWidth);

}
const mapDispatchToProps = {
  selectCards,
  moveCards
};

export default connect(null, mapDispatchToProps)(
  DropTarget<typeof Hand.defaultProps, HandTargetCollectedProps>(Types.CARD, handTarget, (connector, monitor) => ({
    connectDropTarget: connector.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
    dragItem: monitor.getItem()
  }))(Hand));
