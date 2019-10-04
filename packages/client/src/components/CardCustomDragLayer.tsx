import * as React from 'react';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import { defaultMemoize } from 'reselect';
import { DragLayerProps } from '../containers/CardCustomDragLayer';
import { gameCardModelsMap } from '@mtg-react-redux/models';
import { getSnapEnabled, snapToGrid } from '../util/snapToGrid';
import { mapIdsToGameCardData } from '../selectors/player';
import { Types } from '../Constants';
import Badge from '@material-ui/core/Badge';
import Card from '../components/Card';

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
    selectedCards: ReturnType<typeof mapIdsToGameCardData>;
}

class CardCustomDragLayer extends React.PureComponent<DragLayerProps & CardCustomDragLayerProps> {

    public renderCards = defaultMemoize(
        (cardHeight: CardCustomDragLayerProps['cardHeight'], selectedCards: CardCustomDragLayerProps['selectedCards']): JSX.Element[] => {
            const renderCards = selectedCards.length > 5 ? selectedCards.slice(0, 5) : selectedCards;
            return renderCards.map((card, index) =>
                (
                    <div
                        style={cardStyle(cardHeight, index)}
                        key={`draglayer-${card.gameCard.id}`}
                    >
                        <Card
                            card={gameCardModelsMap.getModel(card)}
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
