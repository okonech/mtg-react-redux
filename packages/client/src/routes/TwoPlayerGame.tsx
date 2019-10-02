import React from 'react';
import GamePage from '../components/pages/GamePage';

const FourPlayerGameOther = () =>
    (
        <GamePage
            playerRows={2}
            playerCols={1}
            playersNum={2}
        />
    );

export default FourPlayerGameOther;
