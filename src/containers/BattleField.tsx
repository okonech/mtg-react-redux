
import { createStyles } from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles';
import React from 'react';
import { ConnectDropTarget, DropTarget, DropTargetSpec } from 'react-dnd';
import { findDOMNode } from 'react-dom';
import { SelectableGroup, SelectableItem } from 'react-selectable-fast';
import { selectCards as selectCardsType } from '../actions/selectActions';
import { moveCards as moveCardsType } from '../actions/zonesActions';
import DraggableCard, { CardDragObject } from '../components/DraggableCard';
import { Types } from '../Constants';
import { CardCoordZone } from '../selectors/player';
import { setSnapEnabled, setSnapOverNode, snapToGrid } from '../util/snapToGrid';

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

        const node = findDOMNode(component) as Element;

        // TODO: fix snap logic here
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

interface BattleFieldState {
    selectEnabled: boolean;
}

type AllProps = BattleFieldProps & BattleFieldTargetCollectedProps;

class BattleField extends React.Component<AllProps, BattleFieldState>  {
    public battleFieldRef: React.RefObject<HTMLDivElement>;

    constructor(props: AllProps) {
        super(props);

        this.state = {
            selectEnabled: true
        };

        this.battleFieldRef = React.createRef();
    }

    public mouseEnter = ((event: any) => (this.props.dragItem ? null : this.setState({ selectEnabled: false })));

    public mouseLeave = ((event: any) => (this.props.dragItem ? null : this.setState({ selectEnabled: true })));

    public setSelected = (items: SelectableItem[]) => this.props.selectCards(items.map((item) => item.props.card.id));

    public clearSelected = () => this.props.selectCards([]);

    public componentDidUpdate(prevProps: AllProps) {

        if (!prevProps.isOver && this.props.isOver) {
            // enter handler
            setSnapEnabled(true);
            setSnapOverNode(this.battleFieldRef.current);

            // chrome hack since chrome dislikes item allowing drop over itself
            // https://github.com/react-dnd/react-dnd/issues/766
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
        const { selectEnabled } = this.state;
        const cards = zone.cards.reduce((acc, curr) => {

            acc.push(
                <DraggableCard
                    zoneId={zone.id}
                    card={curr}
                    key={'draggable' + curr.id}
                    onMouseEnter={this.mouseEnter}
                    onMouseLeave={this.mouseLeave}
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
                        ref={(ref) => ((window as any).selectableGroup = ref)}
                        className='selectable'
                        tolerance={0}
                        deselectOnEsc={true}
                        disabled={!selectEnabled}
                        resetOnStart={true}
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
