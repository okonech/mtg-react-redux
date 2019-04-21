import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Menu from '../components/Menu';
import Player from '../containers/Player';
import { AppState } from '../reducers/index';

const gameGrid: React.CSSProperties = {
    display: 'grid',
    gridTemplateRows: `30px calc(50vh - 15px) calc(50vh - 15px)`,
    gridTemplateColumns: `50fr 50fr`,
    gridTemplateAreas: "'menu menu' 'player1 player2' 'player3 player4'"
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
                        style={{ gridArea: 'player1' }}
                        id={players[0]}
                        pageDivision={{ row: 2, col: 2 }}
                    />
                    <Player
                        style={{ gridArea: 'player2' }}
                        id={players[1]}
                        pageDivision={{ row: 2, col: 2 }}
                    />
                    <Player
                        style={{ gridArea: 'player3' }}
                        id={players[0]}
                        pageDivision={{ row: 2, col: 2 }}
                    />
                    <Player
                        style={{ gridArea: 'player4' }}
                        id={players[1]}
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
