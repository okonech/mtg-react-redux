import React, { Component } from 'react';
import { ConnectDragSource, DragSource, DragSourceCollector, DragSourceSpec } from 'react-dnd';
import { ConnectDropTarget, DropTarget, DropTargetCollector, DropTargetMonitor, DropTargetSpec } from 'react-dnd';
import { Types } from '../../Constants';
import {CardStyle} from './CardStyle';

const cardDragSpec: DragSourceSpec<CardProps> = {
  beginDrag(props: CardProps) {
    console.log('Start drag ' + props.name + ' ' + props.id);
    return {
      id: props.id,
      name: props.name
    };
  },
  endDrag(props) {
    console.log('end drag ' + props.name);
    return {
      id: props.id,
      name: props.name
    };
  }
};

const dropTargetSpec: DropTargetSpec<CardProps> = {
  hover(props: CardProps, monitor: DropTargetMonitor) {
    console.log(monitor.getItem());
    const draggedId = (monitor.getItem() as CardProps).id;
    console.log('hover: ' + draggedId + ' ' + props.id);
    if (draggedId !== props.id) {
      if (props.moveCard) {
        props.moveCard(draggedId, props.id);
      } else {
        throw console.error();
      }
    }
  },
  canDrop(props: CardProps, monitor: DropTargetMonitor) {
    console.log('Can drop ' + props.name);
    return true;
  }
};

const collectDrop: DropTargetCollector = (connect) => {
  return {
    connectDropTarget: connect.dropTarget()
  };
};

const collectDrag: DragSourceCollector = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
};

interface CardProps {
  connectDragSource?: ConnectDragSource;
  isDragging?: boolean;
  connectDropTarget?: ConnectDropTarget;
  moveCard?: (id: number, afterId: number) => void;
  name: string;
  id: number;
  key: number;
}

class Card extends Component<CardProps, {}> {

  public render() {
    const connectDragSource = this.props!.connectDragSource;
    const connectDropTarget = this.props!.connectDropTarget;
    const isDragging = this.props.isDragging;
    // set currently dragged card to invisible while dragging it
    // gives appearance of the dragged card being the actual dragged card and not the copy
    const opacity = isDragging ? 0 : 1;
    if (connectDragSource && connectDropTarget) {
      return connectDragSource (
        connectDropTarget(
        <div style = {{ ...CardStyle, opacity }}>
          {this.props.name}
        </div>
      ));
    } else {
      throw console.error();
    }
  }
}
const HocDragCard = DragSource(Types.CARD, cardDragSpec, collectDrag)(Card);
export default DropTarget(Types.CARD, dropTargetSpec, collectDrop)(HocDragCard);
