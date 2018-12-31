import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Menu from '../components/Menu/Menu';
import Player from '../containers/Player';
import { AppState } from '../reducers/index';

const PlayerStyle: React.CSSProperties = {
    height: 'calc(100% - 30px)',
    width: '100%'
};

interface SinglePlayerGameProps {
    player: string;
    loading: boolean;
}

function mapStateToProps(state: AppState) {
    console.log(state);
    return {
        player: state.players.playerIds[0],
        loading: state.isLoading
    };
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    initPlayers: (game: string) => dispatch(({ type: 'INIT_PLAYERS', payload: game }))
});

class SinglePlayerGame extends React.Component<SinglePlayerGameProps, {}> {

    constructor(props: any) {
        super(props);
        props.initPlayers('test');
    }

    public render() {
        const props = this.props;
        if (!props.loading) {
            return (
                <div className='fullSize'>
                    <Menu />
                    <div style={PlayerStyle}>
                        <Player id={props.player} />
                    </div>
                </div>
            );
        } else {
            return (
                <div className='fullSize'>
                    <Menu />
                    <div style={PlayerStyle}>
                        Loading...
                </div>
                </div>
            );
        }
    }
}
// TODO: fix this to proper typing
export default connect(mapStateToProps, mapDispatchToProps)(SinglePlayerGame);
