import * as React from 'react';
import { defaultMemoize } from 'reselect';
import { noSelect } from '../util/styling';

// pure card render component

interface CardProps {
  opacity: number;
  visible: boolean;
  name: string;
  cardHeight: number;
}

interface SelectableInjectedProps {
  selectableRef?: string;
  selected?: boolean;
  selecting?: boolean;
}

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

const cardStyle = defaultMemoize((props: CardProps & SelectableInjectedProps): React.CSSProperties => {
  const { opacity, visible, selected, selecting, cardHeight } = props;
  return noSelect({
    position: 'relative',
    borderRadius: '6%',
    margin: '1px',
    opacity,
    display: visible ? 'block' : 'none',
    // purble selecting, red selected, black default
    border: selected ? '1px solid red' : selecting ? '1px solid rebeccapurple' : '1px solid black',
    // todo: convert to memoized function that takes props and returns style obj
    height: `${cardHeight}vh`,
    width: `${cardHeight * 0.716}vh`
  });
});

export default class Card extends React.PureComponent<CardProps & SelectableInjectedProps> {

  public render() {
    const props = this.props;
    const { name, selectableRef } = props;
    return (
      <div ref={selectableRef} style={cardStyle(props)}>
        <img style={ImgStyle} src='/images/cardback.jpg' width='745' height='1080' />
        <div style={CardTextStyle}>
          {name}
        </div>
      </div>
    );
  }
}
