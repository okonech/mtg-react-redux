import { addZones, deleteZones } from '../../actions/zonesActions';
import { moveCards } from '../../actions/gameCardsActions';
import { updateZones } from '../../actions/zonesActions';
import deepFreeze from 'deep-freeze';
import zonesReducer, { singleZoneSelector, Zone, zonesSelector, ZonesState } from '../../reducers/zonesReducer';

let state: ZonesState = {};
let zones: Zone[] = [
    {
        id: '1',
        cards: [
            '10',
            '11',
            '12'
        ]
    },
    {
        id: '2',
        cards: [
            '20',
            '21',
            '22'
        ]
    }
];

it('initial state', () => {
    expect(zonesReducer(undefined, {} as any)).toEqual({});
});

it('adds zones', () => {
    const action = addZones(zones);
    const oldState = { ...state };
    deepFreeze(oldState);
    deepFreeze(action);
    state = zonesReducer(oldState, action);
    expect(state).toEqual({
        1: zones[0],
        2: zones[1]
    });
});

it('updates zones', () => {
    zones = [
        {
            id: '1',
            cards: [
                '30',
                '31',
                '32'
            ]
        },
        zones[1]
    ];
    const action = updateZones(zones);
    const oldState = { ...state };
    deepFreeze(oldState);
    deepFreeze(action);
    state = zonesReducer(oldState, action);
    expect(state).toEqual({
        1: zones[0],
        2: zones[1]
    });
});

it('moves card', () => {
    zones = [
        {
            id: '1',
            cards: [
                '30',
                '32'
            ]
        },
        {
            id: '2',
            cards: [
                '20',
                '31',
                '21',
                '22'
            ]
        }
    ];
    const action = moveCards('1', ['31'], '2', 1, 0, 0);
    const oldState = { ...state };
    deepFreeze(oldState);
    deepFreeze(action);
    state = zonesReducer(oldState, action);
    expect(state).toEqual({
        1: zones[0],
        2: zones[1]
    });
});

it('doesnt duplicate cards', () => {
    zones = [
        {
            id: '1',
            cards: [
                '30',
                '32'
            ]
        },
        {
            id: '2',
            cards: [
                '20',
                '31',
                '21',
                '22'
            ]
        }
    ];
    const action = moveCards('1', ['20', '21'], '2', 1, 0, 0);
    const oldState = { ...state };
    deepFreeze(oldState);
    deepFreeze(action);
    state = zonesReducer(oldState, action);
    expect(state).toEqual({
        1: zones[0],
        2: zones[1]
    });
});

it('select zone', () => {
    const oldState = { ...state };
    deepFreeze(oldState);
    expect(singleZoneSelector(oldState, '1')).toEqual(zones[0]);
});

it('select zones', () => {
    const oldState = { ...state };
    deepFreeze(oldState);
    expect(zonesSelector(oldState, ['1', '2'])).toEqual([
        zones[0],
        zones[1]
    ]);
});

it('deletes zones', () => {
    const action = deleteZones(['1', '2']);
    const oldState = { ...state };
    deepFreeze(oldState);
    deepFreeze(action);
    state = zonesReducer(oldState, action);
    expect(state).toEqual({});
});
