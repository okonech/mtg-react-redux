import { v4 as uuid } from 'uuid';
import { Card } from '../reducers/cardsReducer';
import { Player } from '../reducers/playersReducer';
import { Zone } from '../reducers/zonesReducer';
import { Player as RawPlayer, players } from './playerData';

export interface PlayersData {
    cards: Card[];
    zones: Zone[];
    players: Player[];
}

export async function initPlayers(game: string): Promise<PlayersData> {
    await setTimeout(null, 100);
    const allCards = new Array<Card>();
    const allPlayers = new Array<Player>();
    const allZones = new Array<Zone>();

    players.forEach((rawPlayer) => {

        const cards = mapRawToCards(rawPlayer.library);
        const player = mapRawToPlayer(rawPlayer);
        const zones = mapDataToZones(player, cards);

        allCards.push(...cards);
        allPlayers.push(player);
        allZones.push(...zones);
    });

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

function mapRawToCards(cards: string[]): Card[] {
    return cards.map((card) => (
        {
            id: uuid(),
            name: card
        }));
}

function mapDataToZones(player: Player, cards: Card[]): Zone[] {
    const idToZone = (id: string, cardIds: string[] = []) => ({
        id,
        cards: cardIds
    });

    return [
        idToZone(player.library, cards.slice(0, 90).map((card) => card.id)),
        // idToZone(player.battlefield, cards.slice(90, 93).map((card) => card.id)),
        idToZone(player.battlefield),
        idToZone(player.hand, cards.slice(93).map((card) => card.id)),
        idToZone(player.graveyard),
        idToZone(player.exile)
    ];
}
