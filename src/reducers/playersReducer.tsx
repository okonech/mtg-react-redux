import { combineReducers } from 'redux';

export interface PlayersState {
    playersById: PlayersById;
    playerIds: string[];
}

interface PlayersById {
    id?: Player;
}

export interface Player {
    id: string;
    name: string;
    life: number;
    poison: number;
    library: string[];
    hand: string[];
    battlefield: string[];
    graveyard: string[];
    exile: string[];
}

interface PlayersAction {
    type: string;
    id?: string;
    item: Player;
}

function playersById(state: PlayersById = {}, action: PlayersAction) {
    switch (action.type) {
        case 'RECEIVE_PLAYER':
            // add new player at the start of a game
            return {...state, [action.item.id]: action.item};
        default:
            return state;
    }
}

function playerIds(state: string[] = [], action: PlayersAction) {
    switch (action.type) {
        case 'RECEIVE_PLAYER':
            // add new player at the start of a game
            return [...state, action.id];
        default:
          return state;
      }
}

const playersReducer = combineReducers({
    playersById,
    playerIds
});

export default playersReducer;

export function singlePlayerSelector (state: PlayersState, id: string): Player {
    return {...state.playersById[id]};
}

export function allPlayersSelector (state: PlayersState): Player[] {
    return state.playerIds.map(id => state.playersById[id]);
}