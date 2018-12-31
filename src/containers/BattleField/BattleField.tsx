import update from 'immutability-helper';
import React from 'react';
import { ConnectDropTarget, DropTarget, DropTargetSpec } from 'react-dnd';
import DraggableCard from '../../components/DraggableCard';
import { Types } from '../../Constants';
import { Card } from '../../reducers/cardsReducer';

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
}

const CardCellStyle: React.CSSProperties = {
    height: '25%',
    position: 'absolute'
};

class BattleField extends React.Component<BattleFieldProps, {}>  {

    constructor(props: BattleFieldProps) {
        super(props);

        this.moveCard = this.moveCard.bind(this);
        this.findCard = this.findCard.bind(this);

        this.state = {
            cards: props.zone.cards
        };

    }

    public render() {
        const cards = this.props.zone.cards.map((card: Card) => (
            <div style={CardCellStyle}>
                <DraggableCard
                    name={card.name}
                    id={card.id}
                    key={card.id}
                    moveCard={this.moveCard}
                    findCard={this.findCard}
                />
            </div>
        ));

        return (
            <section style={BattleFieldStyle}>
                {cards}
            </section>
        );
    }

    private moveCard(id: string, atIndex: number) {
        const { card, index } = this.findCard(id);
        this.setState(
            update(this.props.zone.cards,
                   {
                    $splice: [[index, 1], [atIndex, 0, card]]
                })
        );
    }

    private findCard(id: string) {
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
