
import React from 'react';
import {
    ConnectDragPreview, ConnectDragSource, ConnectDropTarget, DragSource,
    DragSourceSpec, DropTarget, DropTargetSpec
} from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { findDOMNode } from 'react-dom';
import { SelectableGroup, SelectableItem } from 'react-selectable-fast';
import { selectCards as selectCardsType } from '../actions/selectActions';
import { moveCards as moveCardsType } from '../actions/zonesActions';
import DraggableCard, { CardDragObject } from '../components/DraggableCard';
import { Types } from '../Constants';
import { CardCoordZone } from '../selectors/player';
import { cardSizePx, coordInNode } from '../util/coordinates';

const BattleFieldStyle: React.CSSProperties = {
    height: '100%',
    width: '100%',
    backgroundColor: 'green'
};

const SelectableStyle: React.CSSProperties = {
    height: '100%',
    width: '100%'
};

const battlefieldTarget: DropTargetSpec<BattleFieldProps> = {
    drop(props, monitor, component: BattleField) {
        const { moveCards, zone } = props;
        const { zoneId, cards, initialX, initialY } = monitor.getItem() as CardDragObject;
        const node = findDOMNode(component) as Element;
        const bounds = node.getBoundingClientRect();

        const xCoord = monitor.getClientOffset().x - bounds.left - initialX;
        const yCoord = monitor.getClientOffset().y - bounds.top - initialY;

        moveCards(zoneId, cards, zone.id, zone.cards.length, xCoord, yCoord);
    }
};

const battleFieldSource: DragSourceSpec<BattleFieldProps, CardDragObject> = {

    beginDrag(props, monitor, component: BattleField) {

        const { selected, zone, selectCards } = props;
        console.log('Start drag ' + selected);

        const { x, y } = coordInNode(component, monitor.getInitialClientOffset());
        const { height, width } = cardSizePx();

        // locate card at coord

        const dragCard = zone.cards.find((card) => {
            const { xCoord, yCoord } = card;
            return (xCoord < x) && (xCoord + width >= x) && (yCoord < y) && (yCoord + height >= y);
        });
        const { id, name } = dragCard;

        const cards = [...selected];
        if (!cards.includes(id)) {
            cards.push(id);
        }
        selectCards(cards);
        return {
            cards,
            firstName: name,
            zoneId: zone.id,
            initialX: x,
            initialY: y
        };
    },

    endDrag(props, monitor) {
        console.log('End drag ' + props.selected);
        // todo: move drop call logic into droptarget drop method
        // also add droptarget drop on hand and battlefield, putting cards at end of list

        // trello board handles preview drag by passing isover as a prop, and adding a moved 
        // placeholder in the render method
        // do this with cards for sort
    }
};

interface BattleFieldProps {
    zone: CardCoordZone;
    moveCards: moveCardsType;
    selectCards: selectCardsType;
    selected: string[];
}

interface BattleFieldTargetCollectedProps {
    connectDropTarget: ConnectDropTarget;
    isOver: boolean;
    canDrop: boolean;
    item: CardDragObject;
}

interface BattleFieldSourceCollectedProps {
    connectDragSource: ConnectDragSource;
    connectDragPreview: ConnectDragPreview;
    isDragging: boolean;
}

interface BattleFieldState {
    selectEnabled: boolean;
}

type AllProps = BattleFieldProps & BattleFieldSourceCollectedProps & BattleFieldTargetCollectedProps;

class BattleField extends React.PureComponent<AllProps, BattleFieldState>  {

    constructor(props: AllProps) {
        super(props);

        this.state = {
            selectEnabled: true
        };
    }

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

    public selectDisabled = ((event: any) => (this.props.item ? null : this.setState({ selectEnabled: false })));

    public selectEnabled = ((event: any) => (this.props.item ? null : this.setState({ selectEnabled: true })));

    public setSelected = (items: SelectableItem[]) => this.props.selectCards(items.map((item) => item.props.id));

    public clearSelected = () => this.props.selectCards([]);

    public render() {
        const { zone, connectDropTarget, connectDragSource, selected, canDrop, item } = this.props;
        const { selectEnabled } = this.state;
        const cards = zone.cards.reduce((acc, curr, idx) => {
            if (canDrop && item.cards.includes(curr.id)) {
                return acc;
            }
            acc.push(
                <DraggableCard
                    zoneId={zone.id}
                    name={curr.name}
                    id={curr.id}
                    key={'draggable' + curr.id}
                    onMouseEnter={this.selectDisabled}
                    onMouseLeave={this.selectEnabled}
                    selected={selected.includes(curr.id)}
                    xCoord={curr.xCoord}
                    yCoord={curr.yCoord}
                />
            );
            return acc;
        },                              []);

        return (
            connectDragSource(
                connectDropTarget(
                    <div
                        style={SelectableStyle}
                        onMouseEnter={this.selectEnabled}
                    >
                        <SelectableGroup
                            ref={(ref) => ((window as any).selectableGroup = ref)}
                            className='selectable'
                            tolerance={0}
                            deselectOnEsc={true}
                            disabled={!selectEnabled}
                            resetOnStart={true}
                            onSelectionFinish={this.setSelected}
                            onSelectionClear={this.clearSelected}
                        >
                            <section style={BattleFieldStyle}>
                                {cards}
                            </section>
                        </SelectableGroup>
                    </div >
                )
            )
        );
    }
}

export default DragSource<BattleFieldProps, BattleFieldSourceCollectedProps>(
    Types.CARD, battleFieldSource, (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging()
    }))(DropTarget(Types.CARD, battlefieldTarget, (connect, monitor) => ({
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
        item: monitor.getItem()
    }))(BattleField));
