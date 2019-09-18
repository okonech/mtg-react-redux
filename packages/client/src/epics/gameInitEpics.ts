import { addCards } from '../actions/gameCardsActions';
import { addPlayers } from '../actions/playersActions';
import { addZones } from '../actions/zonesActions';
import { AppState } from '../reducers';
import { cardsAsync } from '../actions/cardsActions';
import { combineEpics, Epic } from 'redux-observable';
import { concatMap, switchMap } from 'rxjs/operators';
import { from } from 'rxjs';
import { initPlayers as initPlayersAction } from '../fake-backend/player';
import { loaded, loading } from '../actions/loadingActions';
import { setId } from '../actions/gameActions';
import { v4 as uuid } from 'uuid';

// config has getFirebase and getFirestore functions
const initPlayers: Epic<any, any, AppState> = (action$) =>
    action$
        .ofType('INIT_PLAYERS')
        .pipe(
            switchMap((action) => from(initPlayersAction(action.payload))),
            concatMap((data) => [
                loading(),
                cardsAsync.success(data.cards),
                addCards(data.gameCards),
                addPlayers(data.players),
                addZones(data.zones),
                setId(uuid()),
                loaded()
            ])
        );

const gameInitEpics = combineEpics(
    initPlayers
);

export default gameInitEpics;
