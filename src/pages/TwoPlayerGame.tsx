import React from 'react';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Menu from '../components/Menu/Menu';
import Player from '../containers/Player/Player';

const PlayerStyle = {
    height: 'calc(50% - 15px)',
    width: '100%',
};

class SinglePlayerGame extends React.Component {
    public render() {
        return(
            <div className='fullSize'>
                <Menu />
                <div style={PlayerStyle}>
                    <Player />
                    <Player />
                </div>
            </div>
        );
    }
}

export default DragDropContext(HTML5Backend)(SinglePlayerGame);