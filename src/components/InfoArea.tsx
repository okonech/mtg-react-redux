import { createStyles } from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles';
import React from 'react';
import { selectCards as selectCardsType } from '../actions/selectActions';
import { moveCards as moveCardsType } from '../actions/zonesActions';
import ZoneInfoDnd from '../containers/ZoneInfoDnd';
import { PlayerData } from '../selectors/player';
import LifeCounter from './LifeCounter';
import PlayerInfo from './PlayerInfo';
import BookPileSvg from './svg/BookPileSvg';
import HeartSvg from './svg/HeartSvg';
import PokerHandSvg from './svg/PokerHandSvg';
import RollingEnergySvg from './svg/RollingEnergySvg';
import TombstoneSvg from './svg/TombstoneSvg';

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
            <ZoneInfoDnd
                style={{ gridArea: 'library' }}
                zone={library}
                moveCards={moveCards}
                selectCards={selectCards}
                icon={<BookPileSvg />}
                click={drawCard}
            />
            <ZoneInfoDnd
                style={{ gridArea: 'hand' }}
                moveCards={moveCards}
                selectCards={selectCards}
                icon={<PokerHandSvg />}
                zone={hand}
            />
            <ZoneInfoDnd
                style={{ gridArea: 'graveyard' }}
                moveCards={moveCards}
                selectCards={selectCards}
                icon={<TombstoneSvg />}
                zone={graveyard}
            />
            <ZoneInfoDnd
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
