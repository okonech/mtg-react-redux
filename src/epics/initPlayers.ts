import { Epic } from "redux-observable";
import { from } from 'rxjs';
import { switchMap, concatMap } from 'rxjs/operators';
import { AppState } from '../reducers';
import { initPlayers as initPlayersAction } from '../fake-backend/player';
import { addPlayers } from '../actions/playersActions';
import { addZones } from '../actions/zonesActions';
import { addCards } from '../actions/cardsActions';
import { loading, loaded } from '../actions/loadingActions';


const initPlayers: Epic<any, any, AppState> = (action$) =>
    action$
        .ofType('INIT_PLAYERS')
        .pipe(
            switchMap((action) => from(initPlayersAction(action.payload))),
            concatMap((data) => [
                loading(),
                addCards(data.cards),
                addPlayers(data.players),
                addZones(data.zones),
                loaded()
            ])
        );

export default initPlayers;