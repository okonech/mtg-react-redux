
import { createStyles } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import withScrolling from '@neises/pw-react-dnd-scrollzone';
import React from 'react';
import { ConnectDropTarget, DropTarget, DropTargetMonitor, DropTargetSpec } from 'react-dnd';
import { findDOMNode } from 'react-dom';
import { selectCards as selectCardsType } from '../actions/selectActions';
import { moveCards as moveCardsType } from '../actions/zonesActions';
import Card from '../components/Card';
import { Types } from '../Constants';
import SelectableGroup from '../packages/react-dnd-selectable/SelectableGroup';
import { CardZone } from '../selectors/player';
import { placeholderPrimitive } from '../util/card';
import { BaseComponentProps } from '../util/styling';
import DraggableCard, { CardDragObject } from './DraggableCard';

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
    width: 'calc(100% - 24px)',
    display: 'flex',
    flexDirection: 'row',
    overflowX: 'auto',
    overflowY: 'hidden',
    scrollbarWidth: 'thin',
    marginLeft: '12px',
    marginRight: '12px',
    scrollbarColor: `${theme.palette.secondary.dark} ${theme.palette.action.hover}`,
    boxSizing: 'border-box',
    paddingTop: '3px'
  }
});

const ScrollingComponent: any = withScrolling('section' as any);

const handTarget: DropTargetSpec<HandProps> = {
  hover(props: HandProps, monitor: DropTargetMonitor, component: Hand) {
    const node = findDOMNode(component) as Element;
    const placeholderIndex = getPlaceholderIndex(props.zone, monitor, node);
    if (component.state.placeholderIndex !== placeholderIndex) {
      component.setState({ placeholderIndex });
    }

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

interface HandProps extends WithStyles<typeof styles>, BaseComponentProps {
  zone: CardZone;
  moveCards: typeof moveCardsType;
  selectCards: typeof selectCardsType;
  selected: string[];
  cardHeight: number;
}

interface HandTargetCollectedProps {
  connectDropTarget: ConnectDropTarget;
  isOver: boolean;
  canDrop: boolean;
  dragItem: CardDragObject;
}

interface HandState {
  placeholderIndex: number;
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
  for (let idx = len - 1; idx >= 0; idx--) {
    cardWidth = cardElements[idx].clientWidth;
    if (cardWidth > 0) {
      break;
    }
  }

  if (cardWidth === 0) {
    // all elements hidden, place at 0 
    return 0;
  }

  if (xPos < cardWidth) {
    return 0; // place at the start
  }
  return Math.floor(xPos / cardWidth);

}

type AllProps = HandProps & HandTargetCollectedProps;

class Hand extends React.PureComponent<AllProps, HandState> {

  public state: HandState = {
    placeholderIndex: undefined
  };

  public setSelected = (items: string[]) => {
    if (items.length > 0) {
      this.props.selectCards(items);
    }
  }

  public clearSelected = () => {
    const { selectCards, selected } = this.props;
    if (selected.length > 0) {
      selectCards([]);
    }
  }

  public componentDidUpdate(prevProps: AllProps) {

    if (!prevProps.isOver && this.props.isOver) {
      // enter handler

      // chrome hack, can't send display none prop directly to card
      // https://github.com/react-dnd/react-dnd/issues/477
      const { cards } = this.props.dragItem;
      cards.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          element.style.display = 'none';
        }
      });
    }

  }

  public render() {
    const { zone, connectDropTarget, isOver, canDrop, selected, cardHeight, selectCards, style, classes } = this.props;
    const { placeholderIndex } = this.state;

    let indexShift = 0;
    let shownCount = 0;
    const cards = zone.cards.reduce((acc, curr, idx) => {
      acc.push(
        <DraggableCard
          id={curr.id}
          zoneId={zone.id}
          card={curr}
          key={'draggable-' + curr.id}
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
    }, []);

    if (isOver && canDrop) {
      cards.splice(placeholderIndex + indexShift, 0, (
        <Card key={'handplaceholder'} card={placeholderPrimitive} opacity={0.2} cardHeight={cardHeight} />
      ));
    }

    return (
      connectDropTarget(
        <div className={classes.main} style={style} >
          <SelectableGroup
            groupId={`${zone.id}-selectable-group`}
            className='selectable'
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
