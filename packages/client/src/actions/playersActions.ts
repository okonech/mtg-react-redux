import { Player } from '../reducers/playersReducer';

import { ActionType, createStandardAction } from 'typesafe-actions';

export const addPlayers = createStandardAction('players/ADD_PLAYERS')<Player[]>();
export const updatePlayers = createStandardAction('players/UPDATE_PLAYERS')<Player[]>();
export const deletePlayers = createStandardAction('players/DELETE_PLAYERS')<string[]>();

export type PlayersAction = ActionType<typeof addPlayers> | ActionType<typeof updatePlayers> | ActionType<typeof deletePlayers>;

