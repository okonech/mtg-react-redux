import React from 'react';
import { CardZone } from '../selectors/player';

interface ZoneInfoProps {
    zone: CardZone;
    icon: string;
    style?: React.CSSProperties;
    // temp
    click?: () => void;
}

const zoneStyle: React.CSSProperties = {
    display: 'flex',
    position: 'relative',
    justifyContent: 'center',
    borderTop: '1px solid black'
};

const CountStyle: React.CSSProperties = {
    position: 'absolute',
    alignSelf: 'center',
    fontWeight: 800
};

const ZoneInfo = (props: ZoneInfoProps) => {
    const { zone, style, icon, click } = props;
    const { cards } = zone;
    const count = cards.length;

    return (
        <article
            onClick={click}
            style={{ ...zoneStyle, ...style }}
        >
            <img src={icon} />
            <span style={CountStyle}>
                {count}
            </span>
        </article>
    );
};

export default ZoneInfo;
