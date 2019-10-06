import { addPlayers, deletePlayers, PlayersAction, setLife, setPoison, updatePlayers } from '../actions/playersActions';
import { combineReducers } from 'redux';
import { getType } from 'typesafe-actions';
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
    command: string;
    commanders: string[];
}

function playersById(state: PlayersById = {}, action: PlayersAction) {
    return produce(state, (draft) => {
        switch (action.type) {
            case getType(addPlayers):
            case getType(updatePlayers):
                action.payload.forEach((player) => draft[player.id] = player);
                break;
            case getType(deletePlayers):
                action.payload.forEach((id) => delete draft[id]);
                break;
            case getType(setLife):
                draft[action.payload.player].life = action.payload.life;
                break;
            case getType(setPoison):
                draft[action.payload.player].poison = action.payload.poison;
                break;
            default:
                break;
        }
    });
}

function playerIds(state: string[] = [], action: PlayersAction) {
    return produce(state, (draft) => {
        switch (action.type) {
            case getType(addPlayers):
                action.payload.forEach((player) => draft.push(player.id));
                break;
            case getType(deletePlayers):
                const toDelete = action.payload;
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
