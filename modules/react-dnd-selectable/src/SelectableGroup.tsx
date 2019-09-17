import * as React from 'react';
import {
    ConnectDragPreview, ConnectDragSource, ConnectDropTarget,
    DragSource, DragSourceSpec, DropTarget, DropTargetSpec, XYCoord
} from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import rectIntersect from './util/rectanglesIntersect';
import { BaseComponentProps } from './util/styling';

import { defaultContext, SelectableContext, SelectableProvider } from './SelectableContext';

// draggable card component with id, key, x, y position

export const Types = {
    SELECTABLE: 'SELECTABLE_TYPE'
};

export interface DragSelectable {
    id: string;
    clientBounds: ClientRect | DOMRect;
}

interface SelectableGroupProps extends BaseComponentProps {
    tolerance?: number;
    groupId: string;
    onSelectionFinish?: (ids: string[]) => void;
    onSelectionClear?: (ids: string[]) => void;
}

const defStyle: React.CSSProperties = {
    height: '100%',
    width: '100%'
};

const cardSource: DragSourceSpec<SelectableGroupProps, DragSelectable> = {
    beginDrag(props, monitor, dropTargetComponent): DragSelectable {
        const { onSelectionClear } = props;
        // wrapped in DropTarget, need that ref to reach actual component
        const component = dropTargetComponent.getDecoratedComponentInstance() as SelectableGroup;
        const { selecting, selectableRef } = component.state;
        if (onSelectionClear) {
            onSelectionClear(selecting);
        }
        return {
            clientBounds: selectableRef.getBoundingClientRect(),
            id: props.groupId
        };
    },
    endDrag(props, monitor, component: SelectableGroup) {
        const { onSelectionClear } = component.props;
        if (onSelectionClear && !monitor.didDrop()) {
            onSelectionClear(component.state.selecting);
        }
        component.setState({
            selecting: []
        });
    }
};

const battlefieldTarget: DropTargetSpec<SelectableGroupProps> = {
    drop(props, monitor, component: SelectableGroup) {
        const { onSelectionFinish } = props;
        const { selecting } = component.state;
        if (onSelectionFinish) {
            onSelectionFinish(selecting);
        }
        component.setState({
            selected: selecting,
            selecting: []
        });
    },
    canDrop(props, monitor) {
        return (monitor.getItem() as DragSelectable).id === props.groupId;
    },
    hover(props, monitor, component: SelectableGroup) {

        if ((monitor.getItem() as DragSelectable).id !== props.groupId) {
            return null;
        }

        const { selecting, registry } = component.state;
        const { x: x1, y: y1 } = monitor.getInitialClientOffset();
        const { x: x2, y: y2 } = monitor.getClientOffset();
        const selRect = {
            left: Math.min(x1, x2),
            right: Math.max(x1, x2),
            top: Math.min(y1, y2),
            bottom: Math.max(y1, y2)
        };
        const newSel = [...selecting];
        let edit = false;
        registry.forEach((value, key) => {

            if (rectIntersect(selRect, value.getBoundingClientRect(), props.tolerance)) {
                if (!selecting.includes(key)) {
                    newSel.push(key);
                    edit = true;
                }
            } else if (selecting.includes(key)) {
                const index = newSel.indexOf(key);
                if (index > -1) {
                    newSel.splice(index, 1);
                    edit = true;
                }
            }
        });
        if (edit) {
            component.setState({ selecting: newSel });
        }
    }
};

interface SelectableGroupSourceCollectedProps {
    connectDragSource: ConnectDragSource;
    connectDragPreview: ConnectDragPreview;
}

interface SelectableGroupTargetCollectedProps {
    connectDropTarget: ConnectDropTarget;
    offset: XYCoord;
}

type AllProps = SelectableGroupProps & SelectableGroupSourceCollectedProps & SelectableGroupTargetCollectedProps;

class SelectableGroup extends React.PureComponent<AllProps, SelectableContext> {

    public state = defaultContext();

    public selectableRef: React.RefObject<HTMLDivElement>;

    constructor(props: AllProps) {
        super(props);
        this.selectableRef = React.createRef();
    }

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
        this.setState({
            selectableRef: this.selectableRef.current
        });
    }

    public render() {
        const { connectDragSource, connectDropTarget, style, children } = this.props;
        return (
            connectDragSource(
                connectDropTarget(
                    <div style={{ ...defStyle, ...style }} ref={this.selectableRef}>
                        <SelectableProvider value={this.state}>
                            {children}
                        </SelectableProvider>
                    </div >
                )
            )
        );
    }
}

export default DragSource<SelectableGroupProps, SelectableGroupSourceCollectedProps>(
    Types.SELECTABLE, cardSource, (connect) => ({
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview()
    }))(DropTarget(Types.SELECTABLE, battlefieldTarget, (connect, monitor) => ({
        connectDropTarget: connect.dropTarget(),
        offset: monitor.getClientOffset()
    }))(SelectableGroup));
