
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
    drop(props, monitor, component: BattleField) {
        const { moveCards, zone } = props;
        const { zoneId, id, initialX, initialY } = monitor.getItem() as CardDragObject;
        const node = findDOMNode(component) as Element;
        const bounds = node.getBoundingClientRect();

        const xCoord = monitor.getClientOffset().x - bounds.left - initialX;
        const yCoord = monitor.getClientOffset().y - bounds.top - initialY;

        moveCards(zoneId, [id], zone.id, zone.cards.length, xCoord, yCoord);
    }
};
interface BattleFieldProps {
    zone: CardCoordZone;
    moveCards: moveCardsType;
    selectCards: selectCardsType;
    selected: string[];
    cardHeight: number;
}

interface BattleFieldTargetCollectedProps {
    connectDropTarget: ConnectDropTarget;
    isOver: boolean;
    canDrop: boolean;
    item: CardDragObject;
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

    public mouseEnter = ((event: any) => (this.props.item ? null : this.setState({ selectEnabled: false })));

    public mouseLeave = ((event: any) => (this.props.item ? null : this.setState({ selectEnabled: true })));

    public setSelected = (items: SelectableItem[]) => this.props.selectCards(items.map((item) => item.props.id));

    public clearSelected = () => this.props.selectCards([]);

    public render() {
        const { zone, connectDropTarget, selected, cardHeight } = this.props;
        const { selectEnabled } = this.state;
        const cards = this.props.zone.cards.map((card, indexOf: number) => {
            return (
                <DraggableCard
                    zoneId={zone.id}
                    name={card.name}
                    id={card.id}
                    key={'draggable' + card.id}
                    onMouseEnter={this.mouseEnter}
                    onMouseLeave={this.mouseLeave}
                    stateSelected={selected.includes(card.id)}
                    cardHeight={cardHeight}
                    xCoord={card.xCoord}
                    yCoord={card.yCoord}
                />
            );
        });

        return (
            connectDropTarget(
                <div style={SelectableStyle} >
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
    canDrop: monitor.canDrop()
}))(BattleField);
