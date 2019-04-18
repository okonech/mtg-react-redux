import deepFreeze from 'deep-freeze';
import { moveCards } from '../../actions/zonesActions';
import cardsSettingsStateReducer, {
    CardsSettings, cardsSettingsSelector,
    CardsSettingsState, singleCardsSettingsSelector
} from '../../reducers/cardsSettingsStateReducer';

let state: CardsSettingsState = {};
let cardsSettings: CardsSettings[] = [
    {
        id: '1',
        xCoord: 0,
        yCoord: 0
    },
    {
        id: '12',
        xCoord: 0,
        yCoord: 0
    }
];

it('initial state', () => {
    expect(cardsSettingsStateReducer(undefined, {} as any)).toEqual({});
});

it('moves cards', () => {
    cardsSettings = [
        {
            id: '1',
            xCoord: 100,
            yCoord: 200
        },
        {
            id: '2',
            xCoord: 100,
            yCoord: 200
        },
        {
            id: '3',
            xCoord: 100,
            yCoord: 200
        }
    ];
    const action = moveCards('1', ['1', '2', '3'], '2', 1, 100, 200);
    const oldState = { ...state };
    deepFreeze(oldState);
    deepFreeze(action);
    state = cardsSettingsStateReducer(oldState, action);
    expect(state).toEqual({
        1: cardsSettings[0],
        2: cardsSettings[1],
        3: cardsSettings[2]
    });
});

it('select card settings', () => {
    const oldState = { ...state };
    deepFreeze(oldState);
    expect(singleCardsSettingsSelector(oldState, '1')).toEqual(cardsSettings[0]);
});

it('select cards settings', () => {
    const oldState = { ...state };
    deepFreeze(oldState);
    expect(cardsSettingsSelector(oldState, ['1', '2'])).toEqual([
        cardsSettings[0],
        cardsSettings[1]
    ]);
});
