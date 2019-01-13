import React from 'react';
import BattleField from '../containers/BattleField';
import Hand from '../containers/Hand';
import InfoArea from '../containers/InfoArea';
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
    moveCard?: (fromZone: string, fromIdx: number, toZone: string, toIdx: number) => void;
}

export default class Player extends React.PureComponent<PlayerProps, {}> {

    public render() {
        const { player, moveCard } = this.props;
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
                            moveCard={moveCard}
                            key={battlefield.id}
                        />
                    </div>
                    <div style={HandStyle}>
                        <Hand
                            zone={hand}
                            moveCard={moveCard}
                            key={hand.id}
                        />
                    </div>
                </div>
                <CardCustomDragLayer />
            </div>
        );
    }
}
