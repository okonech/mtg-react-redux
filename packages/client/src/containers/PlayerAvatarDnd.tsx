import { BaseComponentProps } from '../util/styling';
import { CardDragObject } from './DraggableCard';
import { connect } from 'react-redux';
import { ConnectDragPreview, ConnectDragSource, ConnectDropTarget, DragSource, DragSourceSpec, DropTarget, DropTargetSpec } from 'react-dnd';
import { GameCardData, PlayerData } from '../selectors/player';
import { gameCardModelsMap } from '@mtg-react-redux/models';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { makeStyles } from '@material-ui/core/styles';
import { moveCardsFixCoords } from '../actions/gameCardsActions';
import { selectCards } from '../actions/selectActions';
import { Types } from '../Constants';
import PlayerAvatar from '../components/PlayerAvatar';
import React, { useEffect } from 'react';

export interface PlayerAvatarDndProps extends BaseComponentProps {
    player: PlayerData;
    commander: GameCardData;
}

interface MappedPlayerAvatarProps {
    moveCardsFixCoords: typeof moveCardsFixCoords;
    selectCards: typeof selectCards;
}

interface DropTargetCollectedProps {
    connectDropTarget?: ConnectDropTarget;
    canDrop?: boolean;
}

interface DragSourceCollectedProps {
    connectDragSource?: ConnectDragSource;
    connectDragPreview?: ConnectDragPreview;
}

const zoneSource: DragSourceSpec<AllProps, CardDragObject> = {

    beginDrag(props): CardDragObject {

        const { selectCards: selectCardsAction, player, commander } = props;
        selectCardsAction([commander.gameCard.id]);

        return {
            cards: [commander.gameCard.id],
            zoneId: player.command.id
        };
    },
    canDrag(props) {
        // can only drag commander from dnd avatar
        const { player, commander } = props;
        return player.command.cards.map(card => card.gameCard.id).includes(commander.gameCard.id);
    }

};

const zoneTarget: DropTargetSpec<AllProps> = {
    canDrop(props, monitor) {
        // can only drop commanders here
        const { cards } = monitor.getItem() as CardDragObject;
        const commander = props.commander;
        return cards.every(cardId => cardId === commander.gameCard.id);
    },
    drop(props, monitor) {
        const { moveCardsFixCoords: moveCardsAction, player } = props;
        const { zoneId, cards } = monitor.getItem() as CardDragObject;
        cards.forEach((id) => {
            const element = document.getElementById(id);
            if (element) {
                element.style.display = 'block';
            }
        });
        moveCardsAction(zoneId, player.command.id, cards, player.command.cards.length, 0, 0);
    }
};

const useStyles = makeStyles({
    main: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',
        boxSizing: 'border-box',
        padding: '4px'
    }
});

type AllProps = PlayerAvatarDndProps & MappedPlayerAvatarProps & DropTargetCollectedProps & DragSourceCollectedProps;


// TODO: use clip-path for the diagonal effect + layering 2 avatars
// https://codepen.io/anon/pen/dMNzYG
const PlayerAvatarDnd: React.FC<AllProps> = (props) => {
    const { connectDragSource, connectDropTarget, connectDragPreview, style, player, commander } = props;
    const cardModel = gameCardModelsMap.getModel(commander);
    const classes = useStyles(props);
    useEffect(() => {
        if (connectDragPreview) {
            // Use empty image as a drag preview so browsers don't draw it
            // and we can draw whatever we want on the custom drag layer instead.
            connectDragPreview(getEmptyImage(), {
                // IE fallback: specify that we'd rather screenshot the node
                // when it already knows it's being dragged so we can hide it with CSS.
                captureDraggingState: true
            });
        }
    }, [connectDragPreview]);
    const containsCommander = player.command.cards.map(card => card.gameCard.id).includes(cardModel.id);
    const icon = cardModel.cardData.imageUrl('artCrop');
    return (
        connectDragSource(
            connectDropTarget(
                <article
                    style={style}
                    className={classes.main}
                >
                    <PlayerAvatar
                        player={player}
                        icon={icon}
                        grayscale={!containsCommander}
                    />
                </article>
            )
        )
    );
};

const mapDispatchToProps = {
    selectCards,
    moveCardsFixCoords
};

export default connect(null, mapDispatchToProps)(DragSource(
    Types.CARD, zoneSource, (connector, monitor) => ({
        connectDragSource: connector.dragSource(),
        connectDragPreview: connector.dragPreview(),
        isDragging: monitor.isDragging()
    }))(DropTarget(Types.CARD, zoneTarget, (connector, monitor) => ({
        connectDropTarget: connector.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
        dragItem: monitor.getItem()
    }))(PlayerAvatarDnd)));

