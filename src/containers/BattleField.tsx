
import React from 'react';
import { ConnectDropTarget, DropTarget, DropTargetSpec } from 'react-dnd';
import DraggableCard from '../components/DraggableCard';
import { Types } from '../Constants';
import { Card } from '../reducers/cardsReducer';

const BattleFieldStyle: React.CSSProperties = {
    height: '100%',
    width: '100%',
    backgroundColor: 'green',
    position: 'relative'
};

const battlefieldTarget: DropTargetSpec<BattleFieldProps> = {
    canDrop(props) {
        // console.log('Can drop battlefield' + props.cards.length);
        return true;
    },
    drop(props) {
        return true;
    }
};

interface BattleFieldProps {
    zone: {
        id: string;
        cards: Card[];
    };
    connectDropTarget?: ConnectDropTarget;
    isOver?: boolean;
    canDrop?: boolean;
    moveCard: (fromZone: string, fromIdx: number, toZone: string, toIdx: number) => void;
}

class BattleField extends React.Component<BattleFieldProps, {}>  {

    constructor(props: BattleFieldProps) {
        super(props);

    }

    public render() {
        const { zone } = this.props;
        const cards = this.props.zone.cards.map((card: Card, indexOf: number) => {
            return (
                <DraggableCard
                    zoneId={zone.id}
                    originalIndex={indexOf}
                    name={card.name}
                    id={card.id}
                    key={card.id}
                />
            );
        });

        return (
            <section style={BattleFieldStyle}>
                {cards}
            </section>
        );
    }
}

export default DropTarget(Types.CARD, battlefieldTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
}))(BattleField);
