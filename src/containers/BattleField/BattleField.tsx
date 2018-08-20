import React from 'react';
import {ConnectDropTarget, DropTarget, DropTargetSpec} from 'react-dnd';
import DraggableCard from '../../components/DraggableCard';
import {Types} from '../../Constants';
import {Card as CardProp} from '../../reduxDefs/stateInterface';

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
    cards: CardProp[];
    connectDropTarget?: ConnectDropTarget;
    isOver?: boolean;
    canDrop?: boolean;
}

interface BattleFieldState {
    items: any;
}

const CardCellStyle: React.CSSProperties = {
    height: '25%',
    position: 'absolute'
};

@DropTarget(Types.CARD, battlefieldTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  }))
export default class BattleField extends React.Component<BattleFieldProps, BattleFieldState>  {
    public render() {
        const cards = this.props.cards.map((card: CardProp) => (
            <div style = {{...CardCellStyle, top: card.top, left: card.left}}>
                <DraggableCard
                name={card.name}
                id={card.id}
                key={card.id}
                />
            </div>
          ));

        return (
            <section style = {BattleFieldStyle}>
                {cards}
            </section>
        );
    }
}
