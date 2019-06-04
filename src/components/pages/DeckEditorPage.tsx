import React from 'react';
import Players from '../../containers/Players';
import DrawerLeftMini from '../DrawerLeftMini';
import DrawerRightMini from '../DrawerRightMini';
import MenuAppBar from '../MenuAppBar';

const gameGrid: React.CSSProperties = {
    display: 'grid',
    gridTemplateRows: `auto 1fr`,
    gridTemplateColumns: `auto 1fr auto`,
    gridTemplateAreas: "'menu menu menu' 'drawer-left players chatroom'",
    height: '100%',
    width: '100%'
};

interface GamePageProps {
    playerRows: number;
    playerCols: number;
    playersNum: number;
}

const GamePage = (props: GamePageProps) => {
    const { playerCols, playerRows, playersNum } = props;
    return (
        <section style={gameGrid}>
            <MenuAppBar style={{ gridArea: 'menu' }} />
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
