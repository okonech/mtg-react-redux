
import React from 'react';
import { ConnectDropTarget, DropTarget, DropTargetSpec } from 'react-dnd';
import { SelectableGroup, SelectableItem } from 'react-selectable-fast';
import { selectCards as selectCardsType } from '../actions/selectActions';
import { moveCards as moveCardsType } from '../actions/zonesActions';
import DraggableCard, { CardDragObject } from '../components/DraggableCard';
import { Types } from '../Constants';
import { Card } from '../reducers/cardsReducer';
import { CardZone } from '../selectors/player';

const BattleFieldStyle: React.CSSProperties = {
    height: '100%',
    width: '100%',
    backgroundColor: 'green',
    position: 'relative'
};

const SelectableStyle: React.CSSProperties = {
    height: '100%',
    width: '100%',
    display: 'flex'
};

const battlefieldTarget: DropTargetSpec<BattleFieldProps> = {
    drop(props, monitor, component: BattleField) {
        const { moveCards, zone } = props;
        const { zoneId, id } = monitor.getItem() as CardDragObject;
        moveCards(zoneId, [id], zone.id, zone.cards.length);
    }
};
interface BattleFieldProps {
    zone: CardZone;
    moveCards: moveCardsType;
    selectCards: selectCardsType;
    selected: string[];
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
        const { zone, connectDropTarget, selected } = this.props;
        const { selectEnabled } = this.state;
        const cards = this.props.zone.cards.map((card: Card, indexOf: number) => {
            return (
                <DraggableCard
                    zoneId={zone.id}
                    originalIndex={indexOf}
                    name={card.name}
                    id={card.id}
                    key={'draggable' + card.id}
                    percentHeight={30}
                    onMouseEnter={this.mouseEnter}
                    onMouseLeave={this.mouseLeave}
                    stateSelected={selected.includes(card.id)}
                    stateSelecting={false}
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
