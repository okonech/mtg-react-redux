import * as React from 'react';
import { DragLayer, XYCoord } from 'react-dnd';
import { Types } from '../../Constants';
import snapToGrid from '../../util/snapToGrid';
import Card from './Card';

function getItemStyles(props: CardCustomDragLayerProps) {
    const { initialOffset, currentOffset } = props;
    if (!initialOffset || !currentOffset) {
        return {
            display: 'none',
        };
    }

    let { x, y } = currentOffset;

    if (props.snapToGrid) {
        x -= initialOffset.x;
        y -= initialOffset.y;
        [x, y] = snapToGrid(x, y);
        x += initialOffset.x;
        y += initialOffset.y;
    }

    const transform = `translate(${x}px, ${y}px)`;
    return {
        transform,
        WebkitTransform: transform,
    };
}

export interface CardCustomDragLayerProps {
    item?: any;
    itemType?: string;
    initialOffset?: XYCoord;
    currentOffset?: XYCoord;
    isDragging?: boolean;
    snapToGrid: boolean;
}


@DragLayer(monitor => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging()
  }))
export default class CardCustomDragLayer extends React.Component<CardCustomDragLayerProps> {

    public render() {
        const { item, itemType, isDragging } = this.props;
        if (!isDragging || itemType !== Types.CARD) {
            return null;
        }
        return (
            <div style={getItemStyles(this.props)}>
                <Card
                    name={item.name}
                    opacity={1}
                />
            </div>
        );
    }
}