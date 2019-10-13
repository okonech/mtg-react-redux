
import { AppState } from '../reducers';
import { CardDragObject } from './DraggableCard';
import { connect } from 'react-redux';
import { DragLayer, XYCoord } from 'react-dnd';
import { Identifier } from 'dnd-core';
import { mapIdsToGameCardData } from '../selectors/player';
import { WithSelectableDragLayer } from '@mtg-react-redux/react-dnd-selectable';
import CardCustomDragLayer, { CardCustomDragLayerProps } from '../components/CardCustomDragLayer';

export interface DragLayerProps {
    item?: CardDragObject;
    itemType?: Identifier;
    currentOffset?: XYCoord;
    isDragging?: boolean;
    initialClientOffset?: XYCoord;
    currentClientOffset?: XYCoord;
}

const mapStateToProps = (state: AppState) => ({
    selectedCards: mapIdsToGameCardData(state.select.selected, state.cards, state.gameCards)
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
