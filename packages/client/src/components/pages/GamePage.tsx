import DrawerLeftMini from '../DrawerLeftMini';
import DrawerRightMini from '../DrawerRightMini';
import Navbar from '../../containers/Navbar';
import Players from '../../containers/Players';
import React from 'react';

const gameGrid: React.CSSProperties = {
    display: 'grid',
    gridTemplateRows: `auto 1fr`,
    gridTemplateColumns: `auto 1fr auto`,
    gridTemplateAreas: "'menu menu menu' 'drawer-left players chatroom'",
    height: '100vh',
    width: '100vw'
};

interface GamePageProps {
    playerRows: number;
    playerCols: number;
    playersNum: number;
}

const GamePage: React.FC<GamePageProps> = (props) => {
    const { playerCols, playerRows, playersNum } = props;
    return (
        <section style={gameGrid}>
            <Navbar style={{ gridArea: 'menu' }} />
            <DrawerLeftMini style={{ gridArea: 'drawer-left' }} />
            <Players
                playerCols={playerCols}
                playerRows={playerRows}
                playersNum={playersNum}
            />
            <DrawerRightMini style={{ gridArea: 'chatroom' }} />
        </section>
    );
};

export default GamePage;
