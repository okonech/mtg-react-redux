import * as React from 'react';
import { createSelectable } from 'react-selectable-fast';
import { defaultMemoize } from 'reselect';
import { cardSizeVh } from '../util/coordinates';
import Card from './Card';

// draggable card component with id, key, x, y position

export interface CardDragObject {
  cards: string[];
  firstName: string;
  zoneId: string;
  initialX: number;
  initialY: number;
}

const dragCardStyle = defaultMemoize((xCoord: number, yCoord: number): React.CSSProperties => {
  const transform = `translate3d(${Math.max(0, xCoord)}px, ${Math.max(0, yCoord)}px, 0)`;
  return (!!xCoord && !!yCoord) ? {
    position: 'absolute',
    transform,
    WebkitTransform: transform
  } : {};
});

interface DraggableCardProps {
  name: string;
  id: string;
  zoneId: string;
  onMouseEnter: (event) => void;
  onMouseLeave: (event) => void;
  selected: boolean;
  xCoord?: number;
  yCoord?: number;
}

interface SelectableProps {
  // passed through selectable state, do not use
  selectableRef?: string;
  selecting?: boolean;
}

type AllProps = DraggableCardProps & SelectableProps;

class DraggableCard extends React.PureComponent<AllProps> {

  public render() {
    const { name, id, selected, selecting, onMouseEnter, onMouseLeave, selectableRef, xCoord, yCoord } = this.props;
    const size = cardSizeVh();

    return (
      <div
        ref={selectableRef}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        style={{ ...dragCardStyle(xCoord, yCoord), height: `${size.height}vh` }}
      >
        <Card
          key={'card' + id}
          name={name}
          // set currently dragged card to invisible while dragging it
          // gives appearance of the dragged card being the actual dragged card and not the copy
          opacity={1}
          // this can cause chrome to not drag
          selected={selected}
          selecting={selecting}
          cardSizeVh={size}
        />
      </div>
    );
  }
}

export default createSelectable(DraggableCard);
