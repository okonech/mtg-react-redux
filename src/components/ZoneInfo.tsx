import React from 'react';
import {
    ConnectDragPreview, ConnectDragSource, ConnectDropTarget, DragSource,
    DragSourceMonitor, DragSourceSpec, DropTarget, DropTargetSpec
} from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { findDOMNode } from 'react-dom';
import { selectCards as selectCardsType } from '../actions/selectActions';
import { moveCards as moveCardsType } from '../actions/zonesActions';
import { CardDragObject } from '../components/DraggableCard';
import { Types } from '../Constants';
import { CardZone } from '../selectors/player';
import { noSelect } from '../util/styling';

export interface ZoneInfoProps {
    zone: CardZone;
    icon: string;
    moveCards: moveCardsType;
    selectCards: selectCardsType;
    style?: React.CSSProperties;
    // temp
    click?: () => void;
}

interface DropTargetCollectedProps {
    connectDropTarget?: ConnectDropTarget;
    canDrop?: boolean;
}

interface DragSourceCollectedProps {
    connectDragSource?: ConnectDragSource;
    connectDragPreview?: ConnectDragPreview;
}

const cardSource: DragSourceSpec<ZoneInfoProps, CardDragObject> = {

    beginDrag(props: ZoneInfoProps, monitor: DragSourceMonitor, component: ZoneInfo): CardDragObject {

        const { selectCards, zone } = props;
        const { id, cards } = zone;
        const selected = cards[cards.length - 1];
        console.log('Start drag ' + selected.name);

        const node = findDOMNode(component) as Element;
        const bounds = node.getBoundingClientRect();
        const offset = monitor.getInitialClientOffset();

        selectCards([selected.id]);

        return {
            cards: [selected.id],
            firstCard: selected,
            zoneId: id,
            initialX: offset.x - bounds.left,
            initialY: offset.y - bounds.top
        };
    },
    endDrag(props: ZoneInfoProps, monitor: DragSourceMonitor) {
        console.log('End drag ' + props.zone.id);
    },
    canDrag(props: ZoneInfoProps, monitor: DragSourceMonitor) {
        const { cards } = props.zone;
        return cards.length > 0;
    }

};

const zoneTarget: DropTargetSpec<ZoneInfoProps> = {
    drop(props: ZoneInfoProps, monitor, component: ZoneInfo) {
        const { moveCards, selectCards, zone } = props;
        const { zoneId, cards } = monitor.getItem() as CardDragObject;

        moveCards(zoneId, cards, zone.id, zone.cards.length, 0, 0);
        selectCards([]);
    }
};

const zoneStyle: React.CSSProperties = noSelect({
    display: 'flex',
    position: 'relative',
    justifyContent: 'center',
    borderTop: '1px solid black'
});

const CountStyle: React.CSSProperties = {
    position: 'absolute',
    alignSelf: 'center',
    fontWeight: 800
};
class ZoneInfo extends React.PureComponent<ZoneInfoProps & DropTargetCollectedProps & DragSourceCollectedProps> {

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
        const { zone, style, icon, click, connectDragSource, connectDropTarget } = this.props;
        const { cards } = zone;
        const count = cards.length;

        return (
            connectDragSource(
                connectDropTarget(
                    <article
                        onClick={click}
                        style={{ ...zoneStyle, ...style }}
                    >
                        <img draggable={false} src={icon} />
                        <span style={CountStyle}>
                            {count}
                        </span>
                    </article>
                )
            )

        );
    }
}

export default DragSource<ZoneInfoProps>(
    Types.CARD, cardSource, (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging()
    }))(DropTarget(Types.CARD, zoneTarget, (connect, monitor) => ({
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
        dragItem: monitor.getItem()
    }))(ZoneInfo));
