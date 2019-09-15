import Badge from '@material-ui/core/Badge';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import { CardModel } from '@mtg-react-redux/models';
import * as React from 'react';
import { defaultMemoize } from 'reselect';
import Card from '../components/Card';
import { Types } from '../Constants';
import { DragLayerProps } from '../containers/CardCustomDragLayer';
import { Card as CardType } from '../reducers/cardsReducer';
import { getSnapEnabled, snapToGrid } from '../util/snapToGrid';

const styles = () =>
    createStyles({
        badge: {
            zIndex: 101
        }
    });

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
        top: Math.floor(cardHeight / 1.75 * index),
        left: Math.floor(cardHeight / 1.75 * index),
        zIndex: 100 - index
    }
));

export interface CardCustomDragLayerProps extends WithStyles<typeof styles> {
    cardHeight: number;
    selectedCards: CardType[];
}

class CardCustomDragLayer extends React.PureComponent<DragLayerProps & CardCustomDragLayerProps> {

    public renderCards = defaultMemoize((cardHeight: number, selectedCards: CardType[]): JSX.Element[] => {
        const renderCards = selectedCards.length > 5 ? selectedCards.slice(0, 5) : selectedCards;
        return renderCards.reverse().map((card, index) =>
            (
                <div
                    style={cardStyle(cardHeight, index)}
                    key={`draglayer-${card.id}`}
                >
                    <Card
                        card={new CardModel({ ...card, id: `${card.id}-drag-preview` })}
                        opacity={.95}
                        cardHeight={cardHeight}
                    />
                </div >
            ));
    });

    public render() {
        const { itemType, isDragging, cardHeight, classes, selectedCards } = this.props;
        if (!isDragging || (itemType !== Types.CARD)) {
            return null;
        }
        const length = selectedCards.length;
        if (length > 3) {
            return (
                <Badge
                    badgeContent={length}
                    max={99}
                    color='primary'
                    style={layerStyle(this.props)}
                    classes={{ badge: classes.badge }}
                >
                    {this.renderCards(cardHeight, selectedCards)}
                </Badge>
            );
        }
        return (
            <div style={layerStyle(this.props)}>
                {this.renderCards(cardHeight, selectedCards)}
            </div>
        );
    }
}

export default withStyles(styles)(CardCustomDragLayer);
