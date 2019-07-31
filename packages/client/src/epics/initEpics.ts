import { Epic } from 'redux-observable';
import { from } from 'rxjs';
import { concatMap, switchMap } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';
import { addCards } from '../actions/cardsActions';
import { setId } from '../actions/gameActions';
import { loaded, loading } from '../actions/loadingActions';
import { addPlayers } from '../actions/playersActions';
import { addZones } from '../actions/zonesActions';
import { initPlayers as initPlayersAction } from '../fake-backend/player';
import { AppState } from '../reducers';

// config has getFirebase and getFirestore functions
const initPlayers: Epic<any, any, AppState> = (action$, $state, config) =>
    action$
        .ofType('INIT_PLAYERS')
        .pipe(
            switchMap((action) => from(initPlayersAction(action.payload))),
            concatMap((data) => [
                loading(),
                addCards(data.cards),
                addPlayers(data.players),
                addZones(data.zones),
                setId(uuid()),
                loaded()
            ])
        );

export default initPlayers;
