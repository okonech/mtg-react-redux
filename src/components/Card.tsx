import React from 'react';
import { defaultMemoize } from 'reselect';
import { Card as CardType } from '../reducers/cardsReducer';
import { noSelect } from '../util/styling';

// pure card render component

interface CardProps {
  opacity: number;
  card: CardType;
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

const cardStyle = defaultMemoize((props: AllProps): React.CSSProperties => {
  const { opacity, selected, selecting, cardHeight } = props;
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
    height: `${cardHeight}vh`,
    width: `${cardHeight * 0.716}vh`
  });
});

const Card = (props: AllProps) => {

  const { card, selectableRef } = props;
  const { name, url } = card;
  return (
    <div ref={selectableRef} style={cardStyle(props)}>
      <img style={ImgStyle} src={url} width='745' height='1080' />
      <div style={CardTextStyle}>
        {name}
      </div>
    </div>
  );
};

export default Card;
