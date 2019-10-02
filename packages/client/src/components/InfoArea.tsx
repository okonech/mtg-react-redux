import { BaseComponentProps } from '../util/styling';
import { createStyles } from '@material-ui/core';
import { moveCards as moveCardsType } from '../actions/gameCardsActions';
import { PlayerData } from '../selectors/player';
import { selectCards as selectCardsType } from '../actions/selectActions';
import { Theme } from '@material-ui/core/styles';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import BookPileSvg from './svg/LibrarySvg';
import HeartSvg from './svg/HeartSvg';
import LifeCounter from './LifeCounter';
import PlayerInfo from './PlayerInfo';
import PokerHandSvg from './svg/HandSvg';
import React from 'react';
import RollingEnergySvg from './svg/ExileSvg';
import TombstoneSvg from './svg/GraveyardSvg';
import ZoneInfoDnd from '../containers/ZoneInfoDnd';

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

interface InfoAreaProps extends WithStyles<typeof styles>, BaseComponentProps {
    player: PlayerData;
    moveCards: typeof moveCardsType;
    selectCards: typeof selectCardsType;
}

const InfoArea: React.FC<InfoAreaProps> = (props) => {

    const { player, moveCards, selectCards, style, classes } = props;
    const { hand, library, graveyard, exile } = player;
    const libCards = library.cards;
    const drawCard = () => {
        if (libCards.length === 0) {
            return null;
        }
        return moveCards(library.id, [libCards[libCards.length - 1].gameCard.id],
            hand.id, hand.cards.length, 0, 0);
    };

    return (
        <section className={classes.main} style={style}>
            <PlayerInfo
                style={{ gridArea: 'player' }}
                icon={`/images/${player.name}.png`}
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
