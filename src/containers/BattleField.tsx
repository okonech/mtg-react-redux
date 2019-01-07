
import React from 'react';
import { ConnectDropTarget, DropTarget, DropTargetSpec } from 'react-dnd';
import DraggableCard, { CardDragObject } from '../components/DraggableCard';
import { Types } from '../Constants';
import { Card } from '../reducers/cardsReducer';

const BattleFieldStyle: React.CSSProperties = {
    height: '100%',
    width: '100%',
    backgroundColor: 'green',
    position: 'relative'
};

const battlefieldTarget: DropTargetSpec<BattleFieldProps> = {
    drop(props, monitor, component: BattleField) {
        const { moveCard, zone } = props;
        const { zoneId, originalIndex } = monitor.getItem() as CardDragObject;
        moveCard(zoneId, originalIndex, zone.id, zone.cards.length);
    }
};

interface BattleFieldTargetCollectedProps {
    connectDropTarget: ConnectDropTarget;
    isOver: boolean;
    canDrop: boolean;
    item: CardDragObject;
}

interface BattleFieldProps {
    zone: {
        id: string;
        cards: Card[];
    };
    moveCard: (fromZone: string, fromIdx: number, toZone: string, toIdx: number) => void;
}

class BattleField extends React.Component<BattleFieldProps & BattleFieldTargetCollectedProps, {}>  {

    public render() {
        const { zone, connectDropTarget } = this.props;
        const cards = this.props.zone.cards.map((card: Card, indexOf: number) => {
            return (
                <DraggableCard
                    zoneId={zone.id}
                    originalIndex={indexOf}
                    name={card.name}
                    id={card.id}
                    key={card.id}
                    percentHeight={30}
                />
            );
        });

        return (
            connectDropTarget(
                <section style={BattleFieldStyle}>
                    {cards}
                </section>
            )
        );
    }
}

export default DropTarget(Types.CARD, battlefieldTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
}))(BattleField);
