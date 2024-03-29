import { Cards as CardApi, CardIdentifier, Card as ScryfallCard } from 'scryfall-sdk';
import { cardModelsMap, CardPrimitive, gameCardModelsMap, GameCardPrimitive } from '@mtg-react-redux/models';
import { Player } from '../reducers/playersReducer';
import { players, Player as RawPlayer } from './playerData';
import { shuffle } from '../util/ordering';
import { v4 as uuid } from 'uuid';
import { Zone } from '../reducers/zonesReducer';

export interface PlayersData {
    cards: CardPrimitive[];
    gameCards: GameCardPrimitive[];
    zones: Zone[];
    players: Player[];
}

export async function initPlayers(game: string): Promise<PlayersData> {
    console.log(game);
    const allCards = new Array<CardPrimitive>();
    const allGameCards = new Array<GameCardPrimitive>();
    const allPlayers = new Array<Player>();
    const allZones = new Array<Zone>();

    await Promise.all(players.map(async (rawPlayer) => {

        const player = mapRawToPlayer(rawPlayer);
        const rawCommanders = rawPlayer.commanders;
        const cards = await mapRawToCards([...rawPlayer.library, ...rawCommanders]);
        const { lib, commanders } = cards.reduce((acc, curr) => {
            if (rawCommanders.includes(cardModelsMap.getModel(curr).name())) {
                acc.commanders.push(curr);
            } else {
                acc.lib.push(curr);
            }
            return acc;
        }, { lib: [], commanders: [] } as { lib: CardPrimitive[]; commanders: CardPrimitive[] });
        const [gameCardCommanders, gameCards] = [
            // always sort commanders alphabetically
            mapToGameCards(player, commanders.sort((a, b) => cardModelsMap.getModel(a).name().localeCompare(cardModelsMap.getModel(b).name()))),
            mapToGameCards(player, lib)
        ];
        const zones = mapDataToZones(player, shuffle(gameCards), gameCardCommanders);
        player.commanders = gameCardCommanders.map(card => card.id);
        allCards.push(...cards);
        allGameCards.push(...gameCards, ...gameCardCommanders);
        allPlayers.push(player);
        allZones.push(...zones);
    }));

    return {
        cards: allCards,
        gameCards: allGameCards,
        zones: allZones,
        players: allPlayers
    };
}

function mapRawToPlayer(player: RawPlayer): Player {
    return {
        id: uuid(),
        dbId: 'aaa',
        name: player.name,
        life: 20,
        poison: 0,
        library: uuid(),
        hand: uuid(),
        battlefield: uuid(),
        graveyard: uuid(),
        exile: uuid(),
        command: uuid(),
        commanders: []
    };
}

export async function mapRawToCards(cards: string[]): Promise<CardPrimitive[]> {
    const apiCards = await CardApi.collection(...cards.map((card) => CardIdentifier.byName(card))).waitForAll();
    return parseCardData(apiCards);
}

export function mapToGameCards(player: Player, cards: CardPrimitive[]) {
    return cards.map((card) => {
        const gameCard: GameCardPrimitive = {
            id: uuid(),
            dbId: card.id,
            tapped: false,
            flipped: false,
            controller: player.id,
            owner: player.id,
            x: 0,
            y: 0
        };
        return gameCardModelsMap.getModel({ gameCard, card }).dehydrate();
    }

    );
}

function parseCardData(cards: ScryfallCard[]): CardPrimitive[] {
    return cards.map((card) =>
        cardModelsMap.getModel(card).dehydrate()
    );
}

function mapDataToZones(player: Player, cards: GameCardPrimitive[], commanders: GameCardPrimitive[]): Zone[] {
    const idToZone = (id: string, cardIds: string[] = []) => ({
        id,
        cards: cardIds,
        selected: []
    });

    return [
        idToZone(player.library, cards.slice(7, 100).map((card) => card.id)),
        idToZone(player.battlefield),
        idToZone(player.hand, cards.slice(0, 7).map((card) => card.id)),
        idToZone(player.graveyard),
        idToZone(player.exile),
        idToZone(player.command, commanders.map(card => card.id))
    ];
}
