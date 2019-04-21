import React from 'react';
import { PlayerData } from '../selectors/player';

interface PlayerInfoProps {
    player: PlayerData;
    icon: string;
    style?: React.CSSProperties;
}

const playerStyle: React.CSSProperties = {
    display: 'flex',
    position: 'relative',
    justifyContent: 'center'
};

const NameStyle: React.CSSProperties = {
    position: 'absolute',
    alignSelf: 'flex-start',
    fontWeight: 800
};

const CountStyle: React.CSSProperties = {
    position: 'absolute',
    alignSelf: 'flex-end',
    fontWeight: 800
};

const PlayerInfo = (props: PlayerInfoProps) => {
    const { player, style, icon } = props;
    const { name, life } = player;
    return (
        <article
            style={{ ...playerStyle, ...style }}
        >
            <span style={NameStyle}>
                {name}
            </span>
            <img src={icon} />
            <span style={CountStyle}>
                {life}
            </span>
        </article>
    );
};

export default PlayerInfo;
