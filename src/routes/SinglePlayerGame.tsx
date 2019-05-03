import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import LoadingPage from '../components/LoadingPage';
import MenuAppBar from '../components/MenuAppBar';
import Player from '../containers/Player';
import { AppState } from '../reducers/index';
import { setCardHeight } from '../util/cardSize';

interface SinglePlayerProps {
    players: string[];
    loading: boolean;
}

interface SinglePlayerDispatch {
    initPlayers: (game: string) => void;
}

const gameGrid: React.CSSProperties = {
    display: 'grid',
    gridTemplateRows: `auto repeat(1, 1fr)`,
    height: '100%',
    width: '100%'
};

const mapStateToProps = (state: AppState) => ({
    players: state.players.playerIds,
    loading: state.isLoading
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    initPlayers: (game: string) => dispatch(({ type: 'INIT_PLAYERS', payload: game }))
});

class SinglePlayerGame extends React.PureComponent<SinglePlayerProps & SinglePlayerDispatch, {}> {

    constructor(props: any) {
        super(props);
        props.initPlayers('test');
        setCardHeight(22.5);
    }

    public render() {
        setCardHeight(22.5);
        const { players, loading } = this.props;
        if (!loading) {
            return (
                <section style={gameGrid}>
                    <MenuAppBar />
                    <Player
                        id={players[0]}
                    />
                </section>
            );
        } else {
            return (
                <LoadingPage />
            );
        }
    }
}

export default connect<SinglePlayerProps, SinglePlayerDispatch, {}, AppState>
    (mapStateToProps, mapDispatchToProps)(SinglePlayerGame);
