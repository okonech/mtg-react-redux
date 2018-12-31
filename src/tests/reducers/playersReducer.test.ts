import playersReducer, { singlePlayerSelector, allPlayersSelector, PlayersState, Player } from '../../reducers/playersReducer';
import { addPlayers, updatePlayers, deletePlayers } from '../../actions/playersActions';
import deepFreeze from 'deep-freeze';

let state: PlayersState = {
    playerIds: [],
    playersById: {}
};
let players: Player[] = [
    {
        id: '1',
        name: 'Player 1',
        life: 40,
        poison: 0,
        library: 'lib-id',
        hand: 'hand-id',
        battlefield: 'battlefield-id',
        graveyard: 'graveyard-id',
        exile: 'exile-id'
    },
    {
        id: '2',
        name: 'Player 2',
        life: 40,
        poison: 0,
        library: 'lib-id2',
        hand: 'hand-id2',
        battlefield: 'battlefield-id2',
        graveyard: 'graveyard-id2',
        exile: 'exile-id2'
    }
];

it('initial state', () => {
    expect(playersReducer(undefined, { type: 'TEST' })).toEqual(state);
});

it('adds players', () => {
    const add = addPlayers(players);
    const oldState = { ...state };
    deepFreeze(oldState);
    deepFreeze(add);
    state = playersReducer(oldState, add);
    expect(state).toEqual({
        playersById: {
            '1': players[0],
            '2': players[1]
        },
        playerIds: [
            '1',
            '2'
        ]

    })
});

it('updates players', () => {
    players = [{
        id: '1',
        name: 'Player 3',
        life: 20,
        poison: 0,
        library: 'lib-id',
        hand: 'hand-id',
        battlefield: 'battlefield-id',
        graveyard: 'graveyard-id',
        exile: 'exile-id'
    },
    players[1]
    ];
    const upd = updatePlayers([players[0]]);
    const oldState = { ...state };
    deepFreeze(oldState);
    deepFreeze(upd);
    state = playersReducer(oldState, upd);
    expect(state).toEqual({
        playersById: {
            '1': players[0],
            '2': players[1]
        },
        playerIds: [
            '1',
            '2'
        ]

    })
});

it('select player', () => {
    const oldState = { ...state };
    deepFreeze(oldState);
    expect(singlePlayerSelector(oldState, '1')).toEqual(players[0])
})

it('select players', () => {
    const oldState = { ...state };
    deepFreeze(oldState);
    expect(allPlayersSelector(oldState)).toEqual([
        players[0],
        players[1]
    ])
})

it('deletes players', () => {
    const del = deletePlayers(['1', '2']);
    const oldState = { ...state };
    deepFreeze(oldState);
    deepFreeze(del);
    state = playersReducer(oldState, del);
    expect(state).toEqual({
        playerIds: [],
        playersById: {}
    })
});