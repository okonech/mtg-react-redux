import { v4 as uuid } from 'uuid';
import { Card } from '../reducers/cardsReducer';
import { Player } from '../reducers/playersReducer';
import { Zone } from '../reducers/zonesReducer';
import shuffle from '../util/shuffle';
import fakeResponse from './fake-response.json';
import { Player as RawPlayer, players } from './playerData';
import { getCards, ScryfallCollectionCard } from './scryfall';

export interface PlayersData {
    cards: Card[];
    zones: Zone[];
    players: Player[];
}

export async function initPlayers(game: string): Promise<PlayersData> {
    await setTimeout(null, 0);
    const allCards = new Array<Card>();
    const allPlayers = new Array<Player>();
    const allZones = new Array<Zone>();

    await Promise.all(players.map(async (rawPlayer) => {

        const player = mapRawToPlayer(rawPlayer);
        const cards = shuffle(await mapRawToCardsFake(player, rawPlayer.library));
        const zones = mapDataToZones(player, cards);
        allCards.push(...cards);
        allPlayers.push(player);
        allZones.push(...zones);
    }));

    return {
        cards: allCards,
        zones: allZones,
        players: allPlayers
    };
}

function mapRawToPlayer(player: RawPlayer): Player {
    return {
        id: uuid(),
        name: player.name,
        life: 20,
        poison: 0,
        library: uuid(),
        hand: uuid(),
        battlefield: uuid(),
        graveyard: uuid(),
        exile: uuid()
    };
}

export async function mapRawToCardsFake(player: Player, cards: string[]): Promise<Card[]> {
    return parseCardData(player, fakeResponse[player.name]);
}

export async function mapRawToCards(player: Player, cards: string[]): Promise<Card[]> {
    const apiCards = await getCards(cards);
    console.log(JSON.stringify(apiCards));
    return parseCardData(player, apiCards);
}

function parseCardData(player: Player, cards: ScryfallCollectionCard[]): Card[] {
    return cards.map((card) => {
        const { card_faces, color_identity } = card;
        let { name, image_uris } = card;

        if (card_faces) {
            ({ name, image_uris } = card_faces[0]);
        }

        return {
            id: uuid(),
            name,
            url: {
                small: image_uris.small,
                normal: image_uris.normal
            },
            foil: false,
            tapped: false,
            colorIdentity: color_identity,
            owner: player.id,
            controller: player.id
        };

    });
}

function mapDataToZones(player: Player, cards: Card[]): Zone[] {
    const idToZone = (id: string, cardIds: string[] = []) => ({
        id,
        cards: cardIds,
        selected: []
    });

    return [
        idToZone(player.library, cards.slice(0, 93).map((card) => card.id)),
        // idToZone(player.battlefield, cards.slice(90, 93).map((card) => card.id)),
        idToZone(player.battlefield),
        idToZone(player.hand, cards.slice(93).map((card) => card.id)),
        idToZone(player.graveyard),
        idToZone(player.exile)
    ];
}
