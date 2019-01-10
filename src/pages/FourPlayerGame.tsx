import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Menu from '../components/Menu';
import Player from '../containers/Player';
import { AppState } from '../reducers/index';

const PlayerStyle: React.CSSProperties = {
    height: 'calc(100% - 30px)',
    width: '100%'
};

interface FourPlayerGameProps {
    players: string[];
    loading: boolean;
}

const mapStateToProps = (state: AppState) => ({
    players: state.players.playerIds,
    loading: state.isLoading
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    initPlayers: (game: string) => dispatch(({ type: 'INIT_PLAYERS', payload: game }))
});

class FourPlayerGame extends React.Component<FourPlayerGameProps, {}> {

    constructor(props: any) {
        super(props);
        props.initPlayers('test');
    }

    public render() {
        const { players, loading } = this.props;
        if (!loading) {
            return (
                <div className='fullSize'>
                    <Menu />
                    <div style={PlayerStyle}>
                        <div style={{ height: '25%' }}>
                            <Player id={players[0]} />
                        </div>
                        <div style={{ height: '25%' }}>
                            <Player id={players[0]} />
                        </div>
                        <div style={{ height: '25%' }}>
                            <Player id={players[0]} />
                        </div>
                        <div style={{ height: '25%' }}>
                            <Player id={players[0]} />
                        </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(FourPlayerGame);