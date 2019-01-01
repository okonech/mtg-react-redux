import update from 'immutability-helper';
import React from 'react';
import { ConnectDropTarget, DropTarget, DropTargetSpec } from 'react-dnd';
import DraggableCard from '../components/DraggableCard';
import { Types } from '../Constants';
import { Card } from '../reducers/cardsReducer';

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
  }
};

interface HandProps {
  zone: {
    id: string;
    cards: Card[];
  };
  connectDropTarget?: ConnectDropTarget;
  isOver?: boolean;
  canDrop?: boolean;
  moveCard: (fromZone: string, fromIdx: number, toZone: string, toIdx: number) => void;
}

interface HandState {
  cards: Card[];
}

class Hand extends React.Component<HandProps, HandState> {

  constructor(props: HandProps) {
    super(props);

    this.hoverMoveCard = this.hoverMoveCard.bind(this);
    this.hoverFindCard = this.hoverFindCard.bind(this);

    this.state = {
      cards: props.zone.cards
    };

  }

  private hoverMoveCard(id: string, atIndex: number) {
    const { card, index } = this.hoverFindCard(id);
    this.setState(
      update(this.state, {
        cards: {
          $splice: [[index, 1], [atIndex, 0, card]]
        }
      })
    );
  }

  private hoverFindCard(id: string) {
    const { cards } = this.state;
    const card = cards.filter((c) => c.id === id)[0];

    return {
      card,
      index: cards.indexOf(card)
    };
  }

  public render() {
    const { moveCard, zone } = this.props;
    const cards = this.state.cards.map((card: Card, indexOf: number) => {
      const curriedMoveCard = (toId: string, toIdx: number) => moveCard(zone.id, indexOf, toId, toIdx);
      return (
        <DraggableCard
          zoneId={zone.id}
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
