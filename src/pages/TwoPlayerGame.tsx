import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import MenuAppBar from '../components/MenuAppBar';
import Player from '../containers/Player';
import { AppState } from '../reducers/index';

const gameGrid: React.CSSProperties = {
    display: 'grid',
    gridTemplateRows: `auto repeat(2, 1fr)`,
    height: '100%',
    width: '100%'
};

interface TwoPlayerGameProps {
    players: string[];
    loading: boolean;
}

interface TwoPlayerDispatch {
    initPlayers: (game: string) => void;
}

const mapStateToProps = (state: AppState) => ({
    players: state.players.playerIds,
    loading: state.isLoading
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    initPlayers: (game: string) => dispatch(({ type: 'INIT_PLAYERS', payload: game }))
});

class TwoPlayerGame extends React.PureComponent<TwoPlayerGameProps & TwoPlayerDispatch, {}> {

    constructor(props: any) {
        super(props);
        props.initPlayers('test');
    }

    public render() {
        const { players, loading } = this.props;
        if (!loading) {
            return (
                <section style={gameGrid}>
                    <MenuAppBar />
                    <Player
                        id={players[0]}
                        pageDivision={{ row: 1, col: 2 }}
                    />
                    <Player
                        id={players[1]}
                        pageDivision={{ row: 1, col: 2 }}
                    />
                </section>
            );
        } else {
            return (
                <React.Fragment>
                    <MenuAppBar />
                    Loading...
                </React.Fragment>
            );
        }
    }
}
// TODO: fix this to proper typing
export default connect(mapStateToProps, mapDispatchToProps)(TwoPlayerGame);
