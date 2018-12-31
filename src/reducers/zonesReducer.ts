import produce from 'immer';
import { ZonesAction } from '../actions/zonesActions';

// Normalized zone store as object of {unique zone id: array of card ids}
// No allIds since full list of zones is never enumerated, only known list of zone ids are passed

export interface ZonesState {
    [id: string]: Zone;
}

export interface Zone {
    id: string;
    cards: string[];
}

export default function zonesReducer(state: ZonesState = {}, action: ZonesAction) {
    return produce(state, draft => {
        switch (action.type) {
            case 'ADD_ZONES':
            case 'UPDATE_ZONES':
                action.payload.items.forEach(zone => draft[zone.id] = zone);
                break;
            case 'DELETE_ZONES':
                action.payload.ids.forEach(id => delete draft[id]);
                break;
        }
    });
}

export function singleZoneSelector(state: ZonesState, id: string): Zone {
    return state[id];
}

export function zonesSelector(state: ZonesState, ids: string[]): Zone[] {
    return ids.map((id) => singleZoneSelector(state, id));
}