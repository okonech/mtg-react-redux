import produce from 'immer';
import { SelectCardsAction } from '../actions/selectActions';

// Single boolean loading value to be toggled

export interface SelectState {
    canSelect: boolean;
    selected: string[];
}

const defaultState: SelectState = {
    canSelect: false,
    selected: []
};

export default function selectReducer(state: SelectState = defaultState, action: SelectCardsAction): SelectState {
    return produce(state, (draft) => {
        switch (action.type) {
            case 'SELECT_CARDS':
                const { cards } = action.payload;
                const selected = draft.selected;
                selected.splice(0, selected.length, ...cards);
                break;
        }
    });
}

export const selectedSelector = (state: SelectState) => state.selected;
