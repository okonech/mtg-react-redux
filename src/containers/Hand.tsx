
import React from 'react';
import { ConnectDropTarget, DropTarget, DropTargetSpec } from 'react-dnd';
import { findDOMNode } from 'react-dom';
import { SelectableGroup } from 'react-selectable-fast';
import Card from '../components/Card';
import DraggableCard, { CardDragObject } from '../components/DraggableCard';
import { Types } from '../Constants';
import { Card as CardProp } from '../reducers/cardsReducer';

const HandStyle: React.CSSProperties = {
  height: '100%',
  width: '96%',
  display: 'flex',
  overflowX: 'scroll'
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
    const { moveCard, zone } = props;
    const { zoneId, originalIndex } = monitor.getItem() as CardDragObject;
    const { placeholderIndex } = component.state;
    moveCard(zoneId, originalIndex, zone.id, placeholderIndex);
  }
};

interface HandProps {
  zone: {
    id: string;
    cards: CardProp[];
  };
  moveCard: (fromZone: string, fromIdx: number, toZone: string, toIdx: number) => void;
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
  selectedKeys: string[];
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
      selectedKeys: [],
      selectEnabled: true
    };
  }

  public componentDidMount() {
    document.addEventListener('click', this.clearSelected);
  }

  public componentWillUnmount() {
    document.removeEventListener('click', this.clearSelected);
  }

  public setSelected = ((items: string[]) => this.setState({ selectedKeys: items }));

  public clearSelected = () => this.setState({ selectedKeys: [] });

  public mouseEnter = ((event: any) => (this.props.item ? null : this.setState({ selectEnabled: false })));

  public mouseLeave = ((event: any) => (this.props.item ? null : this.setState({ selectEnabled: true })));

  public render() {
    const { zone, connectDropTarget, isOver, canDrop, item } = this.props;
    const { placeholderIndex, selectEnabled, selectedKeys } = this.state;
    const cards = zone.cards.reduce((acc, curr, idx) => {
      if (isOver && canDrop && curr.id === item.id) {
        return acc;
      }
      acc.push(
        <DraggableCard
          zoneId={zone.id}
          originalIndex={idx}
          name={curr.name}
          id={curr.id}
          key={'draggable' + curr.id}
          percentHeight={100}
          onMouseEnter={this.mouseEnter}
          onMouseLeave={this.mouseLeave}
          selected={selectedKeys.includes(curr.id)}
          selecting={false}
        />
      );
      return acc;
    },                              []);

    if (isOver && canDrop) {
      cards.splice(placeholderIndex, 0,
                   (
          <Card
            key={'handplaceholder'}
            name={'placeholder'}
            opacity={0}
            visible={true}
          />
        ));
    }

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
            allowClickWithoutSelected={false}
            onSelection={this.setSelected}
            onSelectionClear={this.clearSelected}
          >
            <section style={HandStyle} >
              <div style={{ width: '2%' }} />
              {cards}
            </section>
          </SelectableGroup>
        </div >
      ));
  }

  public handleSelection(selectedKeys: string[]) {
    this.setState({ selectedKeys });
  }
}

export default DropTarget<HandProps, HandTargetCollectedProps>(Types.CARD, handTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
  item: monitor.getItem()
}))(Hand);
