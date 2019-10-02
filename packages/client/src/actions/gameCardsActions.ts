import { ActionType, createStandardAction } from 'typesafe-actions';
import { GameCardPrimitive } from '@mtg-react-redux/models';

export const addCards = createStandardAction('gameCards/ADD')<GameCardPrimitive[]>();
export const updateCards = createStandardAction('gameCards/UPDATE')<GameCardPrimitive[]>();
export const deleteCards = createStandardAction('gameCards/DELETE')<GameCardPrimitive[]>();

export type GameCardsAction = ActionType<typeof addCards> | ActionType<typeof updateCards> | ActionType<typeof deleteCards>;
