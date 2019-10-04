import { BaseComponentProps } from '../util/styling';
import { makeStyles } from '@material-ui/core/styles';
import { PlayerData } from '../selectors/player';
import PlayerAvatar from './PlayerAvatar';
import PlayerAvatarDnd from '../containers/PlayerAvatarDnd';
import React from 'react';

interface PlayerInfoProps extends BaseComponentProps {
    player: PlayerData;
    icon: string;
}

const useStyles = makeStyles<null, PlayerInfoProps>({
    single: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',
        boxSizing: 'border-box',
        padding: '4px'
    },
    partner: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',
        boxSizing: 'border-box',
        padding: '4px',
        position: 'relative'
    }
});


// TODO: use clip-path for the diagonal effect + layering 2 avatars
// https://codepen.io/anon/pen/dMNzYG
const PlayerInfo: React.FC<PlayerInfoProps> = (props) => {
    const { style, player } = props;
    const classes = useStyles(props);
    const { commanders } = player;

    if (commanders.length === 1) {
        // single avatar
        return (
            <article
                style={style}
                className={classes.single}
            >
                <PlayerAvatarDnd
                    commander={commanders[0]}
                    player={player}
                />
            </article>
        );
    }

    if (commanders.length === 2) {
        // partner avatars
        return (
            <article
                style={style}
                className={classes.partner}
            >
                <PlayerAvatarDnd
                    commander={commanders[0]}
                    player={player}
                    style={{
                        position: 'absolute',
                        clipPath: 'polygon(0 0, 0% 100%, 100% 0)'
                    }}
                />
                <PlayerAvatarDnd
                    commander={commanders[1]}
                    player={player}
                    style={{
                        position: 'absolute',
                        clipPath: 'polygon(100% 100%, 0% 100%, 100% 0)'
                    }}
                />
            </article>
        );
    }

    // non commander deck
    return (
        // partner avatars
        <article
            style={style}
            className={classes.partner}
        >
            <PlayerAvatar
                {...props}
                grayscale={false}
            />
        </article>
    );
};

export default PlayerInfo;

