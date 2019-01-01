import { Zone } from '../reducers/zonesReducer';

export interface ZonesAction {
    type: 'ADD_ZONES' | 'UPDATE_ZONES' | 'DELETE_ZONES';
    payload: {
        items?: Zone[],
        ids?: string[]
    };
}
export interface MoveCardAction {
    type: 'MOVE_CARD';
    payload: {
        fromZone: string,
        toZone: string,
        fromIdx: number,
        toIdx: number
    };
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

export function moveCard(fromZone: string, fromIdx: number, toZone: string, toIdx: number): MoveCardAction {
    return {
        type: 'MOVE_CARD',
        payload: {
            fromZone,
            toZone,
            fromIdx,
            toIdx
        }
    };
}
