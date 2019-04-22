import * as React from 'react';
import { ConnectDragPreview, ConnectDragSource, DragSource, DragSourceMonitor, DragSourceSpec } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { findDOMNode } from 'react-dom';
import { createSelectable } from 'react-selectable-fast';
import { defaultMemoize } from 'reselect';
import { selectCards as selectCardsType } from '../actions/selectActions';
import { Types } from '../Constants';
import { Card as CardType } from '../reducers/cardsReducer';
import Card from './Card';

// draggable card component with id, key, x, y position

export interface CardDragObject {
  cards: string[];
  firstCard: CardType;
  zoneId: string;
  initialX: number;
  initialY: number;
}

const dragCardStyle = defaultMemoize((xCoord: number, yCoord: number, hidden: boolean): React.CSSProperties => {
  const transform = `translate3d(${Math.max(0, xCoord)}px, ${Math.max(0, yCoord)}px, 0)`;
  if (hidden) {
    return { display: 'none' };
  }
  return (!!xCoord && !!yCoord) ? {
    position: 'absolute',
    transform,
    WebkitTransform: transform
  } : {};
});

const cardSource: DragSourceSpec<DraggableCardProps, CardDragObject> = {

  isDragging(props, monitor) {
    // If your component gets unmounted while dragged
    // (like a card in Kanban board dragged between lists)
    // you can implement something like this to keep its
    // appearance dragged:
    return monitor.getItem().id === props.card.id;
  },

  beginDrag(props: DraggableCardProps, monitor: DragSourceMonitor, component: DraggableCard): CardDragObject {

    const { selectCards, selectedCards, zoneId, card } = props;
    const { id } = card;
    console.log('Start drag ' + selectedCards + ' ' + id);
    const node = findDOMNode(component) as Element;
    const bounds = node.getBoundingClientRect();
    const offset = monitor.getInitialClientOffset();
    const cards = [...selectedCards];
    if (!cards.includes(id)) {
      cards.push(id);
    }
    selectCards(cards);

    return {
      cards,
      firstCard: card,
      zoneId,
      initialX: offset.x - bounds.left,
      initialY: offset.y - bounds.top
    };
  },
  endDrag(props: DraggableCardProps, monitor: DragSourceMonitor) {
    console.log('End drag ' + props.selectedCards);
    const item = monitor.getItem();
    const element = document.getElementById(item.firstCard.id);
    if (element) {
      element.style.display = 'block';
    }
  }

};

interface DraggableCardProps {
  card: CardType;
  zoneId: string;
  onMouseEnter: (event) => void;
  onMouseLeave: (event) => void;
  selectedCards: string[];
  selectCards: selectCardsType;
  cardHeight: number;
  xCoord?: number;
  yCoord?: number;
  hidden?: boolean;
}

interface DraggableCardSourceCollectedProps {
  connectDragSource: ConnectDragSource;
  connectDragPreview: ConnectDragPreview;
  isDragging: boolean;
}

interface SelectableProps {
  // passed through selectable state, do not use
  selectableRef?: string;
  selected?: boolean;
  selecting?: boolean;
}

type AllProps = DraggableCardProps & DraggableCardSourceCollectedProps & SelectableProps;

class DraggableCard extends React.PureComponent<AllProps> {

  // remove this code to return drag prevew  
  public componentDidMount() {
    const { connectDragPreview } = this.props;
    if (connectDragPreview) {
      // Use empty image as a drag preview so browsers don't draw it
      // and we can draw whatever we want on the custom drag layer instead.
      connectDragPreview(getEmptyImage(), {
        // IE fallback: specify that we'd rather screenshot the node
        // when it already knows it's being dragged so we can hide it with CSS.
        captureDraggingState: true
      });
    }
  }

  public render() {
    const { card, isDragging, connectDragSource, selectedCards, selecting, hidden,
            onMouseEnter, onMouseLeave, selectableRef, cardHeight, xCoord, yCoord } = this.props;

    const { id } = card;

    return (
      connectDragSource(
        <div
          ref={selectableRef}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          // handles drag transform in non list areas
          style={dragCardStyle(xCoord, yCoord, hidden)}
        >
          <Card
            key={'card' + id}
            card={card}
            // set currently dragged card to invisible while dragging it
            // gives appearance of the dragged card being the actual dragged card and not the copy
            opacity={isDragging ? 0 : 1}
            // this can cause chrome to not drag
            selected={selectedCards.includes(id)}
            selecting={selecting}
            cardHeight={cardHeight}
          />
        </div>
      )
    );
  }
}

export default createSelectable(DragSource<DraggableCardProps & SelectableProps, DraggableCardSourceCollectedProps>(
  Types.CARD, cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }))(DraggableCard));
