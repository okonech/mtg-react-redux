import React from 'react';
import {Player as PlayerProps} from '../../reduxDefs/stateInterface';
import BattleField from '../BattleField/BattleField';
import Hand from '../Hand/Hand';
import InfoArea from '../InfoArea';

const InfoAreaStyle: any  = {
    height: '100%',
    width: '15%',
    float: 'left',
    'backgroundColor': '#111',
};

const HandStyle: any = {
    height: '25%',
    width: '100%'
};

const BattleFieldStyle = {
    height: '75%',
    width: '100%'
};

const ActiveAreaStyle = {
    height: '100%',
    marginLeft: '15%', /* Same as the width of the sidebar */
    width: '85%'
};

export default class Player extends React.Component<PlayerProps, {}> {
    public cards: string[];

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
                        <BattleField cards={this.props.battlefield} />
                    </div>
                    <div style={HandStyle}>
                            <Hand cards = {this.props.hand}/>
                    </div>
                </div>
            </div>
        );
      }
}