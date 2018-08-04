import React from 'react';
import Menu from '../components/Menu/Menu';
// import Player from '../containers/Player/Player';

const PlayerStyle = {
    height: 'calc(50% - 15px)',
    width: '100%',
};

export default class SinglePlayerGame extends React.Component {
    public render() {
        return(
            <div className='fullSize'>
                <Menu />
                <div style={PlayerStyle}>
                    aaa
                </div>
            </div>
        );
    }
}
