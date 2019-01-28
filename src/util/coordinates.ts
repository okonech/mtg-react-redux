import { findDOMNode } from 'react-dom';
import { defaultMemoize } from 'reselect';

export const CARD_RATIO = 1.395973;

interface Coord {
    x: number;
    y: number;
}

export const coordInNode = defaultMemoize((component: React.ReactInstance, coord: Coord): Coord => {
    const node = findDOMNode(component) as Element;
    const bounds = node.getBoundingClientRect();
    return {
        x: coord.x - bounds.left,
        y: coord.y - bounds.top
    };
});

export const vhToPx = defaultMemoize((vh: number): number => {
    return document.documentElement.clientHeight * vh / 100;
});
