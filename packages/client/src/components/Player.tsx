import { BaseComponentProps } from '../util/styling';
import { defaultMemoize } from 'reselect';
import { getCardSizeVh } from '../util/cardSize';
import { makeStyles } from '@material-ui/core/styles';
import { MappedPlayer } from '../containers/Player';
import BattleField from '../containers/BattleField';
import Hand from '../containers/Hand';
import InfoArea from '../containers/InfoArea';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.default,
        boxSizing: 'border-box',
        borderBottom: `1px solid ${theme.palette.divider}`,
        minHeight: '220px'
    }
}));

export interface PlayerProps extends BaseComponentProps, MappedPlayer {
    style?: React.CSSProperties;
}

const grid = defaultMemoize((cardHeight: number, style: React.CSSProperties): React.CSSProperties => ({
    ...style,
    display: 'grid',
    gridTemplateColumns: `90px 1fr`,
    gridTemplateRows: `75fr calc(${cardHeight}vh + 11px)`,
    gridTemplateAreas: "'info battlefield' 'info hand'"
}));

const Player: React.FC<PlayerProps> = (props) => {
    const { player, selected, style } = props;
    const { hand, battlefield, library } = player;
    const classes = useStyles({});

    const { height: cardHeight } = getCardSizeVh();

    return (
        <div className={classes.root} style={grid(cardHeight, style)}>
            <InfoArea
                style={{ gridArea: 'info' }}
                player={player}
                key={library.id}
            />
            <BattleField
                style={{ gridArea: 'battlefield' }}
                zone={battlefield}
                key={battlefield.id}
                selected={selected}
                cardHeight={cardHeight}
            />
            <Hand
                style={{ gridArea: 'hand' }}
                zone={hand}
                key={hand.id}
                selected={selected}
                cardHeight={cardHeight}
            />
        </div>
    );
};

export default Player;
