import { BaseComponentProps } from '../util/styling';
import { createStyles, withStyles, WithStyles } from '@material-ui/styles';
import { gameCardModelsMap } from '@mtg-react-redux/models';
import { GameCardZone } from '../selectors/player';
import { HandMappedProps, HandTargetCollectedProps } from '../containers/Hand';
import { placeholderPrimitive } from '../util/card';
import { SelectableGroup } from '../packages/react-dnd-selectable';
import { Theme } from '@material-ui/core/styles';
import Card from './Card';
import DraggableCard from '../containers/DraggableCard';
import React from 'react';
import withScrolling from '@neises/pw-react-dnd-scrollzone';

const styles = (theme: Theme) => createStyles({
    main: {
        // instead of width, somehow fixes chrome overflow ???
        maxWidth: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        overflowX: 'hidden',
        overflowY: 'hidden',
        backgroundColor: theme.palette.background.paper
    },
    cards: {
        height: '100%',
        width: 'calc(100% - 24px)',
        display: 'flex',
        flexDirection: 'row',
        overflowX: 'auto',
        overflowY: 'hidden',
        scrollbarWidth: 'thin',
        marginLeft: '12px',
        marginRight: '12px',
        scrollbarColor: `${theme.palette.secondary.dark} ${theme.palette.action.hover}`,
        boxSizing: 'border-box',
        paddingTop: '3px'
    }
});

const ScrollingComponent: any = withScrolling('section' as any);

interface HandProps extends WithStyles<typeof styles>, BaseComponentProps {
    zone: GameCardZone;
    selected: string[];
    cardHeight: number;
}

type AllProps = HandProps & HandTargetCollectedProps & HandMappedProps;

interface HandState {
    placeholderIndex: number;
}

class Hand extends React.PureComponent<AllProps, HandState> {

    public state: HandState = {
        placeholderIndex: undefined
    };

    public setSelected = (items: string[]) => {
        if (items.length > 0) {
            this.props.selectCards(items);
        }
    }

    public clearSelected = () => {
        const { selectCards, selected } = this.props;
        if (selected.length > 0) {
            selectCards([]);
        }
    }

    public componentDidUpdate(prevProps: AllProps) {

        if (!prevProps.isOver && this.props.isOver) {
            // enter handler

            // chrome hack, can't send display none prop directly to card
            // https://github.com/react-dnd/react-dnd/issues/477
            const { cards } = this.props.dragItem;
            cards.forEach((id) => {
                const element = document.getElementById(id);
                if (element) {
                    element.style.display = 'none';
                }
            });
        }

    }

    public render() {
        const { zone, connectDropTarget, isOver, canDrop, selected, cardHeight, selectCards, style, classes } = this.props;
        const { placeholderIndex } = this.state;

        let indexShift = 0;
        let shownCount = 0;
        const cards = zone.cards.reduce((acc, curr) => {
            const gameCard = gameCardModelsMap.getModel(curr);
            acc.push(
                <DraggableCard
                    id={gameCard.id}
                    zoneId={zone.id}
                    card={gameCard}
                    key={'draggable-' + gameCard.id}
                    selectedCards={selected}
                    selectCards={selectCards}
                    cardHeight={cardHeight}
                />
            );
            // add to placeholder index for every hidden element up to desired index
            if (selected.includes(gameCard.id) && shownCount <= placeholderIndex) {
                indexShift++;
            } else {
                shownCount++;
            }
            return acc;
        }, []);

        if (isOver && canDrop) {
            cards.splice(placeholderIndex + indexShift, 0, (
                <Card key={'handplaceholder'} card={gameCardModelsMap.getModel(placeholderPrimitive)} opacity={0.2} cardHeight={cardHeight} />
            ));
        }

        return (
            connectDropTarget(
                <div className={classes.main} style={style} >
                    <SelectableGroup
                        groupId={`${zone.id}-selectable-group`}
                        onSelectionFinish={this.setSelected}
                        onSelectionClear={this.clearSelected}
                    >
                        <ScrollingComponent
                            className={classes.cards}
                        >
                            {cards}
                        </ScrollingComponent>
                    </SelectableGroup>
                </div >
            ));
    }
}

export default withStyles(styles)(Hand);
