import { defaultMemoize } from 'reselect';
import { MappedPlayers } from '../containers/Players';
import { setCardHeight } from '../util/cardSize';
import CardCustomDragLayer from '../containers/CardCustomDragLayer';
import LoadingSpinner from './LoadingSpinner';
import Player from '../containers/Player';
import React, { useEffect } from 'react';

interface PlayersProps extends MappedPlayers {
    playerRows: number;
    playerCols: number;
    playersNum: number;
}

const getPlayersStyle = defaultMemoize((props: PlayersProps): React.CSSProperties => {
    const { playerRows, playerCols } = props;
    return {
        display: 'grid',
        gridTemplateRows: `repeat(${playerRows}, 1fr)`,
        gridTemplateColumns: `repeat(${playerCols}, 1fr)`,
        maxHeight: '100%',
        maxWidth: '100%',
        overflow: 'auto'
    };
});

const Players: React.SFC<PlayersProps> = (props) => {
    const { game, players, loading, playerRows, initPlayers, playersNum } = props;
    const cardHeight = 22.5 / playerRows;
    setCardHeight(cardHeight);

    useEffect(() => {
        if (!game.id) {
            initPlayers(game);
        }
    }, [game, initPlayers]);

    if (loading) {
        return (
            <LoadingSpinner />
        );
    }

    const playerComponents = players.slice(0, playersNum).map((id) => (
        <Player
            id={id}
            key={id}
        />
    ));

    return (
        <section style={getPlayersStyle(props)}>
            {playerComponents}
            <CardCustomDragLayer
                cardHeight={cardHeight}
            />
        </section>
    );

};

export default Players;
