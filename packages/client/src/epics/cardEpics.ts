import { CardModel, CardPrimitive } from '@mtg-react-redux/models';
import { Epic } from 'redux-observable';
import { combineEpics } from 'redux-observable';
import { from, of, pipe } from 'rxjs';
import { catchError, filter, map, switchMap, takeUntil } from 'rxjs/operators';
import { CardIdentifier, Cards } from 'scryfall-sdk';
import { isActionOf } from 'typesafe-actions';
import { cardsAsync } from '../actions/cardsActions';
import { AppState } from '../reducers';
import { singleCardByNameSelector, singleCardSelector } from '../reducers/cardsReducer';

async function getCardsData(ids: string[], type: 'id' | 'name', state: AppState): Promise<CardPrimitive[]> {

    // filter existing
    const filterFunc = type === 'id' ? singleCardSelector : singleCardByNameSelector;
    ids = ids.filter((id) => !filterFunc(state.cards, id));

    if (ids.length === 0) {
        return [];
    }

    // collection
    const toPost = type === 'id' ? ids.map((id) => CardIdentifier.byId(id)) :
        ids.map((id) => CardIdentifier.byName(id));
    const cards = await Cards.collection(...toPost).waitForAll();
    // convert to models to remove unneeded props
    return cards.map((card) => new CardModel(card).dehydrate());
}

const getCards: Epic<any, any, AppState> = (action$, $state) =>
    action$
        .pipe(
            filter(isActionOf(cardsAsync.request)),
            // create disposable stream to catch errors but keep observable
            switchMap((action) =>
                from(getCardsData(action.payload.ids, action.payload.type, $state.value))
                    .pipe(
                        map(cardsAsync.success),
                        catchError(pipe(cardsAsync.failure, of)),
                        takeUntil(action$.pipe(filter(isActionOf(cardsAsync.cancel))))
                    )
            )
        );

const cardEpics = combineEpics(
    getCards
);

export default cardEpics;
