import React from 'react';
import Player from '../containers/Player/Player';

const MenuStyle = {
    height: '3%', /* Full-height: remove this if you want "auto" height */
    width: '100%', /* Set the width of the sidebar */
    'list-style-type': 'none',
    margin: '0',
    padding: '0',
    overflow: 'hidden',
    'background-color': '#333',
};

const MenuItemStyle = {
    color: 'white',
    display: 'block',
    float: 'left',
    padding: '3px 16px',
    'text-align': 'center',
    'text-decoration': 'none',
};

export default class SinglePlayerGame extends React.Component {
    public render() {
        return(
            <div className='fullSize'>
                <ul style={MenuStyle}>
                    <li style={MenuItemStyle}><a style={MenuItemStyle} class='active' href='#home'>Home</a></li>
                    <li style={MenuItemStyle}><a style={MenuItemStyle} href='#news'>News</a></li>
                    <li style={MenuItemStyle}><a style={MenuItemStyle} href='#contact'>Contact</a></li>
                    <li style={MenuItemStyle}><a style={MenuItemStyle} href='#about'>About</a></li>
                </ul>
                <Player />
            </div>
        );
    }
}