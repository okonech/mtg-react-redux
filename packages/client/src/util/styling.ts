import { defaultMemoize } from 'reselect';

export const noSelect = defaultMemoize((style: React.CSSProperties): React.CSSProperties => ({
    ...style,
    WebkitTouchCallout: 'none',
    WebkitUserSelect: 'none',
    MozUserSelect: 'none',
    msUserSelect: 'none',
    userSelect: 'none'
}));

export interface BaseComponentProps {
    style?: React.CSSProperties;
}
