const cards = [
  'Lotus Petal',
  'Mana Crypt',
  'Nihil Spellbomb',
  'Orzhov Signet',
  "Sensei's Divining Top",
  'Candelabra of Tawnos',
  'Sol Ring',
  "Lion's Eye Diamond",
  'Mox Opal',
  'Mox Diamond',
  'Mana Vault',
  'Chrome Mox',
  'Talisman of Dominance',
  'Scroll Rack',
  'Azorius Signet',
  'Talisman of Progress',
  'Fellwar Stone',
  'Grim Monolith',
  'Helm of Awakening',
  'Dimir Signet',
  'Isochron Scepter',
  'Aetherflux Reservoir',
  'Laboratory Maniac',
  'Shimmer Myr',
  'Zur the Enchanter',
  'Notion Thief',
  "Jace, Vryn's Prodigy",
  'Mystic Remora',
  'Grasp of Fate',
  'Necropotence',
  'High Tide',
  'Mana Drain',
  'Counterspell',
  'Mystical Tutor',
  'Vampiric Tutor',
  'Dark Ritual',
  'Frantic Search',
  'Gush',
  'Force of Will',
  'Pact of Negation',
  'Mental Misstep',
  'Swan Song',
  'Spell Pierce',
  'Quicken',
  'Negate',
  'Ad Nauseam',
  'Swords to Plowshares',
  'Cabal Ritual',
  'Silence',
  'Enlightened Tutor',
  "Hurkyl's Recall",
  "Angel's Grace",
  'Brainstorm',
  'Chain of Vapor',
  'Flusterstorm',
  'Impulse',
  'Delay',
  'Dramatic Reversal',
  "Lim-Dûl's Vault",
  'Cyclonic Rift',
  'Underground Sea',
  'Polluted Delta',
  'Ancient Tomb',
  'Windswept Heath',
  'Watery Grave',
  'Verdant Catacombs',
  'Flooded Strand',
  'Tundra',
  'Swamp',
  'Scrubland',
  'Scalding Tarn',
  'Marsh Flats',
  'Mana Confluence',
  'Island',
  'Island',
  'Island',
  'Island',
  'Island',
  'Island',
  'Island',
  'Island',
  'Hallowed Fountain',
  'Arid Mesa',
  'Misty Rainforest',
  'Command Tower',
  'City of Brass',
  'Bloodstained Mire',
  'Godless Shrine',
  'Gemstone Caverns',
  'Imperial Seal',
  "Yawgmoth's Will",
  'Toxic Deluge',
  'Windfall',
  'Timetwister',
  'Doomsday',
  'Ponder',
  'Gitaxian Probe',
  'Preordain',
  'Demonic Tutor',
  'Merchant Scroll'
];

const cardsById = cards.map((cardName: string, index: number) => (
  {
    key: index.toString(),
    id: index.toString(),
    name: cardName
  }
));

export function playersAddPlayer(name: string, deckId: string) {
    return {
      type: 'PLAYERS_ADD_PLAYER',
      // TODO: load deck cards from ID
      payload: {
        name,
        life: 40,
        poison: 0,
        library: cardsById.slice(8, 99),
        hand: cardsById.slice(0, 7),
        battlefield: [],
        graveyard: [],
        exile: []
      } as stateInterface.Player
    };
}

// not used
export function setUserName(name: string) {
    return {
      type: 'SET_USER_NAME',
      payload: name,
    };
}

// not used
export function setUserDeck(deck: string) {
    return {
      type: 'SET_USER_DECK',
      payload: deck,
    };
}

interface PlayerZone {
  player: number;
  zone: string;
}

export function cardsDND(from: PlayerZone, to: PlayerZone, draggedCards: stateInterface.Card[]) {
  return {
    type: 'PLAYERS_CARDS_DND',
    payload: {
      from,
      to,
      cards: draggedCards
    },
  };
}