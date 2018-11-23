import {getSubsetExclude} from '../util/getSubset';

// Normalized zone store as object of {unique zone id: array of card ids}
// No allIds since full list of zones is never enumerated, only known list of zone ids are passed

export interface ZonesState {
    id?: string[];
}

interface ZonesAction {
    type: string;
    item?: object;
    ids?: string[];
  }

export default function zonesReducer(state: ZonesState = {}, action: ZonesAction) {
    switch (action.type) {
        // delete zones such as stack
        case 'DELETE_ZONES':
            return getSubsetExclude(action.ids, state);
        case 'ADD_ZONES':
        case 'UPDATE_ZONES':
            // join map of zone arrays to state
            const newItems = action.item;
            return {
                ...state,
                newItems
            };
        default:
            return state;
    }
}

export function singleZoneSelector (state: ZonesState, id: string): string[] {
    return {...state.id};
}