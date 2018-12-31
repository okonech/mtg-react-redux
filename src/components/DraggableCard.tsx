import * as React from 'react';
import { ConnectDragPreview, ConnectDragSource, DragSource, DragSourceMonitor, DragSourceSpec } from 'react-dnd';
import { ConnectDropTarget, DropTarget, DropTargetMonitor, DropTargetSpec } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { Types } from '../Constants';
import Card from './Card';

// draggable card component with id, key, x, y position

const cardSource: DragSourceSpec<DraggableCardProps, any> = {
  beginDrag(props: DraggableCardProps) {
    console.log('Start drag ' + props.name + ' ' + props.id);
    return {
      id: props.id,
      name: props.name,
      originalIndex: props.findCard(props.id).index
    };
  },

  endDrag(props: DraggableCardProps, monitor: DragSourceMonitor) {
    const { id: droppedId, originalIndex } = monitor.getItem();
    const didDrop = monitor.didDrop();
    console.log('End drag ' + props.name + ' ' + props.id);
    if (!didDrop) {
      props.moveCard(droppedId, originalIndex);
      console.log('End drag returned ' + props.name + ' to original index ' + originalIndex);
    }
  }
};

const cardTarget: DropTargetSpec<DraggableCardProps> = {
  hover(props: DraggableCardProps, monitor: DropTargetMonitor) {
    const { id: draggedId } = monitor.getItem();
    const { id: overId } = props;

    if (draggedId !== overId) {
      const { index: overIndex } = props.findCard(overId);
      props.moveCard(draggedId, overIndex);
    }
  },

  canDrop(props: DraggableCardProps, monitor: DropTargetMonitor) {
    return true;
  }
};

interface DraggableCardProps {
  connectDragPreview?: ConnectDragPreview;
  connectDragSource?: ConnectDragSource;
  isDragging?: boolean;
  connectDropTarget?: ConnectDropTarget;
  moveCard: (id: string, to: number) => void;
  findCard: (id: string) => { index: number };
  name: string;
  key: string;
  id: string;
}

class DraggableCard extends React.Component<DraggableCardProps, any> {

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

export default DropTarget(Types.CARD, cardTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))
  (DragSource(Types.CARD, cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }))(DraggableCard));
