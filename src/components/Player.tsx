import React from 'react';
import { defaultMemoize } from 'reselect';
import BattleField from '../containers/BattleField';
import Hand from '../containers/Hand';
import InfoArea from '../containers/InfoArea';
import { AllProps } from '../containers/Player';
import CardCustomDragLayer from './CardCustomDragLayer';

// todo: explore changing to fr fraction of leftoveravail area style

const grid = defaultMemoize((row: number, col: number, cardHeight: number,
                             style: React.CSSProperties): React.CSSProperties => ({
        ...style,
        display: 'grid',
        gridTemplateColumns: `15fr 85fr`,
        gridTemplateRows: `75fr 25fr`,
        gridTemplateAreas: "'info battlefield' 'info hand'"
    }));

export default class Player extends React.PureComponent<AllProps, {}> {

    public render() {
        const { player, moveCards, selectCards, selected, pageDivision, style } = this.props;
        const { hand, battlefield, library } = player;
        const { row, col } = pageDivision;
        const cardHeight = (25 / col) - ((10 / 4) / col);
        return (
            <div style={grid(row, col, cardHeight, style)}>
                <InfoArea
                    style={{ gridArea: 'info' }}
                    player={player}
                    moveCards={moveCards}
                    key={library.id}
                />
                <BattleField
                    style={{ gridArea: 'battlefield' }}
                    zone={battlefield}
                    moveCards={moveCards}
                    selectCards={selectCards}
                    key={battlefield.id}
                    selected={selected}
                    cardHeight={cardHeight}
                />
                <Hand
                    style={{ gridArea: 'hand' }}
                    zone={hand}
                    moveCards={moveCards}
                    selectCards={selectCards}
                    key={hand.id}
                    selected={selected}
                    cardHeight={cardHeight}
                />
                <CardCustomDragLayer
                    cardHeight={cardHeight}
                />
            </div>
        );
    }
}
