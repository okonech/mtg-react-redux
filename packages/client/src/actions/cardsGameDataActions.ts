import { ActionType, createStandardAction } from 'typesafe-actions';
import { Card } from '../reducers/cardsGameDataReducer';

export const addCards = createStandardAction('cardsGameData/ADD')<Card[]>();

export const deleteCards = createStandardAction('cardsGameData/DELETE')<string[]>();

export type CardsGameDataAction = ActionType<typeof addCards> | ActionType<typeof deleteCards>;
