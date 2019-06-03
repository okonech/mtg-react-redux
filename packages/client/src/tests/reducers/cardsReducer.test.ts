import deepFreeze from 'deep-freeze';
import { addCards, deleteCards, updateCards } from '../../actions/cardsActions';
import cardsReducer, { Card, cardsSelector, CardsState, singleCardSelector } from '../../reducers/cardsReducer';

let state: CardsState = {};
let cards: Card[] = [
    {
        id: '1',
        name: 'Black Lotus',
        url: 'path.png'
    },
    {
        id: '2',
        name: 'Timetwister',
        url: 'path.png'
    }
];

it('initial state', () => {
    expect(cardsReducer(undefined, {} as any)).toEqual({});
});

it('adds cards', () => {
    const action = addCards(cards);
    const oldState = { ...state };
    deepFreeze(oldState);
    deepFreeze(action);
    state = cardsReducer(oldState, action);
    expect(state).toEqual({
        1: cards[0],
        2: cards[1]
    });
});

it('updates cards', () => {
    cards = [{
        id: '1',
        name: 'Blacker Lotus',
        url: 'path.png'
    },
             cards[1]
    ];
    const action = updateCards(cards);
    const oldState = { ...state };
    deepFreeze(oldState);
    deepFreeze(action);
    state = cardsReducer(oldState, action);
    expect(state).toEqual({
        1: cards[0],
        2: cards[1]
    });
});

it('select card', () => {
    const oldState = { ...state };
    deepFreeze(oldState);
    expect(singleCardSelector(oldState, '1')).toEqual(cards[0]);
});

it('select cards', () => {
    const oldState = { ...state };
    deepFreeze(oldState);
    expect(cardsSelector(oldState, ['1', '2'])).toEqual([
        cards[0],
        cards[1]
    ]);
});

it('deletes cards', () => {
    const action = deleteCards(['1', '2']);
    const oldState = { ...state };
    deepFreeze(oldState);
    deepFreeze(action);
    state = cardsReducer(oldState, action);
    expect(state).toEqual({});
});
