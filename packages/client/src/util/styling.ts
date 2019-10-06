import { defaultMemoize } from 'reselect';

export const noSelect = defaultMemoize((style: React.CSSProperties): React.CSSProperties => ({
    ...style,
    WebkitTouchCallout: 'none',
    WebkitUserSelect: 'none',
    MozUserSelect: 'none',
    msUserSelect: 'none',
    userSelect: 'none',
    pointerEvents: 'none'
}));

export interface BaseComponentProps {
    style?: React.CSSProperties;
}

export const MTG_COLORS = {
    White: '#F9FAF4',
    Blue: '#0E68AB',
    Black: '#150B00',
    Red: '#D3202A',
    Green: '#00733E',
    Multicolor: '#D7C283',
    Colorless: '#D5D4D0',
    Land: '#6832a8'
};
