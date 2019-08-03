import React, { useCallback, useState } from 'react';
import WithHover from '../hocs/WithHover';
import { BaseComponentProps } from '../util/styling';

interface CardListCellProps extends BaseComponentProps {
    isHovered?: boolean;
    direction: CardListProps['direction'];
    fullSize: boolean;
    id?: string;
}

const defCellStyle: React.CSSProperties = {
    display: 'block',
    transform: 'translateZ(0px)',
    transition: 'all 0.2s ease-in-out'
};

const CardListCellAuto: React.SFC<CardListCellProps> = (props) => {
    const { children, isHovered, fullSize, direction } = props;
    const modProp = direction === 'row' ? 'width' : 'height';
    const [size, setSize] = useState({ height: 0, width: 0 });
    const measuredRef = useCallback((node) => {
        if (node !== null) {
            const rect = node.firstElementChild.getBoundingClientRect();
            setSize({ height: rect.height, width: rect.width });
        }
    }, []);

    let style: React.CSSProperties;
    if (size.height === 0 || size.width === 0) {
        style = { ...defCellStyle, [modProp]: 30 };
    } else {
        const divisor = modProp === 'height' ? 8 : 4;
        style = (isHovered || fullSize) ? { ...defCellStyle, ...size } : { ...defCellStyle, [modProp]: size[modProp] / divisor };
    }

    return (
        <div style={style} ref={measuredRef}>
            {React.Children.only(children)}
        </div>
    );
};

interface CardListCellFixedProps extends CardListCellProps {
    size: CardListProps['cellSize'];
}

const CardListCellFixed: React.SFC<CardListCellFixedProps> = (props) => {
    const { children, isHovered, fullSize, direction, size } = props;
    const modProp = direction === 'row' ? 'width' : 'height';
    const divisor = modProp === 'height' ? 8 : 5;
    const defStyle = { ...defCellStyle, ...size };
    const style = (isHovered || fullSize) ? defStyle : { ...defCellStyle, [modProp]: size[modProp] / divisor };

    return (
        <div style={style} >
            {React.Children.only(children)}
        </div>
    );
};

interface CardListProps extends BaseComponentProps {
    direction: 'row' | 'column';
    children: React.ReactNode;
    cellSize?: { height: number, width: number };
}

const HoverCardListCellFixed = WithHover(CardListCellFixed);
const HoverCardListCellAuto = WithHover(CardListCellAuto);

const CardList: React.FC<CardListProps> = (props) => {
    const { direction = 'row', children, cellSize } = props;
    const childLength = React.Children.count(children);

    return (
        <div style={{ display: 'flex', flexDirection: direction }}>
            {React.Children.map(children, (child, idx) => {
                if (cellSize) {
                    return (<HoverCardListCellFixed size={cellSize} direction={direction} fullSize={idx === childLength - 1}>
                        {child}
                    </HoverCardListCellFixed>);
                } else {
                    return (<HoverCardListCellAuto direction={direction} fullSize={idx === childLength - 1}>
                        {child}
                    </HoverCardListCellAuto>);
                }

            })}
        </div>
    );
};

export default CardList;
