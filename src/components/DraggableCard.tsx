import * as React from 'react';
import { ConnectDragPreview, ConnectDragSource, DragSource, DragSourceMonitor, DragSourceSpec } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { findDOMNode } from 'react-dom';
import { createSelectable } from 'react-selectable-fast';
import { defaultMemoize } from 'reselect';
import { selectCards as selectCardsType } from '../actions/selectActions';
import { Types } from '../Constants';
import Card from './Card';

// draggable card component with id, key, x, y position

export interface CardDragObject {
  cards: string[];
  firstName: string;
  zoneId: string;
  initialX: number;
  initialY: number;
}

const dragCardStyle = defaultMemoize((xCoord: number, yCoord: number): React.CSSProperties => {
  const transform = `translate3d(${Math.max(0, xCoord)}px, ${Math.max(0, yCoord)}px, 0)`;
  return (!!xCoord && !!yCoord) ? {
    position: 'absolute',
    transform,
    WebkitTransform: transform
  } : {};
});

const cardSource: DragSourceSpec<DraggableCardProps, CardDragObject> = {
  beginDrag(props: DraggableCardProps, monitor: DragSourceMonitor, component: DraggableCard) {

    const { selectCards, selectedCards, zoneId, id, name } = props;
    console.log('Start drag ' + selectedCards + ' ' + props.id);
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
      firstName: name,
      zoneId,
      initialX: offset.x - bounds.left,
      initialY: offset.y - bounds.top
    };
  },

  endDrag(props: DraggableCardProps, monitor: DragSourceMonitor) {
    console.log('End drag ' + props.selectedCards);
    // todo: move drop call logic into droptarget drop method
    // also add droptarget drop on hand and battlefield, putting cards at end of list

    // trello board handles preview drag by passing isover as a prop, and adding a moved 
    // placeholder in the render method
    // do this with cards for sort
  }
};

interface DraggableCardProps {
  name: string;
  id: string;
  zoneId: string;
  onMouseEnter: (event) => void;
  onMouseLeave: (event) => void;
  selectedCards: string[];
  selectCards: selectCardsType;
  cardHeight: number;
  xCoord?: number;
  yCoord?: number;
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
    const { name, isDragging, connectDragSource, id, selectedCards, selecting,
            onMouseEnter, onMouseLeave, selectableRef, cardHeight, xCoord, yCoord } = this.props;

    return (
      connectDragSource(
        <div
          ref={selectableRef}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          style={dragCardStyle(xCoord, yCoord)}
        >
          <Card
            key={'card' + id}
            name={name}
            // set currently dragged card to invisible while dragging it
            // gives appearance of the dragged card being the actual dragged card and not the copy
            opacity={isDragging ? 0 : 1}
            // this can cause chrome to not drag
            visible={true}
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
  }))(createSelectable(DraggableCard));
