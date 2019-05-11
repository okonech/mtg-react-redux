import * as React from 'react';
import { ConnectDragPreview, ConnectDragSource, DragSource, DragSourceSpec } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { defaultMemoize } from 'reselect';
import { selectCards as selectCardsType } from '../actions/selectActions';
import { Types } from '../Constants';
import { WithSelectable } from '../packages/react-dnd-selectable';
import { Card as CardType } from '../reducers/cardsReducer';
import CardHover from './CardHover';

// draggable card component with id, key, x, y position

export interface CardDragObject {
  cards: string[];
  firstCard: CardType;
  zoneId: string;
}

const dragCardStyle = defaultMemoize((xCoord: number, yCoord: number, cardHeight: number): React.CSSProperties => {
  const transform = `translate3d(${Math.max(0, xCoord)}px, ${Math.max(0, yCoord)}px, 0)`;
  return ((typeof xCoord === 'number') && (typeof yCoord === 'number')) ? {
    position: 'absolute',
    transform,
    WebkitTransform: transform,
    height: `${cardHeight}vh`
  } : {
      height: `${cardHeight}vh`
    };
});

const cardSource: DragSourceSpec<DraggableCardProps, CardDragObject> = {

  isDragging(props, monitor) {
    // If your component gets unmounted while dragged
    // (like a card in Kanban board dragged between lists)
    // you can implement something like this to keep its
    // appearance dragged:
    return monitor.getItem().cards.includes(props.card.id);
  },

  beginDrag(props, monitor, component: DraggableCard): CardDragObject {

    const { selectCards, selectedCards, zoneId, card } = props;
    const { id } = card;
    const cards = [...selectedCards];
    if (!cards.includes(id)) {
      cards.push(id);
    }
    selectCards(cards);

    return {
      cards,
      firstCard: card,
      zoneId
    };
  }

};

interface DraggableCardProps {
  id: string;
  card: CardType;
  zoneId: string;
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
    const { card, connectDragSource, selectedCards, selecting, selectableRef,
            cardHeight, xCoord, yCoord, id } = this.props;

    return (
      connectDragSource(
        <div
          // handles drag transform in non list areas
          style={dragCardStyle(xCoord, yCoord, cardHeight)}
          ref={selectableRef}
        >
          <CardHover
            key={'card' + id}
            card={card}
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

export default DragSource<DraggableCardProps & SelectableProps, DraggableCardSourceCollectedProps>(
  Types.CARD, cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }))(WithSelectable(DraggableCard));
