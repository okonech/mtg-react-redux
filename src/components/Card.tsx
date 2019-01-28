import React from 'react';
import { defaultMemoize } from 'reselect';
import { noSelect } from '../util/styling';

// pure card render component

interface CardProps {
  opacity: number;
  name: string;
  cardHeight: number;
}

interface SelectableProps {
  selectableRef?: string;
  selected?: boolean;
  selecting?: boolean;
}

type AllProps = CardProps & SelectableProps;

const ImgStyle: React.CSSProperties = {
  height: '100%',
  width: 'auto',
  display: 'block',
  borderRadius: '5%'
};

const CardTextStyle: React.CSSProperties = {
  position: 'absolute',
  top: 5,
  left: 5,
  height: 'calc(100% - 10px)',
  width: 'calc(100% - 1em)',
  wordWrap: 'break-word',
  overflowWrap: 'break-word',
  textOverflow: 'clip',
  overflow: 'hidden'
};

// enforces strict adherence to height/width, border and margin overflow
const cardContainerStyle = defaultMemoize((props: AllProps): React.CSSProperties => {
  const { cardHeight } = props;
  return {
    height: `${cardHeight}vh`,
    width: `${cardHeight / 1.395973}vh`
  };
});

const cardStyle = defaultMemoize((props: AllProps): React.CSSProperties => {
  const { opacity, selected, selecting } = props;
  return noSelect({
    position: 'relative',
    borderRadius: '6%',
    margin: '1px',
    opacity,
    display: 'block',
    boxSizing: 'border-box',
    // purble selecting, red selected, black default
    border: selected ? '1px solid red' : selecting ? '1px solid rebeccapurple' : '1px solid black',
    // todo: convert to memoized function that takes props and returns style obj
    height: `100%`,
    width: `100%`
  });
});

const Card = (props: AllProps) => {

  const { name, selectableRef } = props;
  return (
    <div ref={selectableRef} style={cardStyle(props)}>
      <img style={ImgStyle} src='/images/cardback.jpg' width='745' height='1080' />
      <div style={CardTextStyle}>
        {name}
      </div>
    </div>
  );
};

export default Card;
