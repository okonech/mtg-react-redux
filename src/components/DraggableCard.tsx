import * as React from 'react';
import { ConnectDragPreview, ConnectDragSource, DragSource, DragSourceMonitor, DragSourceSpec } from 'react-dnd';
import { ConnectDropTarget, DropTarget, DropTargetMonitor, DropTargetSpec } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { Types } from '../Constants';
import Card from './Card';

// draggable card component with id, key, x, y position

interface CardDragObject {
  id: string;
  name: string;
  originalIndex: number;
  zoneId: string;
}

const cardSource: DragSourceSpec<DraggableCardProps, CardDragObject> = {
  beginDrag(props: DraggableCardProps) {
    console.log('Start drag ' + props.name + ' ' + props.id);
    return {
      id: props.id,
      name: props.name,
      originalIndex: props.originalIndex,
      zoneId: props.zoneId
    };
  },

  endDrag(props: DraggableCardProps, monitor: DragSourceMonitor) {
    const { id: droppedId, originalIndex } = monitor.getItem() as CardDragObject;
    const didDrop = monitor.didDrop();
    console.log('End drag ' + props.name + ' ' + props.id);
    // todo: move drop call logic into droptarget drop method
    // also add droptarget drop on hand and battlefield, putting cards at end of list

    // trello board handles preview drag by passing isover as a prop, and adding a moved 
    // placeholder in the render method
    // do this with cards for sort
    if (!didDrop) {
      props.hoverMoveCard(droppedId, originalIndex);
      console.log('End drag returned ' + props.name + ' to original index ' + originalIndex);
    }
  }
};

const cardTarget: DropTargetSpec<DraggableCardProps> = {
  hover(props: DraggableCardProps, monitor: DropTargetMonitor) {
    const { id: draggedId } = monitor.getItem() as CardDragObject;
    const { id: overId } = props;

    if (draggedId !== overId) {
      const { index: overIndex } = props.hoverFindCard(overId);
      props.hoverMoveCard(draggedId, overIndex);
    }
  },
  drop(props: DraggableCardProps, monitor: DropTargetMonitor) {
    const { zoneId, originalIndex } = monitor.getItem() as CardDragObject;
    props.moveCard(zoneId, originalIndex);
  }
};

interface DraggableCardProps {
  connectDropTarget?: ConnectDropTarget;
  hoverMoveCard: (id: string, to: number) => void;
  hoverFindCard: (id: string) => { index: number };
  name: string;
  id: string;
  zoneId: string;
  originalIndex: number;
  moveCard: (toId: string, toIdx: number) => void;
}

interface DraggableCardSourceCollectedProps {
  connectDragSource: ConnectDragSource;
  connectDragPreview: ConnectDragPreview;
  isDragging: boolean;
}

interface DraggableCardTargetCollectedProps {
  connectDropTarget: ConnectDropTarget;
  isOver: boolean;
}

class DraggableCard extends React.Component<DraggableCardProps & DraggableCardSourceCollectedProps> {

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
      name,
      isDragging,
      connectDragSource,
      connectDropTarget
    } = this.props;
    // set currently dragged card to invisible while dragging it
    // gives appearance of the dragged card being the actual dragged card and not the copy
    const opacity = isDragging ? 0 : 1;
    if (connectDragSource && connectDropTarget) {
      return (
        connectDragSource &&
        connectDropTarget &&
        connectDragSource(
          connectDropTarget(
            <div style={{ height: '100%' }}>
              <Card
                name={name}
                opacity={opacity}
              />
            </div>
          )
        )
      );
    } else {
      throw console.error();
    }
  }
}

export default DropTarget<DraggableCardProps, DraggableCardTargetCollectedProps>(
  Types.CARD, cardTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  }))
  (DragSource<DraggableCardProps, DraggableCardSourceCollectedProps>(
    Types.CARD, cardSource, (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      connectDragPreview: connect.dragPreview(),
      isDragging: monitor.isDragging()
    }))(DraggableCard));
