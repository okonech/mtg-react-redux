import React from 'react';
import DeckEditorPage from '../components/pages/DeckEditorPage';

const DeckEditor = () => {
    return (
        <DeckEditorPage
            playerRows={1}
            playerCols={1}
            playersNum={1}
        />
    );
};

export default DeckEditor;
