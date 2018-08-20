import * as React from 'react';

// pure card render component

interface CardProps {
  opacity: number;
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
  borderRadius: '5%',
};

const CardTextStyle: React.CSSProperties = {
  position: 'absolute',
  top: 10,
  bottom: 0,
  left: 5,
  right: 0
};

export default class Card extends React.Component<CardProps, any> {

    public render() {
      const opacity = this.props.opacity;
      return (
        <div style = {{ ...CardStyle, opacity }}>
          <img style = {ImgStyle} src= '/images/cardback.jpg' width='745' height='1080'/>
          <div style ={CardTextStyle}>
            {this.props.name}
          </div>
        </div>
      );
    }
}

