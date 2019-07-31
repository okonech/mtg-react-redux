import { CardModel, CardPrimitive } from '@mtg-react-redux/models';
import { Epic } from 'redux-observable';
import { combineEpics } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Card, CardIdentifier, Cards } from 'scryfall-sdk';
import { CardQueryAction } from '../actions/cardsActions';
import { addCards, cardsErr } from '../actions/cardsActions';
import { AppState } from '../reducers';
import { singleCardByNameSelector, singleCardSelector } from '../reducers/cardsReducer';
import { FBConfig } from './index';

async function getCardsData(ids: string[], type: 'id' | 'name', state: AppState): Promise<CardPrimitive[]> {

    // filter existing
    const filterFunc = type === 'id' ? singleCardSelector : singleCardByNameSelector;
    ids = ids.filter((id) => !filterFunc(state.cards, id));

    let cards: Card[];

    if (ids.length === 0) {
        return [];
    }

    // single card case
    if (ids.length === 1) {
        const id = ids[0];
        if (type === id) {
            cards = [await Cards.byId(id)];
        } else {
            cards = [await Cards.byName(id)];
        }
    } else {
        // collection
        const toPost = type === 'id' ? ids.map((id) => CardIdentifier.byId(id)) :
            ids.map((id) => CardIdentifier.byName(id));
        cards = await Cards.collection(...toPost).waitForAll();
    }
    // convert to models
    return cards.map((card) => new CardModel(card).dehydrate());
}

// config has getFirebase and getFirestore functions
export const getCards: Epic<any, any, AppState> = (action$, $state, config: FBConfig) =>
    action$
        .ofType('GET_CARDS')
        .pipe(
            // create disposable stream to catch errors but keep observable
            switchMap((action: CardQueryAction) =>
                from(getCardsData(action.payload.ids, action.payload.type, $state.value))
                    .pipe(
                        switchMap((response) => of(
                            addCards(response)
                        )),
                        catchError((error) => of(
                            cardsErr(error)
                        ))
                    )
            )
        );

const cardEpics = combineEpics(
    getCards
);

export default cardEpics;
