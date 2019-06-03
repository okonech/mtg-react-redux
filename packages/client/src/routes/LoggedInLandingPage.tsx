import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default class SinglePlayerGame extends React.PureComponent {
    public render() {
        return (
            <React.Fragment>
                <Navbar />
                <h1 style={{ marginTop: '0px' }}>This is the landing page for logged in players</h1>
                <p><Link to='/test-game'>Test a deck in a single player game!</Link></p>
                <p><Link to='/test-two-player-game'>Test a deck in a two player game!</Link></p>
                <p><Link to='/test-four-player-game'>Test a deck in a four player game!</Link></p>
                <p>
                    <Link to='/test-four-player-game-other'>
                        Test a deck in a four player game with another layout!
                    </Link>
                </p>
            </React.Fragment>
        );
    }
}
