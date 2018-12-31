import React from 'react';
import CardCustomDragLayer from './Card/CardCustomDragLayer';
import { Card } from '../reducers/cardsReducer';
import BattleField from '../containers/BattleField/BattleField';
import Hand from '../containers/Hand/Hand';
import InfoArea from '../containers/InfoArea';
import { PlayerData } from '../selectors/player';

const InfoAreaStyle: React.CSSProperties = {
    height: '100%',
    width: '15%',
    float: 'left',
    backgroundColor: '#111'
};

const HandStyle: React.CSSProperties = {
    height: '33.3%',
    width: '100%'
};

const BattleFieldStyle: React.CSSProperties = {
    height: '66.6%',
    width: '100%'
};

const ActiveAreaStyle: React.CSSProperties = {
    height: '100%',
    marginLeft: '15%', /* Same as the width of the sidebar */
    width: '85%'
};

export interface PlayerProps {
    player: PlayerData,
    id: string;
}

export default class Player extends React.Component<PlayerProps, {}> {
    public cards: Card[];

    constructor(props: any) {
        super(props);
    }

    public render() {
        return (
            <div className='fullSize'>
                <div style={InfoAreaStyle}>
                    <InfoArea />
                </div>
                <div style={ActiveAreaStyle}>
                    <div style={BattleFieldStyle}>
                        <BattleField zone={this.props.player.battlefield} />
                    </div>
                    <div style={HandStyle}>
                        <Hand zone={this.props.player.hand} />
                    </div>
                </div>
                <CardCustomDragLayer />
            </div>
        );
    }
}