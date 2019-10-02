import { ActionType, getType } from 'typesafe-actions';
import { moveCards } from '../actions/gameCardsActions';
import { SelectCardsAction } from '../actions/selectActions';
import produce from 'immer';

// Single boolean loading value to be toggled

export interface SelectState {
    selected: string[];
}

const defaultState: SelectState = {
    selected: []
};

type Actions = SelectCardsAction | ActionType<typeof moveCards>;

export default function selectReducer(state: SelectState = defaultState, action: Actions): SelectState {
    return produce(state, (draft) => {
        switch (action.type) {
            case 'SELECT_CARDS':
                const { cards } = action.payload;
                const selected = draft.selected;
                selected.splice(0, selected.length, ...cards);
                break;
            case getType(moveCards):
                const clear = draft.selected;
                clear.splice(0, clear.length);
                break;
            default:
                break;
        }
    });
}

export const selectedSelector = (state: SelectState) => state.selected;
