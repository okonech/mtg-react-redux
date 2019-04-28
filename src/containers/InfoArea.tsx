import { createStyles } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import React from 'react';
import { selectCards as selectCardsType } from '../actions/selectActions';
import { moveCards as moveCardsType } from '../actions/zonesActions';
import LifeCounter from '../components/LifeCounter';
import PlayerInfo from '../components/PlayerInfo';
import BookPileSvg from '../components/svg/BookPileSvg';
import HeartSvg from '../components/svg/HeartSvg';
import PokerHandSvg from '../components/svg/PokerHandSvg';
import RollingEnergySvg from '../components/svg/RollingEnergySvg';
import TombstoneSvg from '../components/svg/TombstoneSvg';
import ZoneInfo from '../components/ZoneInfo';
import { PlayerData } from '../selectors/player';

const styles = (theme: Theme) => {
    const { background, divider } = theme.palette;
    return createStyles({
        main: {
            display: 'grid',
            gridTemplateRows: `25% repeat(5,15%)`,
            gridTemplateAreas: "'player' 'life' 'library' 'hand' 'graveyard' 'exile'",
            background: background.paper,
            boxSizing: 'border-box',
            borderRight: `1px solid ${divider}`,
            borderLeft: `1px solid ${divider}`,
            minWidth: '40px'
        }
    });
};

interface InfoAreaProps extends WithStyles<typeof styles> {
    player: PlayerData;
    moveCards: moveCardsType;
    selectCards: selectCardsType;
    style?: React.CSSProperties;
}

const InfoArea = (props: InfoAreaProps) => {

    const { player, moveCards, selectCards, style, classes } = props;
    const { hand, library, graveyard, exile } = player;
    const drawCard = () => moveCards(library.id, [library.cards[0].id], hand.id, hand.cards.length, 0, 0);
    return (
        <section className={classes.main} style={style}>
            <PlayerInfo
                style={{ gridArea: 'player' }}
                icon='/images/avatar.png'
                player={player}
            />
            <LifeCounter
                style={{ gridArea: 'life' }}
                icon={<HeartSvg />}
                life={player.life}
            />
            <ZoneInfo
                style={{ gridArea: 'library' }}
                zone={library}
                moveCards={moveCards}
                selectCards={selectCards}
                icon={<BookPileSvg />}
                click={drawCard}
            />
            <ZoneInfo
                style={{ gridArea: 'hand' }}
                moveCards={moveCards}
                selectCards={selectCards}
                icon={<PokerHandSvg />}
                zone={hand}
            />
            <ZoneInfo
                style={{ gridArea: 'graveyard' }}
                moveCards={moveCards}
                selectCards={selectCards}
                icon={<TombstoneSvg />}
                zone={graveyard}
            />
            <ZoneInfo
                style={{ gridArea: 'exile' }}
                moveCards={moveCards}
                selectCards={selectCards}
                icon={<RollingEnergySvg />}
                zone={exile}
            />
        </section>
    );
};

export default withStyles(styles)(InfoArea);
