
import React from 'react';
import { ConnectDropTarget, DropTarget, DropTargetSpec } from 'react-dnd';
import { findDOMNode } from 'react-dom';
import { SelectableGroup, SelectableItem } from 'react-selectable-fast';
import { selectCards as selectCardsType } from '../actions/selectActions';
import { moveCards as moveCardsType } from '../actions/zonesActions';
import Card from '../components/Card';
import DraggableCard, { CardDragObject } from '../components/DraggableCard';
import { Types } from '../Constants';
import { CardZone } from '../selectors/player';

const HandStyle: React.CSSProperties = {
  height: '100%',
  width: '81vw',
  display: 'flex',
  overflowX: 'scroll',
  scrollbarWidth: 'thin',
  scrollbarColor: 'rebeccapurple gray',
  backgroundColor: 'gray',
  padding: '0px 2vw 0px 2vw'
};

const SelectableStyle: React.CSSProperties = {
  height: '100%',
  width: '100%',
  display: 'flex'
};

const handTarget: DropTargetSpec<HandProps> = {
  hover(props, monitor, component: Hand) {
    const node = findDOMNode(component) as Element;
    const bounds = node.getBoundingClientRect();
    const placeholderIndex = getPlaceholderIndex(monitor.getClientOffset().x, bounds.left, node.clientHeight / 1.45);
    component.setState({ placeholderIndex });
  },
  drop(props, monitor, component: Hand) {
    const { moveCards, zone } = props;
    const { zoneId, cards } = monitor.getItem() as CardDragObject;
    const { placeholderIndex } = component.state;
    moveCards(zoneId, cards, zone.id, placeholderIndex, 0, 0);
  }
};

interface HandProps {
  zone: CardZone;
  moveCards: moveCardsType;
  selectCards: selectCardsType;
  selected: string[];
  cardHeight: number;
}

interface HandTargetCollectedProps {
  connectDropTarget: ConnectDropTarget;
  isOver: boolean;
  canDrop: boolean;
  item: CardDragObject;
}

interface HandState {
  placeholderIndex: number;
  selectEnabled: boolean;
}

function getPlaceholderIndex(mouseX: number, componentX: number, cardWidth: number) {
  // shift placeholder if x position more than card width / 2
  const xPos = mouseX - componentX;
  const halfCardWidth = cardWidth / 2;

  if (xPos < halfCardWidth) {
    return 0; // place at the start
  }
  return Math.floor((xPos - halfCardWidth) / (cardWidth));

}

class Hand extends React.PureComponent<HandProps & HandTargetCollectedProps, HandState> {

  constructor(props: HandProps & HandTargetCollectedProps) {
    super(props);

    this.state = {
      placeholderIndex: undefined,
      selectEnabled: true
    };
  }

  public setSelected = (items: SelectableItem[]) => this.props.selectCards(items.map((item) => item.props.card.id));

  public clearSelected = () => this.props.selectCards([]);

  public mouseEnter = (event: any) => (this.props.item ? null : this.setState({ selectEnabled: false }));

  public mouseLeave = (event: any) => (this.props.item ? null : this.setState({ selectEnabled: true }));

  public render() {
    const { zone, connectDropTarget, item, isOver, canDrop, selected, cardHeight, selectCards } = this.props;
    const { placeholderIndex, selectEnabled } = this.state;

    // horrible hack to keep child mounted, so it can remain dragging but also look hidden
    const hiddenCards = [];
    let cards = zone.cards.reduce((acc, curr) => {
      if (canDrop && item.cards.includes(curr.id)) {
        hiddenCards.push(
          <DraggableCard
            zoneId={zone.id}
            card={curr}
            key={'draggable' + curr.id}
            onMouseEnter={this.mouseEnter}
            onMouseLeave={this.mouseLeave}
            selectedCards={selected}
            selectCards={selectCards}
            cardHeight={cardHeight}
          />
        );
        return acc;
      }
      acc.push(
        <DraggableCard
          zoneId={zone.id}
          card={curr}
          key={'draggable' + curr.id}
          onMouseEnter={this.mouseEnter}
          onMouseLeave={this.mouseLeave}
          selectedCards={selected}
          selectCards={selectCards}
          cardHeight={cardHeight}
        />
      );
      return acc;
    },                            []);

    if (isOver && canDrop) {
      cards.splice(placeholderIndex, 0,
                   (
          <Card
            key={'handplaceholder'}
            card={{ name: '', id: '', url: '/images/cardback.jpg' }}
            opacity={0.2}
            cardHeight={cardHeight}
          />
        ));
    }

    cards = [...cards, ...hiddenCards];

    return (
      connectDropTarget(
        <div style={SelectableStyle} >
          <SelectableGroup
            ref={(ref) => ((window as any).selectableGroup = ref)}
            className='selectable'
            tolerance={0}
            deselectOnEsc={true}
            disabled={!selectEnabled}
            resetOnStart={true}
            onSelectionFinish={this.setSelected}
            onSelectionClear={this.clearSelected}
          >
            <section style={HandStyle} >
              <div style={{ width: '1vw' }} />
              {cards}
            </section>
          </SelectableGroup>
        </div >
      ));
  }
}

export default DropTarget<HandProps, HandTargetCollectedProps>(Types.CARD, handTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
  item: monitor.getItem()
}))(Hand);
