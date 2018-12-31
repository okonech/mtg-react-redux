import * as React from 'react';
import { DragLayer, XYCoord } from 'react-dnd';
import { Types } from '../../Constants';
import snapToGrid from '../../util/snapToGrid';
import Card from './Card';

const layerStyles: React.CSSProperties = {
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: 100,
    left: 0,
    top: 0,
    height: 'calc((100% - 60px)/3)'
};

function getItemStyles(props: CardCustomDragLayerProps) {
    const { currentOffset } = props;
    if (!currentOffset) {
        return {
            display: 'none'
        };
    }

    let { x, y } = currentOffset;

    if (props.snapToGrid) {
        [x, y] = snapToGrid(x, y);
    }
    const transform = `translate(${x}px, ${y}px)`;
    return {
        transform,
        WebkitTransform: transform
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

class CardCustomDragLayer extends React.Component<CardCustomDragLayerProps> {

    public render() {
        const { item, itemType, isDragging } = this.props;
        if (!isDragging || (itemType !== Types.CARD)) {
            return null;
        }
        return (
            <div style={{ ...getItemStyles(this.props), ...layerStyles }}>
                <Card
                    name={item.name}
                    opacity={.9}
                />
            </div>
        );
    }
}

export default DragLayer((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging()
}))(CardCustomDragLayer);
