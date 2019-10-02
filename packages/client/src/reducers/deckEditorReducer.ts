import {
    addCardByNameAsync, DeckEditorActions, getDeckAsync, removeCards, setCardsByNameAsync,
    setEditing, setTitle, updateCards
} from '../actions/deckEditorActions';
import { getType } from 'typesafe-actions';
import produce from 'immer';

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

const def: DeckEditorState = {
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
            case getType(addCardByNameAsync.success):
                const { id: actId, quantity, sideboard } = action.payload;
                // increment quantity if found
                if (draft.cards[actId]) {
                    draft.cards[actId].quantity += quantity;
                    draft.cards[actId].sideboard += sideboard;
                } else {
                    draft.cards[actId] = action.payload;
                }
                break;
            case getType(updateCards):
                action.payload.forEach((row) => {
                    draft.cards[row.id] = row;
                });
                break;
            case getType(removeCards):
                action.payload.forEach((id) => {
                    delete draft.cards[id];
                });
                break;
            case getType(setCardsByNameAsync.success):
                draft.cards = {};
                action.payload.forEach((row) => {
                    draft.cards[row.id] = row;
                });
                break;
            case getType(setTitle):
                draft.title = action.payload;
                break;
            case getType(setEditing):
                draft.editing = action.payload;
                break;
            case getType(getDeckAsync.success):
                const { title, owner, cards, format } = action.payload;
                draft.title = title;
                draft.owner = owner;
                // prevent shadowed var
                draft.id = action.payload.id;
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
