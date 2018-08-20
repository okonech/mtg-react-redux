import * as React from 'react';
import { ConnectDragPreview, ConnectDragSource, DragSource, DragSourceSpec} from 'react-dnd';
import { ConnectDropTarget, DropTarget, DropTargetMonitor, DropTargetSpec } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { Types } from '../Constants';
import Card from './Card/Card';

const cardSource: DragSourceSpec<DraggableCardProps, any> = {
  beginDrag(props: DraggableCardProps) {
    console.log('Start drag ' + props.name + ' ' + props.id);
    return {
      id: props.id,
      name: props.name
    };
  },
  endDrag(props: DraggableCardProps) {
    console.log('end drag ' + props.name);
    return {
      id: props.id,
      name: props.name
    };
  }
};

const cardTarget: DropTargetSpec<DraggableCardProps> = {
  hover(props: DraggableCardProps, monitor: DropTargetMonitor) {
    const draggedId = (monitor.getItem() as DraggableCardProps).id;
    console.log('hover: ' + draggedId + ' ' + props.id);
    if (draggedId !== props.id) {
      if (props.moveCard) {
        props.moveCard(draggedId, props.id);
      } else {
        throw console.error();
      }
    }
  },
  canDrop(props: DraggableCardProps, monitor: DropTargetMonitor) {
    console.log('Can drop ' + props.name);
    return true;
  }
};

interface DraggableCardProps {
  connectDragPreview?: ConnectDragPreview;
  connectDragSource?: ConnectDragSource;
  isDragging?: boolean;
  connectDropTarget?: ConnectDropTarget;
  moveCard?: (id: number, afterId: number) => void;
  name: string;
  id: number;
  key: number;
  top?: number;
  left?: number;
}

@DropTarget(Types.CARD, cardTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))
@DragSource(Types.CARD, cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
}))
export default class DraggableCard extends React.Component<DraggableCardProps, any> {

  // remove this code to return drag prevew  
  public componentDidMount() {
      const { connectDragPreview } = this.props;
      if (connectDragPreview) {
          // Use empty image as a drag preview so browsers don't draw it
          // and we can draw whatever we want on the custom drag layer instead.
          connectDragPreview(getEmptyImage(), {
              // IE fallback: specify that we'd rather screenshot the node
              // when it already knows it's being dragged so we can hide it with CSS.
              captureDraggingState: true,
          });
      }
  }

  public render() {
    const {
            isDragging,
            connectDragSource,
            connectDropTarget,
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
            <div style = {{height: '100%'}}>
                <Card
                    name={this.props.name}
                    opacity={opacity}/>
            </div>
          ),
        )
      );
    } else {
      throw console.error();
    }
  }
}

