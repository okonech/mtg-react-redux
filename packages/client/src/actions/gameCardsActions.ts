import { ActionType, createAction, createStandardAction } from 'typesafe-actions';
import { GameCardPrimitive } from '@mtg-react-redux/models';

export const addCards = createStandardAction('gameCards/ADD')<GameCardPrimitive[]>();
export const updateCards = createStandardAction('gameCards/UPDATE')<GameCardPrimitive[]>();
export const deleteCards = createStandardAction('gameCards/DELETE')<string[]>();

export const setCardsTapped = createAction('gameCards/TAPPED', action =>
    (cards: string[], tapped: boolean) =>
        action({ cards, tapped }));

export const setCardsFlipped = createAction('gameCards/FLIPPED', action =>
    (cards: string[], flipped: boolean) =>
        action({ cards, flipped }));

/**
 * Called to pass args to middleware which later emits regular move_cards action
 */
export const moveCardsFixCoords = createAction('gameCards/MOVE_CARDS_FIX_COORDS', action =>
    (fromZone: string, toZone: string, ids: string[], toIdx: number, xCoord: number, yCoord: number) =>
        action({ fromZone, toZone, ids, toIdx, xCoord, yCoord }));

interface CardCoords {
    id: string;
    x: number;
    y: number;
}

export const moveCards = createAction('gameCards/MOVE_CARDS', action =>
    (fromZone: string, toZone: string, ids: CardCoords[], toIdx: number) =>
        action({ fromZone, toZone, ids, toIdx }));

export type GameCardsAction = ActionType<typeof addCards> | ActionType<typeof updateCards> | ActionType<typeof deleteCards> | ActionType<typeof setCardsTapped>
    | ActionType<typeof setCardsFlipped> | ActionType<typeof moveCards> | ActionType<typeof moveCardsFixCoords>;
