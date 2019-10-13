import GamePage from '../components/pages/GamePage';
import React from 'react';

const FourPlayerGame = () =>
    (
        <GamePage
            playerRows={4}
            playerCols={1}
            playersNum={4}
        />
    );

export default FourPlayerGame;
