import * as React from 'react';

// pure card render component

interface CardProps {
  opacity: number;
  visible: boolean;
  name: string;
}

interface SelectableInjectedProps {
  selectableRef?: string;
  selected?: boolean;
  selecting?: boolean;
}

const CardStyle: React.CSSProperties = {
  height: '100%',
  position: 'relative',
  margin: '0px 1px 0px 1px'
};

const ImgStyle: React.CSSProperties = {
  height: '100%',
  width: 'auto',
  display: 'block',
  borderRadius: '5%'
};

const CardTextStyle: React.CSSProperties = {
  position: 'absolute',
  top: 10,
  left: 5,
  height: '25%',
  width: 'calc(100% - 1em)',
  wordWrap: 'break-word',
  textOverflow: 'clip'
};

export default class Card extends React.Component<CardProps & SelectableInjectedProps> {

  public render() {
    const { name, opacity, visible, selectableRef, selected, selecting } = this.props;
    console.log(this.props);
    const cardStyle = {
      ...CardStyle,
      opacity,
      display: visible ? 'block' : 'none',
      backgroundColor: selected ? 'blue' : 'none',
      border: selecting ? 'blue' : 'none'
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
