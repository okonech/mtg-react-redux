
import { BaseComponentProps } from '../util/styling';
import { CardDragObject } from './DraggableCard';
import {
    ConnectDragPreview, ConnectDragSource, ConnectDropTarget, DragSource,
    DragSourceSpec, DropTarget, DropTargetSpec
} from 'react-dnd';
import { GameCardZone } from '../selectors/player';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { moveCards as moveCardsType } from '../actions/gameCardsActions';
import { selectCards as selectCardsType } from '../actions/selectActions';
import { Types } from '../Constants';
import React from 'react';
import ZoneInfo from '../components/ZoneInfo';

export interface ZoneInfoDndProps extends BaseComponentProps {
    zone: GameCardZone;
    icon: any;
    moveCards: typeof moveCardsType;
    selectCards: typeof selectCardsType;
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

    beginDrag(props: ZoneInfoDndProps): CardDragObject {

        const { selectCards, zone } = props;
        const { id, cards } = zone;
        const selected = cards[cards.length - 1];

        selectCards([selected.gameCard.id]);

        return {
            cards: [selected.gameCard.id],
            zoneId: id
        };
    },
    canDrag(props: ZoneInfoDndProps) {
        const { cards } = props.zone;
        return cards.length > 0;
    }

};

const zoneTarget: DropTargetSpec<ZoneInfoDndProps> = {
    drop(props: ZoneInfoDndProps, monitor) {
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
                        onDoubleClick={click}
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
