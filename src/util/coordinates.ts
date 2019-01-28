import { findDOMNode } from 'react-dom';
import { defaultMemoize } from 'reselect';

export const CARD_RATIO = 1.395973;
let cardHeight;

interface Coord {
    x: number;
    y: number;
}

export interface Size {
    height: number;
    width: number;
}

export const coordInNode = defaultMemoize((component: React.ReactInstance, coord: Coord): Coord => {
    const node = findDOMNode(component) as Element;
    const bounds = node.getBoundingClientRect();
    return {
        x: coord.x - bounds.left,
        y: coord.y - bounds.top
    };
});

export const setCardHeight = (vh: number) => cardHeight = vh;

export const cardSizeVh = defaultMemoize((): Size => {
    return {
        height: cardHeight,
        width: cardHeight / CARD_RATIO
    };
});

export const cardSizePx = (): Size => {
    const heightPx = document.documentElement.clientHeight * cardHeight / 100;
    return {
        height: heightPx,
        width: heightPx / CARD_RATIO
    };
};
