import React from 'react';
import GamePage from '../components/pages/GamePage';

const FourPlayerGame = () => {
    return (
        <GamePage
            playerRows={4}
            playerCols={1}
            playersNum={4}
        />
    );
};

export default FourPlayerGame;
