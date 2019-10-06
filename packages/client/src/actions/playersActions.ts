import { Player } from '../reducers/playersReducer';

import { ActionType, createAction, createStandardAction } from 'typesafe-actions';

export const addPlayers = createStandardAction('players/ADD_PLAYERS')<Player[]>();
export const updatePlayers = createStandardAction('players/UPDATE_PLAYERS')<Player[]>();
export const deletePlayers = createStandardAction('players/DELETE_PLAYERS')<string[]>();

export const setLife = createAction('players/SET_LIFE', action =>
    (player: string, life: number) =>
        action({ player, life }));

export const setPoison = createAction('players/SET_POISON', action =>
    (player: string, poison: number) =>
        action({ player, poison }));

export type PlayersAction = ActionType<typeof addPlayers> | ActionType<typeof updatePlayers> | ActionType<typeof deletePlayers> |
    ActionType<typeof setLife> | ActionType<typeof setPoison>;

