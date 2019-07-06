import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import React from 'react';
import { PlayerData } from '../selectors/player';

const styles = (theme: Theme) => {
    return createStyles({
        main: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            overflow: 'hidden',
            boxSizing: 'border-box',
            padding: '4px'
        },
        avatar: {
            width: '100%',
            height: 'auto'
        }
    });
};

interface PlayerInfoProps extends WithStyles<typeof styles> {
    player: PlayerData;
    icon: string;
    style?: React.CSSProperties;
}

const PlayerInfo = (props: PlayerInfoProps) => {
    const { player, style, icon, classes } = props;
    const { name } = player;
    return (
        <article
            className={classes.main}
        >
            <Avatar className={classes.avatar} style={style} alt={name} src={icon} />
        </article>

    );
};

export default withStyles(styles)(PlayerInfo);
