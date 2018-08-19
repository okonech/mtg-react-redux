import React, { Component } from 'react';
import { ConnectDragSource, DragSource, DragSourceCollector, DragSourceSpec } from 'react-dnd';
import { ConnectDropTarget, DropTarget, DropTargetCollector, DropTargetMonitor, DropTargetSpec } from 'react-dnd';
import { Types } from '../../Constants';

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

const CardStyle: React.CSSProperties = {
  // casting due to position being a choice of strings rather than string
  position: 'relative' as 'relative',
  minWidth: '14.9vh',
  margin: '1px 1px 1px 1px'
};

const ImgStyle: React.CSSProperties = {
  height: '100%',
  width: 'auto',
  display: 'block',
  borderRadius: '5%',
};

const CardTextStyle: React.CSSProperties = {
  // casting due to position being a choice of strings rather than string
  position: 'absolute' as 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
};

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
          <img style = {ImgStyle} src= '/images/cardback.jpg' width='745' height='1080' />
          <div style ={CardTextStyle}>
            {this.props.name}
          </div>
        </div>
      ));
    } else {
      throw console.error();
    }
  }
}
const HocDragCard = DragSource(Types.CARD, cardDragSpec, collectDrag)(Card);
export default DropTarget(Types.CARD, dropTargetSpec, collectDrop)(HocDragCard);
