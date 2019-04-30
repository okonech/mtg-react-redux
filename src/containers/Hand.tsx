
import { createStyles } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import withScrolling from 'frontend-collective-react-dnd-scrollzone';
import React from 'react';
import { ConnectDropTarget, DropTarget, DropTargetMonitor, DropTargetSpec } from 'react-dnd';
import { findDOMNode } from 'react-dom';
import { SelectableGroup, SelectableItem } from 'react-selectable-fast';
import { selectCards as selectCardsType } from '../actions/selectActions';
import { moveCards as moveCardsType } from '../actions/zonesActions';
import Card from '../components/Card';
import DraggableCard, { CardDragObject } from '../components/DraggableCard';
import { Types } from '../Constants';
import { CardZone } from '../selectors/player';

const styles = (theme: Theme) => createStyles({
  main: {
    // instead of width, somehow fixes chrome overflow ???
    maxWidth: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    overflowX: 'hidden',
    overflowY: 'hidden',
    backgroundColor: theme.palette.background.paper
  },
  cards: {
    height: '100%',
    width: 'calc(100% - 18px)',
    display: 'flex',
    flexDirection: 'row',
    overflowX: 'auto',
    scrollbarWidth: 'thin',
    marginLeft: '9px',
    marginRight: '9px',
    scrollbarColor: `${theme.palette.secondary.dark} ${theme.palette.action.hover}`
  }
});

const ScrollingComponent = withScrolling('section');

const handTarget: DropTargetSpec<HandProps> = {
  hover(props: HandProps, monitor: DropTargetMonitor, component: Hand) {
    const node = findDOMNode(component) as Element;
    const { cards } = monitor.getItem();
    const placeholderIndex = getPlaceholderIndex(props.zone, monitor, node);
    component.setState({ placeholderIndex });

    // chrome hack since chrome dislikes item allowing drop over itself
    // https://github.com/react-dnd/react-dnd/issues/766
    cards.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        element.style.display = 'none';
      }
    });
  },
  drop(props: HandProps, monitor, component: Hand) {
    const { moveCards, selectCards, zone } = props;
    const { zoneId, cards } = monitor.getItem() as CardDragObject;
    const { placeholderIndex } = component.state;
    cards.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        element.style.display = 'block';
      }
    });
    moveCards(zoneId, cards, zone.id, placeholderIndex, 0, 0);
    selectCards([]);
  }
};

interface HandProps extends WithStyles<typeof styles> {
  zone: CardZone;
  moveCards: moveCardsType;
  selectCards: selectCardsType;
  selected: string[];
  cardHeight: number;
  style?: React.CSSProperties;
}

interface HandTargetCollectedProps {
  connectDropTarget: ConnectDropTarget;
  isOver: boolean;
  canDrop: boolean;
  dragItem: CardDragObject;
}

interface HandState {
  placeholderIndex: number;
  selectEnabled: boolean;
}

function getPlaceholderIndex(zone: CardZone, monitor: DropTargetMonitor, handElement: Element) {

  if (zone.cards.length === 0) {
    return 0;
  }
  const selectable = handElement.firstChild.lastChild as Element;
  const mouseX = monitor.getClientOffset().x;
  const bounds = handElement.getBoundingClientRect();
  // shift placeholder if x position more than card width / 2
  const xPos = mouseX - bounds.left + selectable.scrollLeft;

  let cardWidth = 0;

  // loop through cards until one with width is found, or return 0
  const cardElements = selectable.children;
  const len = cardElements.length;
  for (let idx = 0; idx < len; idx++) {
    cardWidth = cardElements[idx].clientWidth;
    if (cardWidth > 0) {
      break;
    }
  }

  if (cardWidth === 0) {
    // all elements hidden, place at 0 
    return 0;
  }
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

  public mouseEnter = (event: any) => (this.props.dragItem ? null : this.setState({ selectEnabled: false }));

  public mouseLeave = (event: any) => (this.props.dragItem ? null : this.setState({ selectEnabled: true }));

  public render() {
    const { zone, connectDropTarget, isOver, canDrop, selected, cardHeight, selectCards, style, classes } = this.props;
    const { placeholderIndex, selectEnabled } = this.state;

    let indexShift = 0;
    let shownCount = 0;
    const cards = zone.cards.reduce((acc, curr, idx) => {
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
      // add to placeholder index for every hidden element up to desired index
      if (selected.includes(curr.id) && shownCount <= placeholderIndex) {
        indexShift++;
      } else {
        shownCount++;
      }
      return acc;
    },                              []);

    if (isOver && canDrop) {
      cards.splice(placeholderIndex + indexShift, 0, (
        <Card
          key={'handplaceholder'}
          card={{ name: '', id: '', url: '/images/cardback.jpg' }}
          opacity={0.2}
          cardHeight={cardHeight}
        />
      ));
    }

    return (
      connectDropTarget(
        <div className={classes.main} style={style} >
          <SelectableGroup
            id={'selectable' + zone.id}
            className='selectable'
            tolerance={0}
            deselectOnEsc={true}
            disabled={!selectEnabled}
            resetOnStart={true}
            onSelectionFinish={this.setSelected}
            onSelectionClear={this.clearSelected}
          >
            <ScrollingComponent
              className={classes.cards}
            >
              {cards}
            </ScrollingComponent>
          </SelectableGroup>
        </div >
      ));
  }
}

export default withStyles(styles)(
  DropTarget<HandProps, HandTargetCollectedProps>(Types.CARD, handTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
    dragItem: monitor.getItem()
  }))(Hand));
