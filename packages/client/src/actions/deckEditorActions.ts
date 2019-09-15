import { ActionType, createAsyncAction, createStandardAction } from 'typesafe-actions';
import { DeckEditorRow, DeckEditorState } from '../reducers/deckEditorReducer';

export const updateCards = createStandardAction('deckEditor/UPDATE_CARDS')<DeckEditorRow[]>();

export const removeCards = createStandardAction('deckEditor/REMOVE_CARDS')<string[]>();

export const setTitle = createStandardAction('deckEditor/SET_TITLE')<string>();

export const setEditing = createStandardAction('deckEditor/SET_EDITING')<boolean>();

export interface CardByName {
    name: string;
    quantity: number;
    sideboard: number;
}

export const cancel = createStandardAction('deckEditor/CANCEL')<null>();

export const addCardByNameAsync = createAsyncAction(
    'deckEditor/ADD_CARD_BY_NAME',
    'deckEditor/STORE_CARDS_BY_NAME',
    'deckEditor/ADD_CARD_BY_NAME_ERR'
)<CardByName, DeckEditorRow, Error>();

export const setCardsByNameAsync = createAsyncAction(
    'deckEditor/SET_CARDS_BY_NAME',
    'deckEditor/REPLACE_CARDS_BY_NAME',
    'deckEditor/SET_CARDS_BY_NAME_ERR'
)<CardByName[], DeckEditorRow[], Error>();

export const getDeckAsync = createAsyncAction(
    'deckEditor/GET',
    'deckEditor/SET_STATE',
    'deckEditor/GET_ERR',
    'deckEditor/GET_CANCEL'
)<string, DeckEditorState, Error, string>();

type PUTDECK = Omit<DeckEditorState, 'editing'>;

export const putDeckAsync = createAsyncAction(
    'deckEditor/PUT',
    'deckEditor/PUT_SUCCESS',
    'deckEditor/PUT_ERR'
)<PUTDECK, null, Error>();

export const deleteDeckAsync = createAsyncAction(
    'deckEditor/DELETE',
    'deckEditor/DELETE_SUCCESS',
    'deckEditor/DELETE_ERR'
)<string, null, Error>();

export const postDeckAsync = createAsyncAction(
    'deckEditor/POST',
    'deckEditor/POST_SUCCESS',
    'deckEditor/POST_ERR'
)<PUTDECK, null, Error>();

type DeckEditorEpicActions = ActionType<typeof addCardByNameAsync> | ActionType<typeof setCardsByNameAsync> | ActionType<typeof getDeckAsync>
    | ActionType<typeof deleteDeckAsync> | ActionType<typeof putDeckAsync> | ActionType<typeof postDeckAsync>;

export type DeckEditorActions = ActionType<typeof removeCards> | ActionType<typeof setTitle> | ActionType<typeof setEditing>
    | ActionType<typeof updateCards> | DeckEditorEpicActions;
