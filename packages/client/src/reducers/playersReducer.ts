import { combineReducers } from 'redux';
import { PlayersAction } from '../actions/playersActions';
import produce from 'immer';

export interface PlayersState {
    playersById: PlayersById;
    playerIds: string[];
}

interface PlayersById {
    [id: string]: Player;
}

export interface Player {
    id: string;
    dbId: string;
    name: string;
    life: number;
    poison: number;
    library: string;
    hand: string;
    battlefield: string;
    graveyard: string;
    exile: string;
}

function playersById(state: PlayersById = {}, action: PlayersAction) {
    return produce(state, (draft) => {
        switch (action.type) {
            case 'ADD_PLAYERS':
            case 'UPDATE_PLAYERS':
                action.payload.items.forEach((player) => draft[player.id] = player);
                break;
            case 'DELETE_PLAYERS':
                action.payload.ids.forEach((id) => delete draft[id]);
                break;
            default:
                break;
        }
    });
}

function playerIds(state: string[] = [], action: PlayersAction) {
    return produce(state, (draft) => {
        switch (action.type) {
            case 'ADD_PLAYERS':
                action.payload.items.forEach((player) => draft.push(player.id));
                break;
            case 'DELETE_PLAYERS':
                const toDelete = action.payload.ids;
                toDelete.forEach((delId) => draft.splice(draft.findIndex((id) => id === delId), 1));
                break;
            default:
                break;
        }
    });
}

const playersReducer = combineReducers({
    playersById,
    playerIds
});

export default playersReducer;

export function singlePlayerSelector(state: PlayersState, id: string): Player {
    return state.playersById[id];
}

export function allPlayersSelector(state: PlayersState): Player[] {
    return state.playerIds.map((id) => singlePlayerSelector(state, id));
}
