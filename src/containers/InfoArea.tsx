import React from 'react';
import { selectCards as selectCardsType } from '../actions/selectActions';
import { moveCards as moveCardsType } from '../actions/zonesActions';
import PlayerInfo from '../components/PlayerInfo';
import ZoneInfo from '../components/ZoneInfo';
import { PlayerData } from '../selectors/player';
interface InfoAreaProps {
    player: PlayerData;
    moveCards: moveCardsType;
    selectCards: selectCardsType;
    style?: React.CSSProperties;
}

const infoStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateRows: `30% 17.5% 17.5% 17.5% 17.5%`,
    gridTemplateAreas: "'player' 'library' 'hand' 'graveyard' 'exile'",
    background: 'rgb(97, 92, 92)',
    boxSizing: 'border-box',
    borderRight: '1px solid black',
    borderLeft: '1px solid black',
    minWidth: '40px'
};

const InfoArea = (props: InfoAreaProps) => {

    const { player, moveCards, selectCards, style } = props;
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
                moveCards={moveCards}
                selectCards={selectCards}
                icon='/icons/book-pile.svg'
                click={drawCard}
            />
            <ZoneInfo
                style={{ gridArea: 'hand' }}
                moveCards={moveCards}
                selectCards={selectCards}
                icon='/icons/poker-hand.svg'
                zone={hand}
            />
            <ZoneInfo
                style={{ gridArea: 'graveyard' }}
                moveCards={moveCards}
                selectCards={selectCards}
                icon='/icons/tombstone.svg'
                zone={graveyard}
            />
            <ZoneInfo
                style={{ gridArea: 'exile' }}
                moveCards={moveCards}
                selectCards={selectCards}
                icon='/icons/rolling-energy.svg'
                zone={exile}
            />
        </section>
    );
};

export default InfoArea;
