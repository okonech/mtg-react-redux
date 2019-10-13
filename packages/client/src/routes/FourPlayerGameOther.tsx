import GamePage from '../components/pages/GamePage';
import React from 'react';

const FourPlayerGameOther = () =>
    (
        <GamePage
            playerRows={2}
            playerCols={2}
            playersNum={4}
        />
    );

export default FourPlayerGameOther;
