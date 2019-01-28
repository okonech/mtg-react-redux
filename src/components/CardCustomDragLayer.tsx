import { Identifier } from 'dnd-core';
import * as React from 'react';
import { DragLayer, XYCoord } from 'react-dnd';
import { defaultMemoize } from 'reselect';
import { CardDragObject } from '../components/DraggableCard';
import { Types } from '../Constants';
import { cardSizeVh, Size } from '../util/coordinates';
import snapToGrid from '../util/snapToGrid';
import Card from './Card';

const layerStyle = defaultMemoize((props: DragLayerProps & CardCustomDragLayerProps): React.CSSProperties => {
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
        WebkitTransform: transform,
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: 100,
        left: 0,
        top: 0
    };
});

const cardStyle = defaultMemoize((size: Size, index: number): React.CSSProperties => (
    {
        position: 'absolute',
        top: size.height / 2 * index,
        left: size.width / 2 * index,
        zIndex: 100 - index
    }
));

interface CardCustomDragLayerProps {
    snapToGrid?: boolean;
}

export interface DragLayerProps {
    item?: CardDragObject;
    itemType?: Identifier;
    currentOffset?: XYCoord;
    isDragging?: boolean;
}

class CardCustomDragLayer extends React.PureComponent<DragLayerProps & CardCustomDragLayerProps> {

    public renderCards = defaultMemoize((cards: string[], size: Size, name: string): JSX.Element[] => {

        return cards.map((card, index) => (
            <div
                style={cardStyle(size, index)}
                key={'draglayer' + card}
            >
                <Card
                    name={index === 0 ? name : ''}
                    opacity={.85}
                    cardSizeVh={size}
                />
            </div>
        ));
    });

    public render() {
        const { item, itemType, isDragging } = this.props;
        const size = cardSizeVh();
        if (!isDragging || (itemType !== Types.CARD)) {
            return null;
        }
        const { cards, firstName } = item;
        return (
            <div style={layerStyle(this.props)}>
                {this.renderCards(cards, size, firstName)}
            </div>
        );
    }
}

export default DragLayer<CardCustomDragLayerProps, DragLayerProps>((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    currentOffset: monitor.getClientOffset(),
    isDragging: monitor.isDragging()
}))(CardCustomDragLayer);
