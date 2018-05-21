import React from 'react';
import { Link } from 'react-router-dom';

export default class SinglePlayerGame extends React.Component {
    public render() {
        return(
            <div>
                <h1>This is the landing page for logged in players</h1>
                <Link to='/test-game'>Test a deck in a single player game!</Link>
            </div>
        );
    }
}