import React from 'react';
import MenuAppBar from '../components/MenuAppBar';
import Players from '../containers/Players';
import ChatInfo from './ChatInfo';
import DrawerLeftMini from './DrawerLeftMini';

const gameGrid: React.CSSProperties = {
    display: 'grid',
    gridTemplateRows: `auto 1fr`,
    gridTemplateColumns: `auto 1fr auto`,
    gridTemplateAreas: "'menu menu menu' 'drawer-left players chatinfo'",
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
            <ChatInfo style={{ gridArea: 'chatinfo' }} />
        </section>
    );
};

export default GamePage;
