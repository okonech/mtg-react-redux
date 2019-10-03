import { addCardByNameAsync, getDeckAsync, removeCards, setCardsByNameAsync, setEditing, setTitle, updateCards } from '../../actions/deckEditorActions';
import deckEditorReducer, { allRowsSelector, DeckEditorRow, DeckEditorState, rowsSelector, singleRowSelector } from '../../reducers/deckEditorReducer';
import deepFreeze from 'deep-freeze';

let state: DeckEditorState = {
    cards: {},
    title: 'New Deck',
    id: 'test-id',
    format: 'Commander',
    owner: null,
    editing: false
};

let cards: DeckEditorRow[] = [
    {
        id: '1',
        quantity: 2,
        sideboard: 2,
        owned: 4
    },
    {
        id: '2',
        quantity: 1,
        sideboard: 0,
        owned: 1
    }
];

it('initial state', () => {
    expect(deckEditorReducer(undefined, {} as any)).toEqual(state);
});

it('adds card by name', () => {
    const action = addCardByNameAsync.success(cards[0]);
    const oldState = { ...state };
    deepFreeze(oldState);
    deepFreeze(action);
    state = deckEditorReducer(oldState, action);
    expect(state).toEqual({
        ...oldState,
        cards: {
            1: cards[0]
        }
    });
});

it('updates cards by name', () => {
    cards[0] = {
        id: '1',
        quantity: 3,
        sideboard: 3,
        owned: 6
    };
    const action = updateCards(cards);
    const oldState = { ...state };
    deepFreeze(oldState);
    deepFreeze(action);
    state = deckEditorReducer(oldState, action);
    expect(state).toEqual({
        ...oldState,
        cards: {
            1: cards[0],
            2: cards[1]
        }
    });
});

it('removes cards', () => {
    const action = removeCards(['1']);
    const oldState = { ...state };
    deepFreeze(oldState);
    deepFreeze(action);
    state = deckEditorReducer(oldState, action);
    expect(state).toEqual({
        ...oldState,
        cards: {
            2: cards[1]
        }
    });
});

it('sets cards by name', () => {
    cards = [
        {
            id: '3',
            quantity: 1,
            sideboard: 1,
            owned: 2
        },
        {
            id: '4',
            quantity: 1,
            sideboard: 0,
            owned: 1
        }
    ];
    const action = setCardsByNameAsync.success(cards);
    const oldState = { ...state };
    deepFreeze(oldState);
    deepFreeze(action);
    state = deckEditorReducer(oldState, action);
    expect(state).toEqual({
        ...oldState,
        cards: {
            3: cards[0],
            4: cards[1]
        }
    });
});

it('sets title', () => {
    const title = 'new title';
    const action = setTitle(title);
    const oldState = { ...state };
    deepFreeze(oldState);
    deepFreeze(action);
    state = deckEditorReducer(oldState, action);
    expect(state).toEqual({
        ...oldState,
        title
    });
});

it('sets editing', () => {
    const editing = true;
    const action = setEditing(editing);
    const oldState = { ...state };
    deepFreeze(oldState);
    deepFreeze(action);
    state = deckEditorReducer(oldState, action);
    expect(state).toEqual({
        ...oldState,
        editing
    });
});

it('gets deck', () => {
    const deck: DeckEditorState = {
        cards: cards.reduce((acc, curr) => {
            acc[curr.id] = curr;
            return acc;
        }, {}),
        id: 'new id',
        owner: 'new owner',
        title: 'newer title',
        format: 'Modern',
        editing: false
    };
    const action = getDeckAsync.success(deck);
    const oldState = { ...state };
    deepFreeze(oldState);
    deepFreeze(action);
    state = deckEditorReducer(oldState, action);
    expect(state).toEqual({
        ...deck,
        editing: oldState.editing
    });
});

it('select row', () => {
    const oldState = { ...state };
    deepFreeze(oldState);
    expect(singleRowSelector(oldState, '3')).toEqual(cards[0]);
});

it('select rows', () => {
    const oldState = { ...state };
    deepFreeze(oldState);
    expect(rowsSelector(oldState, ['3', '4'])).toEqual([
        cards[0],
        cards[1]
    ]);
});

it('select all rows', () => {
    const oldState = { ...state };
    deepFreeze(oldState);
    expect(allRowsSelector(oldState)).toEqual([
        cards[0],
        cards[1]
    ]);
});
