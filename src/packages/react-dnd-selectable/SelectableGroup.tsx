import * as React from 'react';
import { ConnectDragPreview, ConnectDragSource, DragSource, DragSourceSpec, XYCoord } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { SELECTABLE } from '.';

// draggable card component with id, key, x, y position

export interface SelectableDragObject {
    initial: XYCoord;
    current: XYCoord;
}

const cardSource: DragSourceSpec<SelectableGroupProps, SelectableDragObject> = {

    beginDrag(props, monitor, component: SelectableGroup): SelectableDragObject {

        return {
            initial: { x: 0, y: 0 },
            current: { x: 100, y: 100 }
        };
    }

};

interface SelectableGroupProps {
    tolerance?: number;
    style?: React.CSSProperties;
}

interface SelectableGroupSourceCollectedProps {
    connectDragSource: ConnectDragSource;
    connectDragPreview: ConnectDragPreview;
    isDragging: boolean;
}

type AllProps = SelectableGroupProps & SelectableGroupSourceCollectedProps;

class SelectableGroup extends React.PureComponent<AllProps> {

    // remove this code to return drag prevew  
    public componentDidMount() {
        const { connectDragPreview } = this.props;
        if (connectDragPreview) {
            // Use empty image as a drag preview so browsers don't draw it
            // and we can draw whatever we want on the custom drag layer instead.
            connectDragPreview(getEmptyImage(), {
                // IE fallback: specify that we'd rather screenshot the node
                // when it already knows it's being dragged so we can hide it with CSS.
                captureDraggingState: true
            });
        }
    }

    public render() {
        const { connectDragSource, style, children } = this.props;

        return (
            connectDragSource(
                <div style={style}>
                    {children}
                </div>
            )
        );
    }
}

export default DragSource<SelectableGroupProps, SelectableGroupSourceCollectedProps>(
    SELECTABLE, cardSource, (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging()
    }))(SelectableGroup);
