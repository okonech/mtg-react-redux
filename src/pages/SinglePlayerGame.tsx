import React from 'react';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Player from '../containers/Player/Player';

const MenuStyle: object = {
    height: '30px',
    width: '100%',
    listStyleType: 'none',
    margin: '0',
    padding: '0',
    overflow: 'hidden',
    backgroundColor: '#333',
};

const MenuItemStyle: object = {
    color: 'white',
    display: 'block',
    float: 'left',
    padding: '3px 16px',
    'textAlign': 'center',
    'textDecoration': 'none',
};

const PlayerStyle = {
    height: 'calc(100% - 30px)',
    width: '100%',
};

class SinglePlayerGame extends React.Component {
    public render() {
        return(
            <div className='fullSize'>
                <ul style={MenuStyle}>
                    <li style={MenuItemStyle}><a style={MenuItemStyle} href='#home'>Home</a></li>
                    <li style={MenuItemStyle}><a style={MenuItemStyle} href='#news'>News</a></li>
                    <li style={MenuItemStyle}><a style={MenuItemStyle} href='#contact'>Contact</a></li>
                    <li style={MenuItemStyle}><a style={MenuItemStyle} href='#about'>About</a></li>
                </ul>
                <div style={PlayerStyle}>
                    <Player />
                </div>
            </div>
        );
    }
}

export default DragDropContext(HTML5Backend)(SinglePlayerGame);