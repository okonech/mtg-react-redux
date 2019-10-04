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

export const moveCards = createAction('gameCards/MOVE_CARDS', action =>
    (fromZone: string, ids: string[], toZone: string, toIdx: number, xCoord: number, yCoord: number) =>
        action({ fromZone, toZone, ids, toIdx, xCoord, yCoord }));

export type GameCardsAction = ActionType<typeof addCards> | ActionType<typeof updateCards> |
    ActionType<typeof deleteCards> | ActionType<typeof setCardsTapped> | ActionType<typeof setCardsFlipped> | ActionType<typeof moveCards>;
