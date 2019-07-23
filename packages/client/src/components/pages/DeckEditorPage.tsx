import React from 'react';
import Navbar from '../../containers/Navbar';
import Table from '../deck-editor/Table';

const gameGrid: React.CSSProperties = {
    display: 'grid',
    gridTemplateRows: `auto 1fr`,
    gridTemplateColumns: `10% auto auto 10%`,
    gridTemplateAreas: "'menu menu menu menu' 'spacer1 editor editor spacer2'",
    height: '100%',
    width: '100%'
};

interface GamePageProps {
    playerRows: number;
    playerCols: number;
    playersNum: number;
}

const GamePage = (props: GamePageProps) => {
    return (
        <section style={gameGrid}>
            <Navbar style={{ gridArea: 'menu' }} />
            <Table style={{ gridArea: 'editor' }} />
        </section>
    );
};

export default GamePage;
