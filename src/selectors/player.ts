import { createSelector } from 'reselect';
import { AppState } from '../reducers';
import { Card, CardsState } from '../reducers/cardsReducer';
import { Zone } from '../reducers/zonesReducer';

export interface CardZone {
    id: string;
    cards: Card[];
}

export interface PlayerData {
    id: string;
    name: string;
    life: number;
    poison: number;
    library: CardZone;
    hand: CardZone;
    battlefield: CardZone;
    graveyard: CardZone;
    exile: CardZone;
}

const getZones = (state: AppState) => state.zones;
const getCards = (state: AppState) => state.cards;
const getPlayer = (state: AppState, playerId: string) => state.players.playersById[playerId];

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

export const playerSelector = createSelector(
    [getPlayerZones, getCards],
    (player, cards) => ({
        ...player,
        library: mapZoneToCards(player.library, cards),
        hand: mapZoneToCards(player.hand, cards),
        battlefield: mapZoneToCards(player.battlefield, cards),
        graveyard: mapZoneToCards(player.graveyard, cards),
        exile: mapZoneToCards(player.exile, cards)
    })
);

const mapZoneToCards = (zone: Zone, cardState: CardsState) => ({
    id: zone.id,
    cards: zone.cards.map((cardId) => cardState[cardId]),
    selected: []
});
