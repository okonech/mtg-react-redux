import React, { useEffect } from 'react';
import { defaultMemoize } from 'reselect';
import CardCustomDragLayer from '../containers/CardCustomDragLayer';
import Player from '../containers/Player';
import { GameState } from '../reducers/gameReducer';
import { setCardHeight } from '../util/cardSize';
import LoadingSpinner from './LoadingSpinner';

interface PlayersProps {
    game: GameState;
    playerRows: number;
    playerCols: number;
    playersNum: number;
    players: string[];
    loading: boolean;
    initPlayers: (game: GameState) => void;
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
        initPlayers(game);
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
