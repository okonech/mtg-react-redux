import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import LoadingPage from '../components/LoadingPage';
import Menu from '../components/MenuAppBar';
import Player from '../containers/Player';
import { AppState } from '../reducers/index';
import { setCardHeight } from '../util/cardSize';

const gameGrid: React.CSSProperties = {
    display: 'grid',
    gridTemplateRows: `auto repeat(4, calc(25vh - 12px))`,
    height: '100%',
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

class FourPlayerGame extends React.PureComponent<FourPlayerGameProps, {}> {

    constructor(props: any) {
        super(props);
        props.initPlayers('test');
    }

    public render() {
        setCardHeight(5.625);
        const { players, loading } = this.props;
        if (!loading) {
            return (
                <section style={gameGrid}>
                    <Menu />
                    <Player
                        id={players[0]}
                    />
                    <Player
                        id={players[1]}
                    />
                    <Player
                        id={players[2]}
                    />
                    <Player
                        id={players[3]}
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
// TODO: fix this to proper typing
export default connect(mapStateToProps, mapDispatchToProps)(FourPlayerGame);
