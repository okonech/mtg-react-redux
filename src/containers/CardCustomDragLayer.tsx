
import { Identifier } from 'dnd-core';
import { DragLayer, XYCoord } from 'react-dnd';
import CardCustomDragLayer, { CardCustomDragLayerProps } from '../components/CardCustomDragLayer';
import { CardDragObject } from '../components/DraggableCard';

export interface DragLayerProps {
    item?: CardDragObject;
    itemType?: Identifier;
    initialOffset?: XYCoord;
    currentOffset?: XYCoord;
    isDragging?: boolean;
}

export default DragLayer<CardCustomDragLayerProps, DragLayerProps>((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    currentOffset: monitor.getSourceClientOffset(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    isDragging: monitor.isDragging()
}))(CardCustomDragLayer);
