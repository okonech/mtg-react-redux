import update from 'immutability-helper';
import React from 'react';
import {ConnectDropTarget, DropTarget, DropTargetSpec} from 'react-dnd';
import CardCustomDragLayer from '../../components/Card/CardCustomDragLayer';
import DraggableCard from '../../components/DraggableCard';
import {Types} from '../../Constants';
import {Card as CardProp} from '../../reduxDefs/stateInterface';

const HandStyle: React.CSSProperties = {
  height: '100%',
  width: '96%',
  display: 'flex',
  overflowX: 'scroll',
  marginLeft: '2%',
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
    cards: CardProp[];
    connectDropTarget?: ConnectDropTarget;
    isOver?: boolean;
    canDrop?: boolean;
}

interface HandState {
    cardsById: {};
    cardsByIndex: CardProp[];
    frameUpdate: {frame: number, func: {}};
}

@DropTarget(Types.CARD, handTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))
export default class Hand extends React.Component<HandProps, HandState> {

  constructor(props: HandProps) {
    super(props);

    this.moveCard = this.moveCard.bind(this);
    this.drawFrame = this.drawFrame.bind(this);

    const cardsByIndex = [];
    const cardsById = {};

    for (let i = 0; i < props.cards.length; i += 1) {
      const card = props.cards[i];
      cardsById[card.id] = card;
      cardsByIndex[i] = card;
    }

    const frameUpdate = {
      frame: -1,
      func: {}};

    this.state = {
      cardsById,
      cardsByIndex,
      frameUpdate
    };

  }

  public moveCard(id: number, afterId: number) {
    console.log('movecard');
    const { cardsById, cardsByIndex } = this.state;

    const card = cardsById[id];
    const afterCard = cardsById[afterId];

    const cardIndex = cardsByIndex.indexOf(card);
    const afterIndex = cardsByIndex.indexOf(afterCard);

    this.scheduleUpdate({
      cardsByIndex: {
        $splice: [[cardIndex, 1], [afterIndex, 0, card]],
      },
    });
  }

  public componentWillUnmount() {
    if (this.state.frameUpdate.frame > 0) {
      cancelAnimationFrame(this.state.frameUpdate.frame);
    }
  }

  public scheduleUpdate(updateFn: {}) {
    this.state.frameUpdate.func = updateFn;

    if (this.state.frameUpdate.frame < 0 ) {
      this.state.frameUpdate.frame = requestAnimationFrame(this.drawFrame);
    }
  }

  public drawFrame() {
    const nextState = update(this.state, this.state.frameUpdate.func);
    this.setState(nextState);

    this.state.frameUpdate.frame = -1;
    this.state.frameUpdate.func = {};
  }

  public render() {
    const cards = this.state.cardsByIndex.map((card: CardProp) => (
        <DraggableCard
          name={card.name}
          id={card.id}
          key={card.id}
          moveCard={this.moveCard}
        />
      ));

    return (
        <section style = {HandStyle}>
          {cards}
          <CardCustomDragLayer
            snapToGrid={true}
          />
        </section>
    );
  }
}
