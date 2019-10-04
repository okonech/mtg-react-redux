import { AppState } from '../reducers';
import { CardPrimitive, GameCardPrimitive } from '@mtg-react-redux/models';
import { CardsState, singleCardSelector } from '../reducers/cardsReducer';
import { createSelector } from 'reselect';
import { GameCardsState, singleGameCardSelector } from '../reducers/gameCardsReducer';
import { singlePlayerSelector } from '../reducers/playersReducer';
import { Zone } from '../reducers/zonesReducer';

export interface GameCardZone {
    id: string;
    cards: GameCardData[];
}

export interface GameCardData {
    card: CardPrimitive;
    gameCard: GameCardPrimitive;
}

export interface PlayerData {
    id: string;
    name: string;
    life: number;
    poison: number;
    library: GameCardZone;
    hand: GameCardZone;
    battlefield: GameCardZone;
    graveyard: GameCardZone;
    exile: GameCardZone;
    command: GameCardZone;
    commanders: GameCardData[];
}

const getZones = (state: AppState) => state.zones;
const getCards = (state: AppState) => state.cards;
const getGameCards = (state: AppState) => state.gameCards;
const getPlayer = (state: AppState, playerId: string) => singlePlayerSelector(state.players, playerId);

const getPlayerZones = createSelector(
    [getPlayer, getZones],
    (player, zones) => ({
        ...player,
        library: zones[player.library],
        hand: zones[player.hand],
        battlefield: zones[player.battlefield],
        graveyard: zones[player.graveyard],
        exile: zones[player.exile],
        command: zones[player.command]
    })
);

const mapZoneToCards = (zone: Zone, cardsState: CardsState, gameCardsState: GameCardsState): GameCardZone => ({
    id: zone.id,
    cards: mapIdsToGameCardData(zone.cards, cardsState, gameCardsState)
});

export const mapIdsToGameCardData = (ids: string[], cardsState: CardsState, gameCardsState: GameCardsState): GameCardData[] =>
    ids.map((cardId) => {
        const gameCard = singleGameCardSelector(gameCardsState, cardId);
        const card = singleCardSelector(cardsState, gameCard.dbId);
        return {
            card,
            gameCard
        };
    });

export const playerSelector = createSelector(
    [getPlayerZones, getCards, getGameCards],
    (player, cards, gameCards): PlayerData => ({
        ...player,
        library: mapZoneToCards(player.library, cards, gameCards),
        hand: mapZoneToCards(player.hand, cards, gameCards),
        battlefield: mapZoneToCards(player.battlefield, cards, gameCards),
        graveyard: mapZoneToCards(player.graveyard, cards, gameCards),
        exile: mapZoneToCards(player.exile, cards, gameCards),
        command: mapZoneToCards(player.command, cards, gameCards),
        commanders: mapIdsToGameCardData(player.commanders, cards, gameCards)
    })
);
