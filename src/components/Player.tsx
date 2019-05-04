import { createStyles } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import React from 'react';
import { defaultMemoize } from 'reselect';
import BattleField from '../containers/BattleField';
import CardCustomDragLayer from '../containers/CardCustomDragLayer';
import Hand from '../containers/Hand';
import { PlayerMappedDispatch, PlayerMappedProps } from '../containers/Player';
import { getCardSizeVh } from '../util/cardSize';
import InfoArea from './InfoArea';

const styles = (theme: Theme) => {
    return createStyles({
        main: {
            backgroundColor: theme.palette.background.default,
            boxSizing: 'border-box',
            borderBottom: `1px solid ${theme.palette.divider}`,
            minHeight: '220px'
        }
    });
};

export interface PlayerProps extends WithStyles<typeof styles> {
    style?: React.CSSProperties;
}

export type AllProps = PlayerProps & PlayerMappedProps & PlayerMappedDispatch;

const grid = defaultMemoize((cardHeight: number, style: React.CSSProperties): React.CSSProperties => ({
    ...style,
    display: 'grid',
    gridTemplateColumns: `90px 1fr`,
    gridTemplateRows: `75fr calc(${cardHeight}vh + 11px)`,
    gridTemplateAreas: "'info battlefield' 'info hand'"
}));

const Player = (props: AllProps) => {
    const { player, moveCards, selectCards, selected, style, classes } = props;
    const { hand, battlefield, library } = player;

    const { height: cardHeight } = getCardSizeVh();

    return (
        <div className={classes.main} style={grid(cardHeight, style)}>
            <InfoArea
                style={{ gridArea: 'info' }}
                player={player}
                moveCards={moveCards}
                selectCards={selectCards}
                key={library.id}
            />
            <BattleField
                style={{ gridArea: 'battlefield' }}
                zone={battlefield}
                moveCards={moveCards}
                selectCards={selectCards}
                key={battlefield.id}
                selected={selected}
                cardHeight={cardHeight}
            />
            <Hand
                style={{ gridArea: 'hand' }}
                zone={hand}
                moveCards={moveCards}
                selectCards={selectCards}
                key={hand.id}
                selected={selected}
                cardHeight={cardHeight}
            />
            <CardCustomDragLayer
                cardHeight={cardHeight}
            />
        </div>
    );
};

export default withStyles(styles)(Player);
