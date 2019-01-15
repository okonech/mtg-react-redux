import React from 'react';
import BattleField from '../containers/BattleField';
import Hand from '../containers/Hand';
import InfoArea from '../containers/InfoArea';
import { PlayerMappedDispatch, PlayerMappedProps } from '../containers/Player';
import { PlayerData } from '../selectors/player';
import CardCustomDragLayer from './CardCustomDragLayer';

const InfoAreaStyle: React.CSSProperties = {
    height: '100%',
    width: '15%',
    float: 'left',
    backgroundColor: '#111'
};

const HandStyle: React.CSSProperties = {
    height: '25%',
    width: '100%'
};

const BattleFieldStyle: React.CSSProperties = {
    height: '75%',
    width: '100%'
};

const ActiveAreaStyle: React.CSSProperties = {
    height: '100%',
    marginLeft: '15%', /* Same as the width of the sidebar */
    width: '85%'
};

export interface PlayerProps {
    player: PlayerData;
    id: string;
}

export default class Player extends React.PureComponent<PlayerProps & PlayerMappedDispatch & PlayerMappedProps, {}> {

    public render() {
        const { player, moveCards, selectCards } = this.props;
        const { hand, battlefield } = player;
        return (
            <div className='fullSize'>
                <div style={InfoAreaStyle}>
                    <InfoArea />
                </div>
                <div style={ActiveAreaStyle}>
                    <div style={BattleFieldStyle}>
                        <BattleField
                            zone={battlefield}
                            moveCards={moveCards}
                            selectCards={selectCards}
                            key={battlefield.id}
                        />
                    </div>
                    <div style={HandStyle}>
                        <Hand
                            zone={hand}
                            moveCards={moveCards}
                            selectCards={selectCards}
                            key={hand.id}
                        />
                    </div>
                </div>
                <CardCustomDragLayer />
            </div>
        );
    }
}
