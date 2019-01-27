
import React from 'react';
import {
  ConnectDragPreview, ConnectDragSource, ConnectDropTarget, DragSource,
  DragSourceSpec, DropTarget, DropTargetSpec, XYCoord
} from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { SelectableGroup, SelectableItem } from 'react-selectable-fast';
import { defaultMemoize } from 'reselect';
import { selectCards as selectCardsType } from '../actions/selectActions';
import { moveCards as moveCardsType } from '../actions/zonesActions';
import Card from '../components/Card';
import DraggableCard, { CardDragObject } from '../components/DraggableCard';
import { Types } from '../Constants';
import { CardZone } from '../selectors/player';
import { coordInNode, vhToPx } from '../util/coordinates';

// todo: maybe have hand and battlefield import the same class that contains the common pieces later

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
  height: 'calc(100% - 5px)',
  width: '100%',
  display: 'flex'
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

interface HandSourceCollectedProps {
  connectDragSource: ConnectDragSource;
  connectDragPreview: ConnectDragPreview;
  isDragging: boolean;
}

interface HandState {
  placeholderIndex: number;
  selectEnabled: boolean;
}

const handTarget: DropTargetSpec<HandProps> = {
  hover(props, monitor, component: Hand) {
    const placeholderIndex = getPlaceholderIndex(coordInNode(component, monitor.getClientOffset()), props.cardHeight);
    component.setState({ placeholderIndex });
  },
  drop(props, monitor, component: Hand) {
    const { moveCards, zone } = props;
    const { zoneId, cards } = monitor.getItem() as CardDragObject;
    const { placeholderIndex } = component.state;
    moveCards(zoneId, cards, zone.id, placeholderIndex, 0, 0);
  }
};

const handSource: DragSourceSpec<HandProps, CardDragObject> = {

  beginDrag(props, monitor, component: Hand) {

    const { selected, zone, selectCards, cardHeight } = props;
    console.log('Start drag ' + selected);

    const coord = coordInNode(component, monitor.getInitialClientOffset());

    const idx = getPlaceholderIndex(coord, cardHeight);
    const { name, id } = zone.cards[idx] || { name: 'Fail', id: '1232132' };

    const cards = [...selected];
    if (!cards.includes(id)) {
      cards.push(id);
    }
    selectCards(cards);

    const cardWidthPx = vhToPx(cardHeight) / 1.45;

    return {
      cards,
      firstName: name,
      zoneId: zone.id,
      initialX: coord.x - (cardWidthPx * (idx)) - cardWidthPx / 2,
      initialY: coord.y
    };
  },

  endDrag(props, monitor) {
    console.log('End drag ' + props.selected);
    // todo: move drop call logic into droptarget drop method
    // also add droptarget drop on hand and battlefield, putting cards at end of list

    // trello board handles preview drag by passing isover as a prop, and adding a moved 
    // placeholder in the render method
    // do this with cards for sort
  }
};

// coord in node and cardheight
const getPlaceholderIndex = defaultMemoize((coord: XYCoord, cardHeight: number): number => {

  const cardWidthPx = vhToPx(cardHeight) / 1.45;
  const halfCardWidthPx = cardWidthPx / 2;
  const { x } = coord;

  if (x < halfCardWidthPx) {
    return 0; // place at the start
  }
  return Math.floor((x - halfCardWidthPx) / (cardWidthPx));
});

type AllProps = HandProps & HandSourceCollectedProps & HandTargetCollectedProps;
class Hand extends React.PureComponent<AllProps, HandState> {

  constructor(props: AllProps) {
    super(props);

    this.state = {
      placeholderIndex: undefined,
      selectEnabled: true
    };
  }

  public componentDidMount() {
    const { connectDragPreview } = this.props;
    if (connectDragPreview) {
      // Use empty image as a drag preview so browsers don't draw it
      // and we can draw whatever we want on the custom drag layer instead.
      connectDragPreview(getEmptyImage(), {
        // IE fallback: specify that we'd rather screenshot the node
        // when it already knows it's being dragged so we can hide it with CSS.
        captureDraggingState: true
      });
    }
  }

  public setSelected = (items: SelectableItem[]) => this.props.selectCards(items.map((item) => item.props.id));

  public clearSelected = () => this.props.selectCards([]);

  public selectDisabled = (event: any) => (this.props.item ? null : this.setState({ selectEnabled: false }));

  public selectEnabled = (event: any) => (this.props.item ? null : this.setState({ selectEnabled: true }));

  public render() {
    const { zone, connectDropTarget, connectDragSource, isOver, canDrop, item, selected, cardHeight } = this.props;
    const { placeholderIndex, selectEnabled } = this.state;
    const cards = zone.cards.reduce((acc, curr) => {
      if (canDrop && item.cards.includes(curr.id)) {
        return acc;
      }
      acc.push(
        <DraggableCard
          zoneId={zone.id}
          name={curr.name}
          id={curr.id}
          key={'draggable' + curr.id}
          onMouseEnter={this.selectDisabled}
          onMouseLeave={this.selectEnabled}
          selected={selected.includes(curr.id)}
          cardHeight={cardHeight}
        />
      );
      return acc;
    },                              []);

    if (isOver && canDrop) {
      cards.splice(placeholderIndex, 0, (
        <Card
          key={'handplaceholder'}
          name={'placeholder'}
          opacity={0}
          cardHeight={cardHeight}
        />
      ));
    }

    return (
      connectDragSource(
        connectDropTarget(
          <div
            style={SelectableStyle}
            onMouseEnter={this.selectEnabled}
          >
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
        )
      )
    );
  }
}

export default DragSource<HandProps, HandSourceCollectedProps>(
  Types.CARD, handSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }))(DropTarget<HandProps, HandTargetCollectedProps>(Types.CARD, handTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
    item: monitor.getItem()
  }))(Hand));
