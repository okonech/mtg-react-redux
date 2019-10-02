import { cardsAsync } from '../../actions/cardsActions';
import { examplePrimitive } from '../../util/docz-helpers/card';
import cardsReducer, { Card, cardsSelector, CardsState, singleCardSelector } from '../../reducers/cardsReducer';
import deepFreeze from 'deep-freeze';

let state: CardsState = { cards: {}, cardsbyName: {} };
const cards: Card[] = [
    { ...examplePrimitive, id: '1', name: 'Black Lotus' },
    { ...examplePrimitive, id: '2', name: 'Blacker Lotus' }
];

it('initial state', () => {
    expect(cardsReducer(undefined, {} as any)).toEqual({ cards: {}, cardsbyName: {} });
});

it('adds cards', () => {
    const action = cardsAsync.success(cards);
    const oldState = { ...state };
    deepFreeze(oldState);
    deepFreeze(action);
    state = cardsReducer(oldState, action);
    expect(state).toEqual({
        cards: {
            1: cards[0],
            2: cards[1]
        },
        cardsbyName: {
            [cards[0].name]: cards[0].id,
            [cards[1].name]: cards[1].id
        }

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
