import { Zone } from '../reducers/zonesReducer';

export interface ZonesAction {
    type: 'ADD_ZONES' | 'UPDATE_ZONES' | 'DELETE_ZONES';
    payload: {
        items?: Zone[],
        ids?: string[]
    };
}
export interface MoveCardsAction {
    type: 'MOVE_CARDS';
    payload: {
        fromZone: string,
        toZone: string,
        cards: string[],
        toIdx: number
    };
}

export interface SelectCardsAction {
    type: 'SELECT_CARDS' | 'CLEAR_SELECTED_CARDS';
    payload: {
        zone: string,
        cards?: string[]
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

export function moveCards(fromZone: string, cards: string[], toZone: string, toIdx: number): MoveCardsAction {
    return {
        type: 'MOVE_CARDS',
        payload: {
            fromZone,
            toZone,
            cards,
            toIdx
        }
    };
}

export function selectCards(zone: string, cards: string[]): SelectCardsAction {
    return {
        type: 'SELECT_CARDS',
        payload: {
            zone,
            cards
        }
    };
}

export function clearSelectedCards(zone: string): SelectCardsAction {
    return {
        type: 'CLEAR_SELECTED_CARDS',
        payload: {
            zone
        }
    };
}
