import { createSelector } from 'reselect';
import { AppState } from '../reducers';
import { Card, CardsState } from '../reducers/cardsReducer';
import { singleCardSelector } from '../reducers/cardsReducer';
import { CardsSettings, CardsSettingsState } from '../reducers/cardsSettingsStateReducer';
import { singlePlayerSelector } from '../reducers/playersReducer';
import { Zone } from '../reducers/zonesReducer';

export interface CardZone {
    id: string;
    cards: Card[];
}

export interface CardCoordZone {
    id: string;
    cards: Array<Card & CardsSettings>;
}

export interface PlayerData {
    id: string;
    name: string;
    life: number;
    poison: number;
    library: CardZone;
    hand: CardZone;
    battlefield: CardCoordZone;
    graveyard: CardZone;
    exile: CardZone;
}

const getZones = (state: AppState) => state.zones;
const getCards = (state: AppState) => state.cards;
const getPlayer = (state: AppState, playerId: string) => singlePlayerSelector(state.players, playerId);
const getCardsSettings = (state: AppState) => state.cardsSettingsState;

const getPlayerZones = createSelector(
    [getPlayer, getZones],
    (player, zones) => ({
        ...player,
        library: zones[player.library],
        hand: zones[player.hand],
        battlefield: zones[player.battlefield],
        graveyard: zones[player.graveyard],
        exile: zones[player.exile]
    })
);

const mapZoneToCards = (zone: Zone, cardState: CardsState): CardZone => ({
    id: zone.id,
    cards: zone.cards.map((cardId) => singleCardSelector(cardState, cardId))
});

const mapZoneToCoordCards = (zone: Zone, cardState: CardsState,
    cardsSettingsState: CardsSettingsState): CardCoordZone => ({
        id: zone.id,
        cards: zone.cards.map((cardId) => ({ ...singleCardSelector(cardState, cardId), ...cardsSettingsState[cardId] }))
    });

export const playerSelector = createSelector(
    [getPlayerZones, getCards, getCardsSettings],
    (player, cards, cardsSettings): PlayerData => ({
        ...player,
        library: mapZoneToCards(player.library, cards),
        hand: mapZoneToCards(player.hand, cards),
        battlefield: mapZoneToCoordCards(player.battlefield, cards, cardsSettings),
        graveyard: mapZoneToCards(player.graveyard, cards),
        exile: mapZoneToCards(player.exile, cards)
    })
);
