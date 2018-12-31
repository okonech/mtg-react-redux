import { v1 as uuid } from 'uuid';
import { players, Player as RawPlayer } from './playerData';
import { Player } from '../reducers/playersReducer';
import { Card } from '../reducers/cardsReducer';
import { Zone } from '../reducers/zonesReducer';

export interface PlayersData {
    cards: Card[];
    zones: Zone[];
    players: Player[]
}

export async function initPlayers(game: string): Promise<PlayersData> {
    await setTimeout(null, 100);
    const allCards = new Array<Card>();
    const allPlayers = new Array<Player>();
    const allZones = new Array<Zone>();

    players.forEach((rawPlayer) => {

        const cards = mapRawToCards(rawPlayer.library);
        const player = mapRawToPlayer(rawPlayer);
        const zones = mapDataToZones(player, cards)

        allCards.push(...cards);
        allPlayers.push(player);
        allZones.push(...zones);
    })

    return {
        cards: allCards,
        zones: allZones,
        players: allPlayers
    }

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
    }
}

function mapRawToCards(cards: string[]): Card[] {
    return cards.map(card => (
        {
            id: uuid(),
            name: card
        }))
};

function mapDataToZones(player: Player, cards: Card[]): Zone[] {
    const idToZone = (id: string, cards: string[] = []) => ({
        id,
        cards
    });

    return [
        idToZone(player.library, cards.slice(0, 93).map((card) => card.id)),
        idToZone(player.battlefield),
        idToZone(player.hand, cards.slice(93).map((card) => card.id)),
        idToZone(player.graveyard),
        idToZone(player.exile),
    ]
}