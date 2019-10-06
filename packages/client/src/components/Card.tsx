import { GameCardModel } from '@mtg-react-redux/models';
import CardDisplay from './CardDisplay';
import React from 'react';

export interface CardProps {
  opacity?: number;
  card: GameCardModel;
  cardHeight: number;
  hidden?: boolean;
  isHovered?: boolean;
  // optional string to decorate top of card. Will show even without hover
  topLabel?: string;
  id?: string;
}

interface SelectableProps {
  selectableRef?: string;
  selected?: boolean;
  selecting?: boolean;
}

type AllProps = CardProps & SelectableProps;

const Card: React.FC<AllProps> = (props) => {

  const { card, id, ...restProps } = props;

  return (
    <CardDisplay
      {...restProps}
      card={card.cardData}
      id={id || card.id}
      tapped={card.tapped}
      flipped={card.flipped}
    />
  );
};

export default Card;
