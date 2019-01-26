import { Identifier } from 'dnd-core';
import * as React from 'react';
import { DragLayer, XYCoord } from 'react-dnd';
import { defaultMemoize } from 'reselect';
import { CardDragObject } from '../components/DraggableCard';
import { Types } from '../Constants';
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
    console.log(props.currentOffset);
    console.log(props.initialOffset);

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

const cardStyle = defaultMemoize((cardHeight: number, index: number): React.CSSProperties => (
    {
        position: 'absolute',
        top: cardHeight / 2 * index,
        left: cardHeight / 2 * index,
        zIndex: 100 - index
    }
));

interface CardCustomDragLayerProps {
    cardHeight: number;
    snapToGrid?: boolean;
}

export interface DragLayerProps {
    item?: CardDragObject;
    itemType?: Identifier;
    initialOffset?: XYCoord;
    currentOffset?: XYCoord;
    isDragging?: boolean;
}

class CardCustomDragLayer extends React.PureComponent<DragLayerProps & CardCustomDragLayerProps> {

    public renderCards = defaultMemoize((cards: string[], cardHeight: number, name: string): JSX.Element[] => (
        cards.map((card, index) => (
            <div
                style={cardStyle(cardHeight, index)}
                key={'draglayer' + card}
            >
                <Card
                    name={index === 0 ? name : ''}
                    opacity={.85}
                    cardHeight={cardHeight}
                />
            </div >
        ))));

    public render() {
        const { item, itemType, isDragging, cardHeight } = this.props;
        if (!isDragging || (itemType !== Types.CARD)) {
            return null;
        }
        const { cards, firstName } = item;
        return (
            <div style={layerStyle(this.props)}>
                {this.renderCards(cards, cardHeight, firstName)}
            </div>
        );
    }
}

export default DragLayer<CardCustomDragLayerProps, DragLayerProps>((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    currentOffset: monitor.getSourceClientOffset(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    isDragging: monitor.isDragging()
}))(CardCustomDragLayer);
