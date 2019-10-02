import * as React from 'react';
import { ConnectDragPreview, ConnectDragSource, DragSource, DragSourceSpec } from 'react-dnd';
import { defaultMemoize } from 'reselect';
import { flipCards as flipCardsType, tapCards as tapCardsType } from '../actions/gameCardsActions';
import { GameCardModel } from '@mtg-react-redux/models';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { selectCards as selectCardsType } from '../actions/selectActions';
import { Types } from '../Constants';
import { WithSelectable } from '../packages/react-dnd-selectable';
import Card from '../components/Card';
import WithHover from '../hocs/WithHover';

// draggable card component with id, key, x, y position

export interface CardDragObject {
  cards: string[];
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

  beginDrag(props): CardDragObject {

    const { selectCards, selectedCards, zoneId, card } = props;
    const cards = [...selectedCards];
    if (!cards.includes(card.id)) {
      cards.push(card.id);
    }
    selectCards(cards);

    return {
      cards,
      zoneId
    };
  },
  endDrag(props, monitor) {
    if (!monitor.didDrop()) {
      // if invalid drop and drop not handled, show items again
      const { cards } = monitor.getItem() as CardDragObject;
      cards.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          element.style.display = 'block';
        }
      });
      if (props.selectedCards.length > 0) {
        props.selectCards([]);
      }
    }
  }

};

interface DraggableCardProps {
  id: string;
  card: GameCardModel;
  zoneId: string;
  selectedCards: string[];
  selectCards: typeof selectCardsType;
  flipCards?: typeof flipCardsType;
  tapCards?: typeof tapCardsType;
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

interface HoverProps {
  isHovered?: boolean;
}

type AllProps = DraggableCardProps & DraggableCardSourceCollectedProps & SelectableProps & HoverProps;

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
    const {
      card, connectDragSource, selectedCards, selecting, selectableRef,
      cardHeight, xCoord, yCoord, id, isHovered, tapCards, flipCards
    } = this.props;
    const selected = selectedCards.includes(id);

    const doubleClick = tapCards ? () => tapCards(selected ? selectedCards : [card.id]) : null;
    const rightClick = flipCards ? () => flipCards(selected ? selectedCards : [card.id]) : null;

    return (
      connectDragSource(
        <div
          // handles drag transform in non list areas
          style={dragCardStyle(xCoord, yCoord, cardHeight)}
          onDoubleClick={doubleClick}
          onContextMenu={rightClick}
          ref={selectableRef}
        >
          <Card
            key={'card' + id}
            card={card}
            // this can cause chrome to not drag
            selected={selected}
            selecting={selecting}
            cardHeight={cardHeight}
            isHovered={isHovered}
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
  }))(WithHover(WithSelectable(DraggableCard)));
