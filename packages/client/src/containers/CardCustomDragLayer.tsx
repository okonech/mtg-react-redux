
import { Identifier } from 'dnd-core';
import { DragLayer, XYCoord } from 'react-dnd';
import { connect } from 'react-redux';
import CardCustomDragLayer, { CardCustomDragLayerProps } from '../components/CardCustomDragLayer';
import { WithSelectableDragLayer } from '../packages/react-dnd-selectable';
import { AppState } from '../reducers';
import { cardsSelector } from '../reducers/cardsReducer';
import { CardDragObject } from './DraggableCard';

export interface DragLayerProps {
    item?: CardDragObject;
    itemType?: Identifier;
    currentOffset?: XYCoord;
    isDragging?: boolean;
    initialClientOffset?: XYCoord;
    currentClientOffset?: XYCoord;
}

const mapStateToProps = (state: AppState) => ({
    selectedCards: cardsSelector(state.cards, state.select.selected)
});

export default connect(mapStateToProps)(
    DragLayer<CardCustomDragLayerProps, DragLayerProps>((monitor) => ({
        item: monitor.getItem(),
        itemType: monitor.getItemType(),
        currentOffset: monitor.getSourceClientOffset(),
        initialOffset: monitor.getInitialSourceClientOffset(),
        isDragging: monitor.isDragging(),
        initialClientOffset: monitor.getInitialClientOffset(),
        currentClientOffset: monitor.getClientOffset()
    }))(WithSelectableDragLayer(CardCustomDragLayer)));
