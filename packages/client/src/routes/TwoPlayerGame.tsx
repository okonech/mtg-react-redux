import GamePage from '../components/pages/GamePage';
import React from 'react';

const FourPlayerGameOther = () =>
    (
        <GamePage
            playerRows={2}
            playerCols={1}
            playersNum={2}
        />
    );

export default FourPlayerGameOther;
