import { AppState } from '../reducers';
import { combineEpics } from 'redux-observable';
import { Epic } from 'redux-observable';
import { filter, map, switchMap } from 'rxjs/operators';
import { from } from 'rxjs';
import { isActionOf } from 'typesafe-actions';
import { moveCards, moveCardsFixCoords } from '../actions/gameCardsActions';

async function fixCoords(payload: ReturnType<typeof moveCardsFixCoords>['payload']): Promise<Parameters<typeof moveCards>> {
    const { fromZone, toZone, ids, toIdx, xCoord, yCoord } = payload;

    const coordCards = ids.map((id, idx) => ({
        id,
        x: xCoord + idx * 15,
        y: yCoord + idx * 15
    }));

    return [fromZone, toZone, coordCards, toIdx];
}

const getCards: Epic<any, any, AppState> = (action$) =>
    action$
        .pipe(
            filter(isActionOf(moveCardsFixCoords)),
            // create disposable stream to catch errors but keep observable
            switchMap((action) =>
                from(fixCoords(action.payload))
                    .pipe(
                        map(args => moveCards(...args))
                    )
            )
        );

const gameCardEpics = combineEpics(
    getCards
);

export default gameCardEpics;
