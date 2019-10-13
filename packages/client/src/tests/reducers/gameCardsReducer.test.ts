import { addCards, deleteCards, moveCards, setCardsFlipped, setCardsTapped, updateCards } from '../../actions/gameCardsActions';
import { GameCardPrimitive } from '@mtg-react-redux/models';
import { setAutoFreeze } from 'immer';
import deepFreeze from 'deep-freeze';
import gameCardsReducer, { gameCardsSelector, GameCardsState, singleGameCardSelector } from '../../reducers/gameCardsReducer';

// explicitly set immer to freeze output state
setAutoFreeze(true);

let state: GameCardsState = {};
let cards: GameCardPrimitive[] = [
    {
        id: '1',
        dbId: '111',
        tapped: false,
        flipped: false,
        controller: 'player',
        owner: 'player',
        x: 0,
        y: 0
    },
    {
        id: '2',
        dbId: '222',
        tapped: false,
        flipped: false,
        controller: 'player',
        owner: 'player',
        x: 0,
        y: 0
    }
];

function cardsToState(): GameCardsState {
    return cards.reduce((acc, curr) => {
        acc[curr.id] = curr;
        return acc;
    }, {});
}

it('initial state', () => {
    expect(gameCardsReducer(undefined, {} as any)).toEqual(state);
});

it('adds cards', () => {
    const action = addCards(cards);
    deepFreeze(action);
    state = gameCardsReducer(state, action);
    expect(state).toEqual({
        [cards[0].id]: cards[0],
        [cards[1].id]: cards[1]
    });
});

it('updates cards', () => {
    cards = [
        ...cards,
        {
            id: '3',
            dbId: '333',
            tapped: true,
            flipped: false,
            controller: 'player',
            owner: 'player',
            x: 0,
            y: 0
        },
        {
            id: '4',
            dbId: '444',
            tapped: false,
            flipped: true,
            controller: 'player',
            owner: 'player',
            x: 0,
            y: 0
        }
    ];
    const action = updateCards(cards);
    deepFreeze(action);
    state = gameCardsReducer(state, action);
    expect(state).toEqual(cardsToState());
});

it('deletes cards', () => {
    const delId = cards[0].id;
    cards = cards.slice(1);
    const action = deleteCards([delId]);
    deepFreeze(action);
    state = gameCardsReducer(state, action);
    expect(state).toEqual(cardsToState());
});

it('moves cards in same zone without resetting tapped/flipped', () => {
    cards[0] = { ...cards[0], x: 100, y: 250 };
    const action = moveCards('aaa', 'aaa', [{ id: cards[0].id, x: 100, y: 250 }], 1);
    const oldState = { ...state };
    deepFreeze(action);
    state = gameCardsReducer(oldState, action);
    expect(state).toEqual(cardsToState());
});

it(`moves cards to different zones and resets tapped/flipped`, () => {
    cards[1] = { ...cards[1], x: 100, y: 250, tapped: false, flipped: false };
    const action = moveCards('aaa', 'bbb', [{ id: cards[1].id, x: 100, y: 250 }], 1);
    const oldState = { ...state };
    deepFreeze(oldState);
    deepFreeze(action);
    state = gameCardsReducer(oldState, action);
    expect(state).toEqual(cardsToState());
});

it('taps cards', () => {
    cards[0] = { ...cards[0], tapped: !cards[0].tapped };
    const action = setCardsTapped([cards[0].id], cards[0].tapped);
    const oldState = { ...state };
    deepFreeze(oldState);
    deepFreeze(action);
    state = gameCardsReducer(oldState, action);
    expect(state).toEqual(cardsToState());
});

it('flips cards', () => {
    cards[1] = { ...cards[1], flipped: !cards[1].flipped };
    const action = setCardsFlipped([cards[1].id], cards[1].flipped);
    const oldState = { ...state };
    deepFreeze(oldState);
    deepFreeze(action);
    state = gameCardsReducer(oldState, action);
    expect(state).toEqual(cardsToState());
});

it('selects card', () => {
    const oldState = { ...state };
    deepFreeze(oldState);
    const key = Object.keys(oldState)[0];
    expect(singleGameCardSelector(oldState, key)).toEqual(oldState[key]);
});

it('selects cards', () => {
    const oldState = { ...state };
    deepFreeze(oldState);
    const key = Object.keys(oldState)[0];
    const key2 = Object.keys(oldState)[1];
    expect(gameCardsSelector(oldState, ['2', '3'])).toEqual([
        oldState[key],
        oldState[key2]
    ]);
});
