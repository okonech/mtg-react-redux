import { Identifier, XYCoord } from 'dnd-core';
import React from 'react';
import { SelectableContext } from './SelectableContext';
import { Types } from './SelectableGroup';

interface SelectableDragLayerProps {
    context?: SelectableContext;
    initialClientOffset?: XYCoord;
    currentClientOffset?: XYCoord;
    itemType: Identifier;
    isDragging: boolean;
}

const getStyle = (initialOffset: XYCoord, currentOffset: XYCoord): React.CSSProperties => {
    const { x: initX, y: initY } = initialOffset;
    const { x: currX, y: currY } = currentOffset;

    const left = Math.min(initX, currX);
    const top = Math.min(initY, currY);

    const height = Math.abs(initY - currY);
    const width = Math.abs(initX - currX);

    return {
        position: 'absolute',
        top,
        left,
        height: `${height}px`,
        width: `${width}px`,
        opacity: 0.2
    };
};

// only wrapped components can be selected
const WithSelectableDragLayer = <P extends object>(Component: React.ComponentType<P>) => {
    class SelectableDragLayer extends React.PureComponent<P & SelectableDragLayerProps> {

        public render() {
            const { props } = this;
            const { isDragging, itemType, currentClientOffset, initialClientOffset } = props;

            if (!isDragging || !initialClientOffset) {
                return null;
            }

            if (itemType === Types.SELECTABLE) {
                return (
                    <div
                        className={'selectable-selectbox'}
                        style={getStyle(currentClientOffset, initialClientOffset)}
                    />
                );
            }
            // else return regular drag layer
            return (
                <Component
                    {...props as P}
                />
            );
        }
    }

    return SelectableDragLayer;
};

export default WithSelectableDragLayer;
