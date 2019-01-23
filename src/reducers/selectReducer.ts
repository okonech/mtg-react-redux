import produce from 'immer';
import { SelectCardsAction } from '../actions/selectActions';
import { MoveCardsAction } from '../actions/zonesActions';

// Single boolean loading value to be toggled

export interface SelectState {
    canSelect: boolean;
    selected: string[];
}

const defaultState: SelectState = {
    canSelect: false,
    selected: []
};

type Actions = SelectCardsAction & MoveCardsAction;

export default function selectReducer(state: SelectState = defaultState, action: Actions): SelectState {
    return produce(state, (draft) => {
        switch (action.type) {
            case 'SELECT_CARDS':
                const { cards } = action.payload;
                const selected = draft.selected;
                selected.splice(0, selected.length, ...cards);
                break;
            case 'MOVE_CARDS':
                const clear = draft.selected;
                clear.splice(0, clear.length);
                break;
        }
    });
}

export const selectedSelector = (state: SelectState) => state.selected;
