import produce from 'immer';
import { MoveCardsAction, SelectCardsAction, ZonesAction } from '../actions/zonesActions';

// Normalized zone store as object of {unique zone id: array of card ids}
// No allIds since full list of zones is never enumerated, only known list of zone ids are passed

export interface ZonesState {
    [id: string]: Zone;
}

export interface Zone {
    id: string;
    cards: string[];
    selected: string[];
}

type ZoneActions = ZonesAction | MoveCardsAction | SelectCardsAction;

export default function zonesReducer(state: ZonesState = {}, action: ZoneActions) {
    return produce(state, (draft) => {
        switch (action.type) {
            case 'ADD_ZONES':
            case 'UPDATE_ZONES':
                action.payload.items.forEach((zone) => draft[zone.id] = zone);
                break;
            case 'DELETE_ZONES':
                action.payload.ids.forEach((id) => delete draft[id]);
                break;
            case 'MOVE_CARDS':
                const { fromZone, cards, toIdx, toZone } = action.payload;
                const delCards = draft[fromZone].cards;
                cards.forEach((card) => delCards.splice(delCards.indexOf(card), 1));
                draft[toZone].cards.splice(toIdx, 0, ...cards);
                break;
            case 'SELECT_CARDS':
                const { zone: selectZone, cards: selectCards } = action.payload;
                const currSelected = draft[selectZone].selected;
                currSelected.splice(0, currSelected.length, ...selectCards);
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
