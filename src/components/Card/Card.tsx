import React, { Component } from 'react';

export default class Card extends Component {
  public render() {
    return (
      <div className='Card'>
        { this.props.children }
      </div>
    );
  }
}
