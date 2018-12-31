import update from 'immutability-helper';
import React from 'react';
import { ConnectDropTarget, DropTarget, DropTargetSpec } from 'react-dnd';
import DraggableCard from '../components/DraggableCard';
import { Types } from '../Constants';
import { Card as CardProp } from '../reducers/cardsReducer';

const HandStyle: React.CSSProperties = {
  height: '100%',
  width: '96%',
  display: 'flex',
  overflowX: 'scroll',
  marginLeft: '2%'
};

const handTarget: DropTargetSpec<HandProps> = {
  canDrop(props) {
    // console.log('Can drop hand' + props.cards.length);
    return true;
  },
  drop(props) {
    return true;
  }
};

interface HandProps {
  zone: {
    id: string;
    cards: CardProp[];
  };
  connectDropTarget?: ConnectDropTarget;
  isOver?: boolean;
  canDrop?: boolean;
}

interface HandState {
  cards: CardProp[];
}

class Hand extends React.Component<HandProps, HandState> {

  constructor(props: HandProps) {
    super(props);

    this.moveCard = this.moveCard.bind(this);
    this.findCard = this.findCard.bind(this);

    this.state = {
      cards: props.zone.cards
    };

  }

  private moveCard(id: string, atIndex: number) {
    const { card, index } = this.findCard(id);
    this.setState(
      update(this.state, {
        cards: {
          $splice: [[index, 1], [atIndex, 0, card]]
        }
      })
    );
  }

  private findCard(id: string) {
    const { cards } = this.state;
    const card = cards.filter((c) => c.id === id)[0];

    return {
      card,
      index: cards.indexOf(card)
    };
  }

  public render() {
    const cards = this.state.cards.map((card: CardProp) => (
      <DraggableCard
        name={card.name}
        id={card.id}
        key={card.id}
        moveCard={this.moveCard}
        findCard={this.findCard}
      />
    ));

    return (
      <section style={HandStyle}>
        {cards}
      </section>
    );
  }
}

export default DropTarget(Types.CARD, handTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))(Hand);
