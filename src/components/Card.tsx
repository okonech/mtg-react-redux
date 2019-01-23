import * as React from 'react';

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

const CardStyle: React.CSSProperties = {
  position: 'relative',
  margin: '1px',
  border: '1px'
};

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
      // find a way to get this to none, or just use border
      border: selecting ? '1px solid rebeccapurple' : 'none',
      backgroundColor: selected ? 'blue' : 'white',
      height: `${cardHeight}vh`
    };
    const cardTextStyle = {
      ...CardTextStyle
    };
    return (
      <div ref={selectableRef} style={cardStyle}>
        <img style={ImgStyle} src='/images/cardback.jpg' width='745' height='1080' />
        <div style={cardTextStyle}>
          {name}
        </div>
      </div>
    );
  }
}
