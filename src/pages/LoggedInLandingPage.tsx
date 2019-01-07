import React from 'react';
import { Link } from 'react-router-dom';

export default class SinglePlayerGame extends React.Component {
    public render() {
        return (
            <div>
                <h1>This is the landing page for logged in players</h1>
                <p><Link to='/test-game'>Test a deck in a single player game!</Link></p>
                <p><Link to='/test-two-player-game'>Test a deck in a two player game!</Link></p>
                <p><Link to='/test-four-player-game'>Test a deck in a four player game!</Link></p>
            </div>
        );
    }
}
