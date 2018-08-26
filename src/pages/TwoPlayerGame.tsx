import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {playersAddPlayer} from '../actions/playersActions';
import Menu from '../components/Menu/Menu';
import Player from '../containers/Player/Player';
import {Game, Player as PlayerInterface, State} from '../reduxDefs/stateInterface';

const PlayerStyle: React.CSSProperties = {
    height: 'calc(100% - 30px)',
    width: '100%',
};

interface TwoPlayerGameProps {
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

class TwoPlayerGame extends React.Component<TwoPlayerGameProps, {}> {
    constructor (props: TwoPlayerGameProps) {
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
                    <div style={{height: '50%'}}>
                        <Player {...props.player} />
                    </div>
                    <div style={{height: '50%'}}>
                        <Player {...props.player} />
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
export default connect <StateFromProps, any> (mapStateToProps, mapDispatchToProps)(TwoPlayerGame);
