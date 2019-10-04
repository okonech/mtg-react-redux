import { BaseComponentProps } from '../util/styling';
import { BattleFieldMappedProps, BattleFieldTargetCollectedProps } from '../containers/BattleField';
import { createStyles, withStyles, WithStyles } from '@material-ui/styles';
import { gameCardModelsMap } from '@mtg-react-redux/models';
import { GameCardZone } from '../selectors/player';
import { SelectableGroup } from '../packages/react-dnd-selectable';
import { setSnapEnabled, setSnapOverNode } from '../util/snapToGrid';
import { Theme } from '@material-ui/core/styles';
import DraggableCard from '../containers/DraggableCard';
import React from 'react';

type AllProps = BattleFieldProps & BattleFieldTargetCollectedProps & BattleFieldMappedProps;

interface BattleFieldProps extends WithStyles<typeof styles>, BaseComponentProps {
    zone: GameCardZone;
    selected: string[];
    cardHeight: number;
}

const styles = (theme: Theme) =>
    createStyles({
        main: {
            width: '100%',
            height: '100%',
            backgroundColor: theme.palette.background.default,
            boxSizing: 'border-box',
            borderBottom: `1px solid ${theme.palette.divider}`

        }
    });

class BattleField extends React.PureComponent<AllProps>  {
    public battleFieldRef: React.RefObject<HTMLDivElement>;

    constructor(props: AllProps) {
        super(props);

        this.battleFieldRef = React.createRef();
    }

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
            setSnapEnabled(true);
            setSnapOverNode(this.battleFieldRef.current);

            // chrome hack, can't send display none prop directly to card
            // https://github.com/react-dnd/react-dnd/issues/1085
            const { cards } = this.props.dragItem;
            cards.forEach((id) => {
                const element = document.getElementById(id);
                if (element) {
                    element.style.display = 'none';
                }
            });
        }

        if (prevProps.isOver && !this.props.isOver) {
            // leave handler
            setSnapEnabled(false);
        }

    }

    public render() {
        const { zone, connectDropTarget, selected, cardHeight, selectCards, setCardsFlipped, setCardsTapped, style, classes } = this.props;
        const cards = zone.cards.reduce((acc, curr) => {
            const gameCard = gameCardModelsMap.getModel(curr);
            acc.push(
                <DraggableCard
                    id={gameCard.id}
                    zoneId={zone.id}
                    card={gameCard}
                    key={'draggable - ' + gameCard.id}
                    selectedCards={selected}
                    selectCards={selectCards}
                    setCardsFlipped={setCardsFlipped}
                    setCardsTapped={setCardsTapped}
                    cardHeight={cardHeight}
                    xCoord={gameCard.x}
                    yCoord={gameCard.y}
                />
            );
            return acc;
        }, []);

        return (
            connectDropTarget(
                <div className={classes.main} style={style} ref={this.battleFieldRef}>
                    <SelectableGroup
                        groupId={`${zone.id}-selectable-group`}
                        onSelectionFinish={this.setSelected}
                        onSelectionClear={this.clearSelected}
                    >
                        {cards}
                    </SelectableGroup>
                </div >
            )
        );
    }
}

export default withStyles(styles)(BattleField);
