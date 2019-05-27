import React from 'react';
import GamePage from '../components/GamePage';

const FourPlayerGameOther = () => {
    return (
        <GamePage
            playerRows={2}
            playerCols={1}
            playersNum={2}
        />
    );
};

export default FourPlayerGameOther;
