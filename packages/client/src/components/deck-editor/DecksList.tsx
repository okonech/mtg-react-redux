import { Link } from 'react-router-dom';
import Navbar from '../../containers/Navbar';
import React from 'react';

export default class DecksList extends React.PureComponent {
    public render() {
        return (
            <React.Fragment>
                <Navbar />
                <h1 style={{ marginTop: '0px' }}>This is the landing page for logged in players</h1>
                <p><Link to='/deck-editor/4dzljQpIQF9FyOnt4XEf'>Tainted Shimmer Zur</Link></p>
                <p><Link to='/deck-editor/KD2yue4kV28ckzwSLHTt'>Elsha Combo Control</Link></p>
                <p><Link to='/deck-editor/jHJWlwsNqCjgxe7moLfs'>Jhoira Stax</Link></p>
                <p><Link to='/deck-editor/shJbLfPgvMyT3tCTNcwH'>Hulk Flash</Link></p>
            </React.Fragment>
        );
    }
}
