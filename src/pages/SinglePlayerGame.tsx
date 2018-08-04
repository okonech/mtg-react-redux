import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {playersAddPlayer} from '../actions/playersActions';
import Menu from '../components/Menu/Menu';
import Player from '../containers/Player/Player';
import {Game, Player as PlayerInterface, State} from '../reduxDefs/stateInterface';

const PlayerStyle = {
    height: 'calc(100% - 30px)',
    width: '100%',
};

interface SinglePlayerGameProps {
    player: PlayerInterface;
    game: Game;
    addPlayer: (name: string, deckUrl: string) => void;
}

interface StateFromProps {
    player: PlayerInterface;
    game: Game;
}

interface DispatchFromProps {
    addPlayer: (name: string, deckUrl: string) => void;
  }

function mapStateToProps (state: State) {
    console.log(state);
    return {
        player: state.players[0],
        game: state.game
    };
}

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchFromProps => ({
    addPlayer: (name: string, deckUrl: string) => dispatch(playersAddPlayer(name, deckUrl))
});

class SinglePlayerGame extends React.Component<SinglePlayerGameProps, {}> {
    constructor (props: SinglePlayerGameProps) {
        super(props);
        if (!props.player) {
            this.props.addPlayer('Player 1', 'deckUrl');
        }
    }

    public render() {
        const props = this.props;
        if (props.player) {
        return(
            <div className='fullSize'>
                <Menu />
                <div style={PlayerStyle}>
                    <Player {...props.player} />
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
export default connect <StateFromProps, any> (mapStateToProps, mapDispatchToProps)(SinglePlayerGame);
