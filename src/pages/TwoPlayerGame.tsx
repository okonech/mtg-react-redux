import React from 'react';
import { connect } from 'react-redux';
import Menu from '../components/Menu';
import Player from '../containers/Player';
import { AppState } from '../reducers/index';

const PlayerStyle: React.CSSProperties = {
    height: 'calc(100% - 30px)',
    width: '100%'
};

interface TwoPlayerGameProps {
    player: string;
    loading: boolean;
}

const mapStateToProps = (state: AppState) => ({
    player: state.players.playerIds[0],
    loading: state.isLoading
});

const mapDispatchToProps = () => ({});

class TwoPlayerGame extends React.Component<TwoPlayerGameProps, {}> {

    public render() {
        const props = this.props;
        if (!props.loading) {
            return (
                <div className='fullSize'>
                    <Menu />
                    <div style={PlayerStyle}>
                        <div style={{ height: '50%' }}>
                            <Player id={props.player} />
                        </div>
                        <div style={{ height: '50%' }}>
                            <Player id={props.player} />
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
export default connect(mapStateToProps, mapDispatchToProps)(TwoPlayerGame);
