
import React from 'react';
import { ConnectDropTarget, DropTarget, DropTargetSpec } from 'react-dnd';
import { findDOMNode } from 'react-dom';
import { SelectableGroup, SelectableItem } from 'react-selectable-fast';
import { selectCards as selectCardsType } from '../actions/selectActions';
import { moveCards as moveCardsType } from '../actions/zonesActions';
import DraggableCard, { CardDragObject } from '../components/DraggableCard';
import { Types } from '../Constants';
import { CardCoordZone } from '../selectors/player';

const BattleFieldStyle: React.CSSProperties = {
    height: '100%',
    width: '100%',
    backgroundColor: 'green'
};

const SelectableStyle: React.CSSProperties = {
    height: '100%',
    width: '100%'
};

const battlefieldTarget: DropTargetSpec<BattleFieldProps> = {
    hover(props, monitor, component: BattleField) {
        // chrome hack since chrome dislikes item allowing drop over itself
        // https://github.com/react-dnd/react-dnd/issues/766
        const { cards } = monitor.getItem();
        cards.forEach((id) => document.getElementById(id).style.display = 'none');
    },
    drop(props, monitor, component: BattleField) {
        const { moveCards, selectCards, zone } = props;
        const { zoneId, cards, initialX, initialY } = monitor.getItem() as CardDragObject;
        const node = findDOMNode(component) as Element;
        const bounds = node.getBoundingClientRect();
        const xCoord = monitor.getClientOffset().x - bounds.left - initialX;
        const yCoord = monitor.getClientOffset().y - bounds.top - initialY;

        cards.forEach((id) => document.getElementById(id).style.display = 'block');

        moveCards(zoneId, cards, zone.id, zone.cards.length, xCoord, yCoord);
        selectCards([]);
    }
};
interface BattleFieldProps {
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

class BattleField extends React.PureComponent<BattleFieldProps & BattleFieldTargetCollectedProps, BattleFieldState>  {

    constructor(props: BattleFieldProps & BattleFieldTargetCollectedProps) {
        super(props);

        this.state = {
            selectEnabled: true
        };
    }

    public mouseEnter = ((event: any) => (this.props.dragItem ? null : this.setState({ selectEnabled: false })));

    public mouseLeave = ((event: any) => (this.props.dragItem ? null : this.setState({ selectEnabled: true })));

    public setSelected = (items: SelectableItem[]) => this.props.selectCards(items.map((item) => item.props.card.id));

    public clearSelected = () => this.props.selectCards([]);

    public render() {
        const { zone, connectDropTarget, selected, cardHeight, selectCards, style } = this.props;
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
                <div style={{ ...SelectableStyle, ...style }} >
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
                        <section style={BattleFieldStyle}>
                            {cards}
                        </section>
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
}))(BattleField);
