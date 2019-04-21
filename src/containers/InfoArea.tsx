import React from 'react';
import { moveCards as moveCardsType } from '../actions/zonesActions';
import { PlayerData } from '../selectors/player';

interface InfoAreaProps {
    player: PlayerData;
    moveCards: moveCardsType;
    style?: React.CSSProperties;
}

const InfoArea = (props: InfoAreaProps) => {

    const { player, moveCards, style } = props;
    const { hand, library } = player;
    const drawCard = () => moveCards(library.id, [library.cards[0].id], hand.id, 0, 0, 0);
    return (
        <h1 style={style} onClick={drawCard}>This is info area</h1>
    );
};

export default InfoArea;
