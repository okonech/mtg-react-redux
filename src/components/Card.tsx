import * as React from 'react';

// pure card render component

interface CardProps {
  opacity: number;
  visible: boolean;
  name: string;
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
  width: 'calc(100% - 1em)'
};

export default class Card extends React.Component<CardProps, {}> {

  public render() {
    const { opacity, visible } = this.props;
    return (
      <div style={{ ...CardStyle, opacity, display: visible ? 'block' : 'none' }}>
        <img style={ImgStyle} src='/images/cardback.jpg' width='745' height='1080' />
        <div style={CardTextStyle}>
          {this.props.name}
        </div>
      </div>
    );
  }
}
