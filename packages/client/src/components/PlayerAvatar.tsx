import { BaseComponentProps, noSelect } from '../util/styling';
import { makeStyles } from '@material-ui/core';
import { PlayerData } from '../selectors/player';
import { stringToColor } from '../util/conversion';
import Avatar from '@material-ui/core/Avatar';
import React from 'react';

const useStyles = makeStyles<null, PlayerAvatarProps>({
    main: {
        'width': '4.6rem',
        'height': '4.6rem',
        'borderColor': props => stringToColor(props.player.id),
        'borderWidth': '2px',
        'borderStyle': 'solid',
        '& img': {
            filter: props => props.grayscale ? 'grayscale(100%)' : 'none'
        }
    }
});

export interface PlayerAvatarProps extends BaseComponentProps {
    player: PlayerData;
    icon: string;
    grayscale: boolean;
}

const PlayerAvatar: React.FC<PlayerAvatarProps> = (props) => {
    const { player, style, icon } = props;
    const classes = useStyles(props);
    return (
        <Avatar className={classes.main} style={noSelect(style)} alt={player.name} src={icon} />
    );
};

export default PlayerAvatar;
