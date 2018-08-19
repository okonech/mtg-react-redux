import React from 'react';
import {ConnectDropTarget, DropTarget, DropTargetCollector, DropTargetSpec} from 'react-dnd';
import Card from '../../components/Card/Card';
import {Types} from '../../Constants';
import {Card as CardProp} from '../../reduxDefs/stateInterface';

const FullSizeStyle: React.CSSProperties = {
    height: '100%',
    width: '100%',
    backgroundColor: 'green'
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

const collect: DropTargetCollector = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  };
};

const CardCellStyle: React.CSSProperties = {
    height: '33.3%'
};

class BattleField extends React.Component<BattleFieldProps, BattleFieldState>  {
    public render() {
        const cards = this.props.cards.map((card: CardProp) => (
            <div style = {CardCellStyle}>
                <Card
                name={card.name}
                id={card.id}
                key={card.id}
                />
            </div>
          ));

        return (
            <section style = {FullSizeStyle}>
            {cards}
            </section>
        );
    }
}

export default DropTarget(Types.CARD, battlefieldTarget, collect)(BattleField);