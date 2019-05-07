
import { Identifier } from 'dnd-core';
import { DragLayer, XYCoord } from 'react-dnd';
import CardCustomDragLayer, { CardCustomDragLayerProps } from '../components/CardCustomDragLayer';
import { CardDragObject } from '../components/DraggableCard';
import { WithSelectableDragLayer } from '../packages/react-dnd-selectable';

export interface DragLayerProps {
    item?: CardDragObject;
    itemType?: Identifier;
    currentOffset?: XYCoord;
    isDragging?: boolean;
    initialClientOffset?: XYCoord;
    currentClientOffset?: XYCoord;
}

export default DragLayer<CardCustomDragLayerProps, DragLayerProps>((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    currentOffset: monitor.getSourceClientOffset(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    isDragging: monitor.isDragging(),
    initialClientOffset: monitor.getInitialClientOffset(),
    currentClientOffset: monitor.getClientOffset()
}))(WithSelectableDragLayer(CardCustomDragLayer));
