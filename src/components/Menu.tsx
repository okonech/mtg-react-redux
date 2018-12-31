import React from 'react';
import { Link } from 'react-router-dom';

const MenuStyle: object = {
    height: '30px',
    width: '100%',
    listStyleType: 'none',
    margin: '0',
    padding: '0',
    overflow: 'hidden',
    backgroundColor: '#333'
};

const MenuItemStyle: object = {
    color: 'white',
    display: 'block',
    float: 'left',
    padding: '3px 16px',
    textAlign: 'center',
    textDecoration: 'none'
};

export default class Menu extends React.Component {
    public render() {
        return (
            <div style={MenuStyle}>
                <Link to='/player' style={MenuItemStyle}>Home</Link>
                <Link to='/test-game' style={MenuItemStyle}>Resume test</Link>
                <Link to='/test-two-player-game' style={MenuItemStyle}>Resume match</Link>
            </div >
        );
    }
}
