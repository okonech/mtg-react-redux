import React from 'react';
import { moveCards as moveCardsType } from '../actions/zonesActions';
import PlayerInfo from '../components/PlayerInfo';
import ZoneInfo from '../components/ZoneInfo';
import { PlayerData } from '../selectors/player';
interface InfoAreaProps {
    player: PlayerData;
    moveCards: moveCardsType;
    style?: React.CSSProperties;
}

const infoStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateRows: `30% 17.5% 17.5% 17.5% 17.5%`,
    gridTemplateAreas: "'player' 'library' 'hand' 'graveyard' 'exile'",
    background: 'rgb(97, 92, 92)',
    boxSizing: 'border-box',
    border: '1px solid black',
    minWidth: '40px'
};

const InfoArea = (props: InfoAreaProps) => {

    const { player, moveCards, style } = props;
    const { hand, library, graveyard, exile } = player;
    const drawCard = () => moveCards(library.id, [library.cards[0].id], hand.id, 0, 0, 0);
    return (
        <section style={{ ...infoStyle, ...style }}>
            <PlayerInfo
                style={{ gridArea: 'player' }}
                icon='/icons/crowned-skull.svg'
                player={player}
            />
            <ZoneInfo
                style={{ gridArea: 'library' }}
                zone={library}
                icon='/icons/book-pile.svg'
                click={drawCard}
            />
            <ZoneInfo
                style={{ gridArea: 'hand' }}
                icon='/icons/poker-hand.svg'
                zone={hand}
            />
            <ZoneInfo
                style={{ gridArea: 'graveyard' }}
                icon='/icons/tombstone.svg'
                zone={graveyard}
            />
            <ZoneInfo
                style={{ gridArea: 'exile' }}
                icon='/icons/rolling-energy.svg'
                zone={exile}
            />
        </section>
    );
};

export default InfoArea;
