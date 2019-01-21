import React from 'react';
import { moveCards as moveCardsType } from '../actions/zonesActions';
import { PlayerData } from '../selectors/player';

interface InfoAreaProps {
    player: PlayerData;
    moveCards: moveCardsType;
}

export default class InfoArea extends React.PureComponent<InfoAreaProps> {
    public render() {
        const { player, moveCards } = this.props;
        const { hand, library } = player;
        const drawCard = () => moveCards(library.id, [library.cards[0].id], hand.id, 0);
        return (
            <h1 onClick={drawCard}>This is info area</h1>
        );
    }
}
