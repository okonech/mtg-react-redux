import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Menu from '../components/Menu';
import Player from '../containers/Player';
import { AppState } from '../reducers/index';

interface SinglePlayerProps {
    players: string[];
    loading: boolean;
}

interface SinglePlayerDispatch {
    initPlayers: (game: string) => void;
}

const gameGrid: React.CSSProperties = {
    display: 'grid',
    gridTemplateRows: `auto 1fr`,
    gridTemplateAreas: "'menu' 'player'"
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
    }

    public render() {
        const { players, loading } = this.props;
        if (!loading) {
            return (
                <section style={gameGrid}>
                    <Menu style={{ gridArea: 'menu' }} />
                    <Player
                        style={{ gridArea: 'player' }}
                        id={players[0]}
                        pageDivision={{ row: 1, col: 1 }}
                    />
                </section>
            );
        } else {
            return (
                <React.Fragment>
                    <Menu />
                    Loading...
                </React.Fragment>
            );
        }
    }
}

export default connect<SinglePlayerProps, SinglePlayerDispatch, {}, AppState>
    (mapStateToProps, mapDispatchToProps)(SinglePlayerGame);
