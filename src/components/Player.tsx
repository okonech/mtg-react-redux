import React from 'react';
import { defaultMemoize } from 'reselect';
import BattleField from '../containers/BattleField';
import Hand from '../containers/Hand';
import InfoArea from '../containers/InfoArea';
import { PlayerMappedDispatch, PlayerMappedProps } from '../containers/Player';
import CardCustomDragLayer from './CardCustomDragLayer';

// todo: explore changing to fr fraction of leftoveravail area style

const grid = defaultMemoize((row: number, col: number): React.CSSProperties => ({
    display: 'grid',
    gridTemplateColumns: `${15 / row}vw ${85 / row}vw`,
    gridTemplateRows: `calc(${75 / col}vh - ${30 / col}px) ${25 / col}vh`
}));

const infoAreaStyle = defaultMemoize((row: number, col: number): React.CSSProperties => ({
    gridRow: '1/3'
}));

const battleFieldStyle = defaultMemoize((row: number, col: number): React.CSSProperties => ({
    gridColumn: '2/4'
}));

const handStyle = defaultMemoize((row: number, col: number): React.CSSProperties => ({
    gridColumn: '2/4'
}));

export default class Player extends React.PureComponent<PlayerMappedDispatch & PlayerMappedProps, {}> {

    public render() {
        const { player, moveCards, selectCards, selected, pageDivision } = this.props;
        const { hand, battlefield, library } = player;
        const { row, col } = pageDivision;
        const cardHeight = (25 / col) - ((10 / 4) / col);
        return (
            <div style={grid(row, col)}>
                <div style={infoAreaStyle(row, col)}>
                    <InfoArea
                        player={player}
                        moveCards={moveCards}
                        key={library.id}
                    />
                </div>
                <div style={battleFieldStyle(row, col)}>
                    <BattleField
                        zone={battlefield}
                        moveCards={moveCards}
                        selectCards={selectCards}
                        key={battlefield.id}
                        selected={selected}
                        cardHeight={cardHeight}
                    />
                </div>
                <div style={handStyle(row, col)}>
                    <Hand
                        zone={hand}
                        moveCards={moveCards}
                        selectCards={selectCards}
                        key={hand.id}
                        selected={selected}
                        cardHeight={cardHeight}
                    />
                </div>
                <CardCustomDragLayer
                    cardHeight={cardHeight}
                />
            </div>
        );
    }
}
