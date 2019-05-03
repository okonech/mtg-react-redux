import Badge from '@material-ui/core/Badge';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { defaultMemoize } from 'reselect';
import Card from '../components/Card';
import { Types } from '../Constants';
import { DragLayerProps } from '../containers/CardCustomDragLayer';
import { Card as CardType } from '../reducers/cardsReducer';
import { getSnapEnabled, snapToGrid } from '../util/snapToGrid';

const styles = (theme: Theme) => {
    return createStyles({
        badge: {
            zIndex: 101
        }
    });
};

const layerStyle = defaultMemoize((props: DragLayerProps & CardCustomDragLayerProps): React.CSSProperties => {
    const { currentOffset } = props;
    if (!currentOffset) {
        return {
            display: 'none'
        };
    }

    let { x, y } = currentOffset;

    if (getSnapEnabled()) {
        ({ x, y } = snapToGrid(currentOffset));
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

export interface CardCustomDragLayerProps extends WithStyles<typeof styles> {
    cardHeight: number;
    snapToGrid?: boolean;
}

class CardCustomDragLayer extends React.PureComponent<DragLayerProps & CardCustomDragLayerProps> {

    public renderCards = defaultMemoize((cards: string[], cardHeight: number, firstCard: CardType): JSX.Element[] => {
        const renderCards = cards.length > 5 ? cards.slice(0, 5) : cards;
        return renderCards.map((cardId, index) => {
            const previewCard = { ...firstCard, id: `${firstCard.id}${index}` };
            return (
                <div
                    style={cardStyle(cardHeight, index)}
                    key={'draglayer' + cardId}
                >
                    <Card
                        card={previewCard}
                        opacity={.9}
                        cardHeight={cardHeight}
                    />
                </div >
            );
        });
    });

    public render() {
        const { item, itemType, isDragging, cardHeight, classes } = this.props;
        if (!isDragging || (itemType !== Types.CARD)) {
            return null;
        }
        const { cards, firstCard } = item;
        const length = cards.length;
        if (length > 3) {
            return (
                <Badge
                    badgeContent={length}
                    max={99}
                    color='primary'
                    style={layerStyle(this.props)}
                    classes={{ badge: classes.badge }}
                >
                    {this.renderCards(cards, cardHeight, firstCard)}
                </Badge>
            );
        }
        return (
            <div style={layerStyle(this.props)}>
                {this.renderCards(cards, cardHeight, firstCard)}
            </div>
        );
    }
}

export default withStyles(styles)(CardCustomDragLayer);
