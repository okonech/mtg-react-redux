import * as React from 'react';
import { ConnectDragPreview, ConnectDragSource, DragSource, DragSourceMonitor, DragSourceSpec } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { findDOMNode } from 'react-dom';
import { createSelectable } from 'react-selectable-fast';
import { Types } from '../Constants';
import Card from './Card';

// draggable card component with id, key, x, y position

export interface CardDragObject {
  id: string;
  name: string;
  originalIndex: number;
  zoneId: string;
  initialX: number;
  initialY: number;
}

const cardSource: DragSourceSpec<DraggableCardProps, CardDragObject> = {
  beginDrag(props: DraggableCardProps, monitor: DragSourceMonitor, component: DraggableCard) {
    console.log('Start drag ' + props.name + ' ' + props.id);

    const node = findDOMNode(component) as Element;
    const bounds = node.getBoundingClientRect();
    const offset = monitor.getInitialClientOffset();
    return {
      id: props.id,
      name: props.name,
      originalIndex: props.originalIndex,
      zoneId: props.zoneId,
      initialX: offset.x - bounds.left,
      initialY: offset.y - bounds.top
    };
  },

  endDrag(props: DraggableCardProps, monitor: DragSourceMonitor) {
    console.log('End drag ' + props.name + ' ' + props.id);
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
  originalIndex: number;
  onMouseEnter: (event) => void;
  onMouseLeave: (event) => void;
  stateSelected: boolean;
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
    const { name, isDragging, connectDragSource, id, stateSelected, selecting,
            onMouseEnter, onMouseLeave, selectableRef, cardHeight, xCoord, yCoord } = this.props;
    // set currently dragged card to invisible while dragging it
    // gives appearance of the dragged card being the actual dragged card and not the copy
    const opacity = isDragging ? 0 : 1;
    const transform = `translate3d(${Math.max(0, xCoord)}px, ${Math.max(0, yCoord)}px, 0)`;
    const style: React.CSSProperties = (!!xCoord && !!yCoord) ? {
      position: 'absolute',
      transform,
      WebkitTransform: transform
    } : {};
    return (
      connectDragSource(
        <div
          ref={selectableRef}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          style={style}
        >
          <Card
            key={'card' + id}
            name={name}
            opacity={opacity}
            // this can cause chrome to not drag
            visible={true}
            selected={stateSelected}
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
