import produce from 'immer';
import { MoveCardsAction } from '../actions/zonesActions';

// Normalized cards store as object of {unique card id: Card}
// No ids array since full list of cards is never enumerated, only known list of card ids are passed

export interface CardsSettingsState {
    [id: string]: CardsSettings;
}

export interface CardsSettings {
    id: string;
    xCoord: number;
    yCoord: number;
}

export default function cardsReducer(state: CardsSettingsState = {}, action: MoveCardsAction): CardsSettingsState {
    return produce(state, (draft) => {
        switch (action.type) {
            case 'MOVE_CARDS':
                const { cards, xCoord, yCoord } = action.payload;
                cards.forEach((card) => (
                    draft[card] = {
                        ...draft[card],
                        id: card,
                        xCoord,
                        yCoord
                    }
                ));
                break;
        }
    });
}

export function singleCardsSettingsSelector(state: CardsSettingsState, id: string): CardsSettings {
    return state[id];
}

export function cardsSettingsSelector(state: CardsSettingsState, ids: string[]): CardsSettings[] {
    return ids.map((id) => singleCardsSettingsSelector(state, id));
}
