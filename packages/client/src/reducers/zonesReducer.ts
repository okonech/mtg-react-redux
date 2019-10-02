import { ActionType, getType } from 'typesafe-actions';
import { addZones, deleteZones, updateZones, ZonesAction } from '../actions/zonesActions';
import { moveCards } from '../actions/gameCardsActions';
import produce from 'immer';

// Normalized zone store as object of {unique zone id: array of card ids}
// No allIds since full list of zones is never enumerated, only known list of zone ids are passed

export interface ZonesState {
    [id: string]: Zone;
}

export interface Zone {
    id: string;
    cards: string[];
}

type ZoneActions = ZonesAction | ActionType<typeof moveCards>;

export default function zonesReducer(state: ZonesState = {}, action: ZoneActions) {
    return produce(state, (draft) => {
        switch (action.type) {
            case getType(addZones):
            case getType(updateZones):
                action.payload.forEach((zone) => draft[zone.id] = zone);
                break;
            case getType(deleteZones):
                action.payload.forEach((id) => delete draft[id]);
                break;
            case getType(moveCards):
                const { fromZone, ids, toIdx, toZone } = action.payload;
                const delCards = draft[fromZone].cards;
                ids.forEach((cardId) => {
                    const idx = delCards.indexOf(cardId);
                    if (idx > -1) {
                        delCards.splice(idx, 1);
                    }
                });
                draft[toZone].cards.splice(toIdx, 0, ...ids.filter((card) => !(draft[toZone].cards.includes(card))));
                break;
            default:
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
