import { ActionType, createStandardAction } from 'typesafe-actions';

export const setId = createStandardAction('game/SET_ID')<string>();
export const nextTurn = createStandardAction('game/NEXT_TURN')();
export const setCurrentPlayer = createStandardAction('zones/SET_CURRENT_PLAYER')<string>();

export type GameAction = ActionType<typeof setId> | ActionType<typeof nextTurn> | ActionType<typeof setCurrentPlayer>;

