import update from 'immutability-helper';
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

        this.hoverMoveCard = this.hoverMoveCard.bind(this);
        this.hoverFindCard = this.hoverFindCard.bind(this);

        this.state = {
            cards: props.zone.cards
        };

    }

    public render() {
        const { moveCard, zone } = this.props;
        const cards = this.props.zone.cards.map((card: Card, indexOf: number) => {
            const curriedMoveCard = (toId: string, toIdx: number) => moveCard(zone.id, indexOf, toId, toIdx);
            return (
                <DraggableCard
                    zoneId={zone.id}
                    originalIndex={indexOf}
                    name={card.name}
                    id={card.id}
                    key={card.id}
                    hoverMoveCard={this.hoverMoveCard}
                    hoverFindCard={this.hoverFindCard}
                    moveCard={curriedMoveCard}
                />
            );
        });

        return (
            <section style={BattleFieldStyle}>
                {cards}
            </section>
        );
    }

    private hoverMoveCard(id: string, atIndex: number) {
        const { card, index } = this.hoverFindCard(id);
        this.setState(
            update(this.props.zone.cards,
                   {
                    $splice: [[index, 1], [atIndex, 0, card]]
                })
        );
    }

    private hoverFindCard(id: string) {
        const { cards } = this.props.zone;
        const card = cards.filter((c) => c.id === id)[0];

        return {
            card,
            index: cards.indexOf(card)
        };
    }
}

export default DropTarget(Types.CARD, battlefieldTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
}))(BattleField);
