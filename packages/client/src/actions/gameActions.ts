
export type GameAction = GameNextTurnAction | GameSetIdAction | GameSetCurrentPlayerAction;

export interface GameNextTurnAction {
    type: 'GAME_NEXT_TURN';
}

export interface GameSetIdAction {
    type: 'GAME_SET_ID';
    payload: {
        id: string;
    };
}

export interface GameSetCurrentPlayerAction {
    type: 'GAME_SET_CURRENT_PLAYER';
    payload: {
        id: string;
    };
}

export function nextTurn(): GameAction {
    return {
        type: 'GAME_NEXT_TURN'
    };
}

export function setId(id: string): GameAction {
    return {
        type: 'GAME_SET_ID',
        payload: {
            id
        }
    };
}

export function setCurrentPlayer(player: string): GameAction {
    return {
        type: 'GAME_SET_CURRENT_PLAYER',
        payload: {
            id: player
        }
    };
}
