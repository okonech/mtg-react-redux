import React, { useEffect } from 'react';
import { defaultMemoize } from 'reselect';
import LoadingPage from '../components/LoadingPage';
import CardCustomDragLayer from '../containers/CardCustomDragLayer';
import Player from '../containers/Player';
import { setCardHeight } from '../util/cardSize';

interface PlayersProps {
    playerRows: number;
    playerCols: number;
    playersNum: number;
    players: string[];
    loading: boolean;
    initPlayers: (game: string) => void;
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

const Players = (props: PlayersProps) => {
    const { players, loading, playerRows, initPlayers, playersNum } = props;
    const cardHeight = 22.5 / playerRows;
    setCardHeight(cardHeight);

    useEffect(() => {
        initPlayers('test');
    },        [initPlayers]);

    if (loading) {
        return (
            <LoadingPage />
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
