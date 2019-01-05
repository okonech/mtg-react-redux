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
    player: PlayerData;
    id: string;
    moveCard?: (fromZone: string, fromIdx: number, toZone: string, toIdx: number) => void;
}

export default class Player extends React.Component<PlayerProps, {}> {

    private playerArea: any;

    constructor(props: any) {
        super(props);
    }

    public componentDidMount() {
        const height = this.playerArea.clientHeight;
        console.log(height);
        this.setState({ height });
    }

    public render() {
        const { player, moveCard } = this.props;
        const { hand, battlefield } = player;
        return (
            <div className='fullSize' ref={(playerArea) => this.playerArea = playerArea}>
                <div style={InfoAreaStyle}>
                    <InfoArea />
                </div>
                <div style={ActiveAreaStyle}>
                    <div style={BattleFieldStyle}>
                        <BattleField
                            zone={battlefield}
                            moveCard={moveCard}
                        />
                    </div>
                    <div style={HandStyle}>
                        <Hand
                            zone={hand}
                            moveCard={moveCard}
                        />
                    </div>
                </div>
                <CardCustomDragLayer />
            </div>
        );
    }
}
