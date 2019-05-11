import React from 'react';
import GamePage from '../components/GamePage';

const FourPlayerGameOther = () => {
    return (
        <GamePage
            playerRows={2}
            playerCols={2}
            playersNum={4}
        />
    );
};

export default FourPlayerGameOther;
