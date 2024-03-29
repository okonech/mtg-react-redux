import { Identifier, XYCoord } from 'dnd-core';
import React from 'react';
import { SelectableContext } from './SelectableContext';
import { Types } from './SelectableGroup';

interface SelectableDragLayerProps {
    context?: SelectableContext;
    initialClientOffset: XYCoord;
    currentClientOffset: XYCoord;
    itemType: Identifier;
    isDragging: boolean;
    item: any;
}

const getStyle = (initialOffset: XYCoord, currentOffset: XYCoord,
    clientBounds: ClientRect | DOMRect): React.CSSProperties => {
    const { x: initX, y: initY } = initialOffset;
    const { x: currX, y: currY } = currentOffset;
    const { left: clientLeft, top: clientTop, right: clientRight, bottom: clientBottom } = clientBounds;

    const left = Math.max(Math.min(initX, currX), clientLeft);
    const top = Math.max(Math.min(initY, currY), clientTop);
    const right = Math.min(Math.max(initX, currX), clientRight);
    const bottom = Math.min(Math.max(initY, currY), clientBottom);

    const height = Math.abs(top - bottom);
    const width = Math.abs(left - right);

    return {
        position: 'fixed',
        pointerEvents: 'none',
        top,
        left,
        height: `${height}px`,
        width: `${width}px`,
        opacity: 0.2
    };
};

// only wrapped components can be selected
const WithSelectableDragLayer = <P extends object>(Component: React.ComponentType<P>) =>

    (props: P & SelectableDragLayerProps) => {
        const { isDragging, itemType, item, currentClientOffset, initialClientOffset } = props;

        if (!isDragging || !initialClientOffset) {
            return null;
        }

        if (itemType === Types.SELECTABLE) {
            return (
                <div
                    className={'selectable-selectbox'}
                    style={getStyle(currentClientOffset, initialClientOffset, item.clientBounds)}
                />
            );
        }
        // else return regular drag layer
        return (
            <Component
                {...props as P}
            />
        );
    };

export default WithSelectableDragLayer;
