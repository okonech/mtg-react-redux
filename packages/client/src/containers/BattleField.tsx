
import { createStyles } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import React from 'react';
import { ConnectDropTarget, DropTarget, DropTargetSpec } from 'react-dnd';
import { SelectableGroup } from 'react-dnd-selectable';
import { findDOMNode } from 'react-dom';
import { selectCards as selectCardsType } from '../actions/selectActions';
import { moveCards as moveCardsType } from '../actions/zonesActions';
import { Types } from '../Constants';
import { CardCoordZone } from '../selectors/player';
import { setSnapEnabled, setSnapOverNode, snapToGrid } from '../util/snapToGrid';
import DraggableCard, { CardDragObject } from './DraggableCard';

const styles = (theme: Theme) => {
    return createStyles({
        main: {
            width: '100%',
            height: '100%',
            backgroundColor: theme.palette.background.default,
            boxSizing: 'border-box',
            borderBottom: `1px solid ${theme.palette.divider}`

        }
    });
};

const battlefieldTarget: DropTargetSpec<BattleFieldProps> = {
    drop(props: BattleFieldProps, monitor, component: BattleField) {
        const { moveCards, selectCards, zone } = props;
        const { zoneId, cards } = monitor.getItem() as CardDragObject;

        cards.forEach((id) => {
            const element = document.getElementById(id);
            if (element) {
                element.style.display = 'block';
            }
        });

        const node = findDOMNode(component) as Element;
        const bounds = node.getBoundingClientRect();
        const { x, y } = monitor.getSourceClientOffset();

        const { x: snapX, y: snapY } = snapToGrid({ x, y });

        const xCoord = snapX - bounds.left;
        const yCoord = snapY - bounds.top;

        moveCards(zoneId, cards, zone.id, zone.cards.length, xCoord, yCoord);
        selectCards([]);
    }
};
interface BattleFieldProps extends WithStyles<typeof styles> {
    zone: CardCoordZone;
    moveCards: moveCardsType;
    selectCards: selectCardsType;
    selected: string[];
    cardHeight: number;
    style?: React.CSSProperties;
}

interface BattleFieldTargetCollectedProps {
    connectDropTarget: ConnectDropTarget;
    isOver: boolean;
    canDrop: boolean;
    dragItem: CardDragObject;
}

type AllProps = BattleFieldProps & BattleFieldTargetCollectedProps;

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
            // https://github.com/react-dnd/react-dnd/issues/477
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
        const { zone, connectDropTarget, selected, cardHeight, selectCards, style, classes } = this.props;
        const cards = zone.cards.reduce((acc, curr) => {

            acc.push(
                <DraggableCard
                    id={curr.id}
                    zoneId={zone.id}
                    card={curr}
                    key={'draggable' + curr.id}
                    selectedCards={selected}
                    selectCards={selectCards}
                    cardHeight={cardHeight}
                    xCoord={curr.xCoord}
                    yCoord={curr.yCoord}
                />
            );
            return acc;
        },                              []);

        return (
            connectDropTarget(
                <div className={classes.main} style={style} ref={this.battleFieldRef}>
                    <SelectableGroup
                        groupId={`${zone.id}-selectable-group`}
                        className='selectable'
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

export default DropTarget(Types.CARD, battlefieldTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
    dragItem: monitor.getItem()
}))(withStyles(styles)(BattleField));
