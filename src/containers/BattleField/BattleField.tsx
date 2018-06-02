import React from 'react';
import {ConnectDropTarget, DropTarget, DropTargetCollector, DropTargetSpec} from 'react-dnd';
import Card from '../../components/Card/Card';
import {Types} from '../../Constants';

const FullSizeStyle = {
    height: '100%',
    width: '100%'
  };

const dropTargetSpec: DropTargetSpec<BattleFieldProps> = {
    canDrop(props) {
        // console.log('Can drop battlefield' + props.cards.length);
        return true;
    },
    drop(props) {
        return true;
    }
};

interface BattleFieldProps {
    cards: string[];
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

class BattleField extends React.Component<BattleFieldProps, BattleFieldState>  {
    public render() {
        const cards = this.props.cards.map((name: string, index: number) => (
          <Card
            name={name}
            id={index}
            key={index}
          />
        ));

        return (
            <div style = {FullSizeStyle}>
            {cards}
            </div>
        );
    }
}

export default DropTarget(Types.CARD, dropTargetSpec, collect)(BattleField);