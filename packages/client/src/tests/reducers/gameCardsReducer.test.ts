import { addCards, deleteCards, moveCards, setCardsFlipped, setCardsTapped, updateCards } from '../../actions/gameCardsActions';
import { GameCardPrimitive } from '@mtg-react-redux/models';
import deepFreeze from 'deep-freeze';
import gameCardsReducer, { gameCardsSelector, GameCardsState, singleGameCardSelector } from '../../reducers/gameCardsReducer';

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

it('initial state', () => {
    expect(gameCardsReducer(undefined, {} as any)).toEqual(state);
});

it('adds cards', () => {
    const action = addCards(cards);
    const oldState = { ...state };
    deepFreeze(oldState);
    deepFreeze(action);
    state = gameCardsReducer(oldState, action);
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
    const oldState = { ...state };
    deepFreeze(oldState);
    deepFreeze(action);
    state = gameCardsReducer(oldState, action);
    expect(state).toEqual(cards.reduce((acc, curr) => {
        acc[curr.id] = curr;
        return acc;
    }, {}));
});

it('deletes cards', () => {
    const action = deleteCards([cards[0].id]);
    cards = cards.slice(1);
    const oldState = { ...state };
    deepFreeze(oldState);
    deepFreeze(action);
    state = gameCardsReducer(oldState, action);
    expect(state).toEqual(cards.reduce((acc, curr) => {
        acc[curr.id] = curr;
        return acc;
    }, {})
    );
});

it('moves cards', () => {
    cards[0] = { ...cards[0], x: 100, y: 250 };
    const action = moveCards('aaa', [cards[0].id], 'bbb', 1, 100, 250);
    const oldState = { ...state };
    deepFreeze(oldState);
    deepFreeze(action);
    state = gameCardsReducer(oldState, action);
    expect(state).toEqual(cards.reduce((acc, curr) => {
        acc[curr.id] = curr;
        return acc;
    }, {})
    );
});

it('taps cards', () => {
    cards[0] = { ...cards[0], tapped: !cards[0].tapped };
    const action = setCardsTapped([cards[0].id], cards[0].tapped);
    const oldState = { ...state };
    deepFreeze(oldState);
    deepFreeze(action);
    state = gameCardsReducer(oldState, action);
    expect(state).toEqual(cards.reduce((acc, curr) => {
        acc[curr.id] = curr;
        return acc;
    }, {})
    );
});

it('flips cards', () => {
    cards[1] = { ...cards[1], flipped: !cards[1].flipped };
    const action = setCardsFlipped([cards[1].id], cards[1].flipped);
    const oldState = { ...state };
    deepFreeze(oldState);
    deepFreeze(action);
    state = gameCardsReducer(oldState, action);
    expect(state).toEqual(cards.reduce((acc, curr) => {
        acc[curr.id] = curr;
        return acc;
    }, {})
    );
});

it('selects card', () => {
    const oldState = { ...state };
    deepFreeze(oldState);
    expect(singleGameCardSelector(oldState, '2')).toEqual(cards[0]);
});

it('selects cards', () => {
    const oldState = { ...state };
    deepFreeze(oldState);
    expect(gameCardsSelector(oldState, ['2', '3'])).toEqual([
        cards[0],
        cards[1]
    ]);
});
