import { Zone } from '../reducers/zonesReducer';

export interface ZonesAction {
    type: 'ADD_ZONES' | 'UPDATE_ZONES' | 'DELETE_ZONES';
    payload: {
        items?: Zone[];
        ids?: string[];
    }
}

export function addZones(zones: Zone[]): ZonesAction {
    return {
        type: 'ADD_ZONES',
        payload: {
            items: zones
        }
    };
}

export function updateZones(zones: Zone[]): ZonesAction {
    return {
        type: 'UPDATE_ZONES',
        payload: {
            items: zones
        }
    };
}

export function deleteZones(ids: string[]): ZonesAction {
    return {
        type: 'DELETE_ZONES',
        payload: {
            ids
        }
    };
}