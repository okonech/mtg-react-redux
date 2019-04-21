import React from 'react';
import { Link } from 'react-router-dom';

interface MenuProps {
    style?: React.CSSProperties;
}

const MenuStyle: object = {
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

const Menu = (props: MenuProps) => {

    const { style } = props;
    return (
        <div style={{ ...MenuStyle, ...style }}>
            <Link to='/player' style={MenuItemStyle}>Home</Link>
            <Link to='/test-game' style={MenuItemStyle}>Resume test</Link>
            <Link to='/test-two-player-game' style={MenuItemStyle}>Resume match</Link>
        </div >
    );
};

export default Menu;
