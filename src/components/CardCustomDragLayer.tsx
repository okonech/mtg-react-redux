import { Identifier } from 'dnd-core';
import * as React from 'react';
import { DragLayer, XYCoord } from 'react-dnd';
import { Types } from '../Constants';
import snapToGrid from '../util/snapToGrid';
import Card from './Card';

const layerStyles: React.CSSProperties = {
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: 100,
    left: 0,
    top: 0
};

function getItemStyles(props: DragLayerProps & CardCustomDragLayerProps) {
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

interface CardCustomDragLayerProps {
    cardHeight: number;
    snapToGrid?: boolean;
}

export interface DragLayerProps {
    item?: any;
    itemType?: Identifier;
    initialOffset?: XYCoord;
    currentOffset?: XYCoord;
    isDragging?: boolean;
}

class CardCustomDragLayer extends React.PureComponent<DragLayerProps & CardCustomDragLayerProps> {

    public render() {
        const { item, itemType, isDragging, cardHeight } = this.props;
        if (!isDragging || (itemType !== Types.CARD)) {
            return null;
        }
        return (
            <div style={{ ...getItemStyles(this.props), ...layerStyles }}>
                <Card
                    name={item.name}
                    opacity={.9}
                    visible={true}
                    cardHeight={cardHeight}
                />
            </div>
        );
    }
}

export default DragLayer<CardCustomDragLayerProps, DragLayerProps>((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging()
}))(CardCustomDragLayer);
