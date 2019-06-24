
import React from 'react';
import {
    ConnectDragPreview, ConnectDragSource, ConnectDropTarget, DragSource,
    DragSourceMonitor, DragSourceSpec, DropTarget, DropTargetSpec
} from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { selectCards as selectCardsType } from '../actions/selectActions';
import { moveCards as moveCardsType } from '../actions/zonesActions';
import ZoneInfo from '../components/ZoneInfo';
import { Types } from '../Constants';
import { CardZone } from '../selectors/player';
import { CardDragObject } from './DraggableCard';

export interface ZoneInfoDndProps {
    zone: CardZone;
    icon: any;
    style?: React.CSSProperties;
    moveCards: moveCardsType;
    selectCards: selectCardsType;
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

const cardSource: DragSourceSpec<ZoneInfoDndProps, CardDragObject> = {

    beginDrag(props: ZoneInfoDndProps, monitor: DragSourceMonitor, component: ZoneInfoDnd): CardDragObject {

        const { selectCards, zone } = props;
        const { id, cards } = zone;
        const selected = cards[cards.length - 1];

        selectCards([selected.id]);

        return {
            cards: [selected.id],
            zoneId: id
        };
    },
    canDrag(props: ZoneInfoDndProps, monitor: DragSourceMonitor) {
        const { cards } = props.zone;
        return cards.length > 0;
    }

};

const zoneTarget: DropTargetSpec<ZoneInfoDndProps> = {
    drop(props: ZoneInfoDndProps, monitor, component: ZoneInfoDnd) {
        const { moveCards, selectCards, zone } = props;
        const { zoneId, cards } = monitor.getItem() as CardDragObject;
        cards.forEach((id) => {
            const element = document.getElementById(id);
            if (element) {
                element.style.display = 'block';
            }
        });
        moveCards(zoneId, cards, zone.id, zone.cards.length, 0, 0);
        selectCards([]);
    }
};

const ZoneInfoDndStyle: React.CSSProperties = {
    display: 'flex',
    height: '100%'
};

class ZoneInfoDnd extends React.PureComponent<ZoneInfoDndProps & DropTargetCollectedProps & DragSourceCollectedProps> {

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
        const { zone, icon, style, click, connectDragSource, connectDropTarget } = this.props;
        return (
            connectDragSource(
                connectDropTarget(
                    <article
                        onClick={click}
                        style={{ ...style, ...ZoneInfoDndStyle }}
                    >
                        <ZoneInfo
                            num={zone.cards.length}
                            icon={icon}
                        />
                    </article>
                )
            )

        );
    }
}

export default DragSource<ZoneInfoDndProps>(
    Types.CARD, cardSource, (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging()
    }))(DropTarget(Types.CARD, zoneTarget, (connect, monitor) => ({
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
        dragItem: monitor.getItem()
    }))(ZoneInfoDnd));
