import produce from 'immer';
import { DeckEditorActions } from '../actions/deckEditorActions';

// Normalized cards store as object of 
// cards: {unique card id: Card}
// cardsByName: {card name: card Id}
// No ids array since full list of cards is never enumerated, only known list of card ids are passed

type Format = 'Standard' | 'Commander' | 'Modern' | 'Legacy' | 'Vintage';
export interface DeckEditorRow {
    id: string;
    quantity: number;
    sideboard: number;
    owned: number;
}

export interface DeckEditorState {
    cards: Record<string, DeckEditorRow>;
    title: string;
    id: string;
    owner: string;
    format: Format;
    editing: boolean;
}

const def = {
    cards: {},
    title: 'New Deck',
    id: 'test-id',
    format: 'Commander' as Format,
    owner: null,
    editing: false
};

export default function deckEditorReducer(state: DeckEditorState = def, action: DeckEditorActions): DeckEditorState {
    return produce(state, (draft) => {
        switch (action.type) {
            case 'DECK_EDITOR_ADD_CARDS':
                action.payload.rows.forEach((row) => {
                    // increment quantity if found
                    if (draft.cards[row.id]) {
                        draft.cards[row.id].quantity += row.quantity;
                        draft.cards[row.id].sideboard += row.sideboard;
                    } else {
                        draft.cards[row.id] = { ...row, owned: 1 };
                    }
                });
                break;
            case 'DECK_EDITOR_UPDATE_CARDS':
                action.payload.rows.forEach((row) => {
                    draft.cards[row.id] = row;
                });
                break;
            case 'DECK_EDITOR_DELETE_CARDS':
                action.payload.ids.forEach((id) => {
                    delete draft.cards[id];
                });
                break;
            case 'DECK_EDITOR_SET_CARDS':
                Object.keys(draft.cards).forEach((id) => {
                    delete draft.cards[id];
                });
                action.payload.rows.forEach((row) => {
                    draft.cards[row.id] = row;
                });
                break;
            case 'DECK_EDITOR_SET_TITLE':
                draft.title = action.payload.title;
                break;
            case 'DECK_EDITOR_SET_EDITING':
                draft.editing = action.payload.editing;
                break;
            case 'DECK_EDITOR_SET_DECK_DATA':
                const { title, owner, cards, format } = action.payload.state;
                draft.title = title;
                draft.owner = owner;
                // prevent shadowed var
                draft.id = action.payload.state.id;
                draft.format = format;
                draft.cards = cards;
                break;
            default:
                break;
        }
    });
}

export function singleRowSelector(state: DeckEditorState, id: string): DeckEditorRow {
    return state.cards[id];
}

export function rowsSelector(state: DeckEditorState, ids: string[]): DeckEditorRow[] {
    return ids.map((id) => singleRowSelector(state, id));
}

export function allRowsSelector(state: DeckEditorState): DeckEditorRow[] {
    return Object.values(state.cards);
}
