import React from 'react';
import DeckEditor from '../deck-editor/DeckEditor';
import Navbar from '../Navbar';

const gameGrid: React.CSSProperties = {
    display: 'grid',
    gridTemplateRows: `auto 1fr`,
    gridTemplateColumns: `auto auto`,
    gridTemplateAreas: "'menu menu' 'editor editor'",
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
            <DeckEditor style={{ gridArea: 'editor' }} />
        </section>
    );
};

export default GamePage;
