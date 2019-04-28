import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Menu from '../components/MenuAppBar';
import Player from '../containers/Player';
import { AppState } from '../reducers/index';

const gameGrid: React.CSSProperties = {
    display: 'grid',
    gridTemplateRows: `auto repeat(2, 1fr)`,
    gridTemplateColumns: `50fr 50fr`,
    gridTemplateAreas: "'menu menu' 'player1 player2' 'player3 player4'",
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

class FourPlayerGameOther extends React.PureComponent<FourPlayerGameProps, {}> {

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
                        id={players[0]}
                        pageDivision={{ row: 2, col: 2 }}
                    />
                    <Player
                        id={players[1]}
                        pageDivision={{ row: 2, col: 2 }}
                    />
                    <Player
                        id={players[2]}
                        pageDivision={{ row: 2, col: 2 }}
                    />
                    <Player
                        id={players[3]}
                        pageDivision={{ row: 2, col: 2 }}
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
// TODO: fix this to proper typing
export default connect(mapStateToProps, mapDispatchToProps)(FourPlayerGameOther);
