
import { XYCoord } from 'dnd-core';
import { defaultMemoize } from 'reselect';
import { getCardSizePx } from './cardSize';

// global snap storage
let snapEnabled = false;
let snapOverNode: Element;

export function snapToGrid(coord: XYCoord) {
    const { x, y } = coord;
    const { x: xOffset, y: yOffset } = snapOverNode ? nodePosition(snapOverNode) : { x: 0, y: 0 };
    const { snapX, snapY } = getSnapSize();

    const snappedX = Math.round((x - xOffset) / snapX) * snapX;
    const snappedY = Math.round((y - yOffset) / snapY) * snapY;

    return { x: snappedX + xOffset, y: snappedY + yOffset };
}

export function getSnapSize() {
    const { height, width } = getCardSizePx();
    return {
        snapX: width / 2,
        snapY: height / 2
    };
}

const nodePosition = defaultMemoize((node: Element): XYCoord => {
    const bounds = node.getBoundingClientRect();
    return {
        x: bounds.left,
        y: bounds.top
    };
});

// enable/ disable funcs

export function getSnapEnabled() {
    return snapEnabled;
}

export function setSnapEnabled(snap: boolean) {
    snapEnabled = snap;
}

export function setSnapOverNode(node: Element) {
    snapOverNode = node;
}
