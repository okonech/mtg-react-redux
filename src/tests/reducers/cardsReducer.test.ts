import cardsReducer, { singleCardSelector, cardsSelector, CardsState, Card } from '../../reducers/cardsReducer';
import { addCards, updateCards, deleteCards } from '../../actions/cardsActions';
import deepFreeze from 'deep-freeze';

let state: CardsState = {};
let cards: Card[] = [
    {
        id: '1',
        name: 'Black Lotus'
    },
    {
        id: '2',
        name: 'Timetwister'
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
        '1': cards[0],
        '2': cards[1]
    })
});

it('updates cards', () => {
    cards = [{
        id: '1',
        name: 'Blacker Lotus'
    },
    cards[1]
    ];
    const action = updateCards(cards);
    const oldState = { ...state };
    deepFreeze(oldState);
    deepFreeze(action);
    state = cardsReducer(oldState, action);
    expect(state).toEqual({
        '1': cards[0],
        '2': cards[1]
    })
});

it('select card', () => {
    const oldState = { ...state };
    deepFreeze(oldState);
    expect(singleCardSelector(oldState, '1')).toEqual(cards[0])
})

it('select cards', () => {
    const oldState = { ...state };
    deepFreeze(oldState);
    expect(cardsSelector(oldState, ['1', '2'])).toEqual([
        cards[0],
        cards[1]
    ])
})

it('deletes cards', () => {
    const action = deleteCards(['1', '2']);
    const oldState = { ...state };
    deepFreeze(oldState);
    deepFreeze(action);
    state = cardsReducer(oldState, action);
    expect(state).toEqual({})
});