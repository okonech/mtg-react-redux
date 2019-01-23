import * as React from 'react';
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

const CardStyle = noSelect({
  position: 'relative',
  border: '2px',
  borderRadius: '6%',
  margin: '1px'
});

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

export default class Card extends React.PureComponent<CardProps & SelectableInjectedProps> {

  public render() {
    const { name, opacity, visible, selectableRef, selected, selecting, cardHeight } = this.props;
    const cardStyle = {
      ...CardStyle,
      opacity,
      display: visible ? 'block' : 'none',
      // purble selecting, red selected, black default
      border: selected ? '1px solid red' : selecting ? '1px solid rebeccapurple' : '1px solid black',
      // todo: convert to memoized function that takes props and returns style obj
      height: `${cardHeight}vh`,
      width: `${cardHeight * 0.716}vh`
    };
    return (
      <div ref={selectableRef} style={cardStyle}>
        <img style={ImgStyle} src='/images/cardback.jpg' width='745' height='1080' />
        <div style={CardTextStyle}>
          {name}
        </div>
      </div>
    );
  }
}
