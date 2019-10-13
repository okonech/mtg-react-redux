import { cardsAsync } from '../../actions/cardsActions';
import { examplePrimitive } from '../../util/docz-helpers/card';
import { setAutoFreeze } from 'immer';
import cardsReducer, { Card, cardsSelector, CardsState, INITIAL_STATE, singleCardSelector } from '../../reducers/cardsReducer';
import deepFreeze from 'deep-freeze';

// explicitly set immer to freeze output state
setAutoFreeze(true);

let state: CardsState = INITIAL_STATE;
const cards: Card[] = [
    { ...examplePrimitive, id: '1', name: 'Black Lotus' },
    { ...examplePrimitive, id: '2', name: 'Blacker Lotus' }
];

function cardsToState(): CardsState {
    return cards.reduce((acc, curr) => {
        acc.cards[curr.id] = curr;
        acc.cardsByName[curr.name] = curr.id;
        return acc;
    }, { cards: {}, cardsByName: {} } as CardsState);
}

it('initial state', () => {
    expect(cardsReducer(undefined, {} as any)).toEqual(INITIAL_STATE);
});

it('adds cards', () => {
    const action = cardsAsync.success(cards);
    const oldState = { ...state };
    deepFreeze(oldState);
    deepFreeze(action);
    state = cardsReducer(oldState, action);
    expect(state).toEqual(cardsToState());
});

it('select card', () => {
    expect(singleCardSelector(state, '1')).toEqual(cards[0]);
});

it('select cards', () => {
    expect(cardsSelector(state, ['1', '2'])).toEqual([
        cards[0],
        cards[1]
    ]);
});
