import { Zone } from '../reducers/zonesReducer';

export type ZonesAction = ZonesUpdateAction | ZonesDeleteAction;

export interface ZonesUpdateAction {
    type: 'ADD_ZONES' | 'UPDATE_ZONES';
    payload: {
        items?: Zone[],
        ids?: string[]
    };
}

export interface ZonesDeleteAction {
    type: 'DELETE_ZONES';
    payload: {
        ids: string[]
    };
}

export interface MoveCardsAction {
    type: 'MOVE_CARDS';
    payload: {
        fromZone: string,
        toZone: string,
        cards: string[],
        toIdx: number
        xCoord: number;
        yCoord: number;
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

export function moveCards(fromZone: string, cards: string[], toZone: string,
    toIdx: number, xCoord: number, yCoord: number): MoveCardsAction {
    return {
        type: 'MOVE_CARDS',
        payload: {
            fromZone,
            toZone,
            cards,
            toIdx,
            xCoord,
            yCoord
        }
    };
}
