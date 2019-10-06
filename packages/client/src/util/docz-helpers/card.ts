import { cardModelsMap, CardPrimitive, gameCardModelsMap, GameCardPrimitive, TYPES } from '@mtg-react-redux/models';
import { CardsState } from '../../reducers/cardsReducer';
import { DeckEditorRow, DeckEditorState } from '../../reducers/deckEditorReducer';

export const examplePrimitive: CardPrimitive = {
    cmc: 5.0,
    colors: ['B'],
    color_identity: ['B'],
    id: '0a4ce4a1-65e3-4b40-be35-8fc55a968ec8',
    image_uris: {
        small: 'https://img.scryfall.com/cards/small/front/0/a/0a4ce4a1-65e3-4b40-be35-8fc55a968ec8.jpg?1562700939',
        normal: 'https://img.scryfall.com/cards/normal/front/0/a/0a4ce4a1-65e3-4b40-be35-8fc55a968ec8.jpg?1562700939',
        large: 'https://img.scryfall.com/cards/large/front/0/a/0a4ce4a1-65e3-4b40-be35-8fc55a968ec8.jpg?1562700939',
        png: 'https://img.scryfall.com/cards/png/front/0/a/0a4ce4a1-65e3-4b40-be35-8fc55a968ec8.png?1562700939',
        art_crop: 'https://img.scryfall.com/cards/art_crop/front/0/a/0a4ce4a1-65e3-4b40-be35-8fc55a968ec8.jpg?1562700939',
        border_crop: 'https://img.scryfall.com/cards/border_crop/front/0/a/0a4ce4a1-65e3-4b40-be35-8fc55a968ec8.jpg?1562700939'
    },
    layout: 'normal',
    legalities: {
        'standard': 'not_legal',
        'future': 'not_legal',
        'modern': 'legal',
        'legacy': 'legal',
        'pauper': 'not_legal',
        'vintage': 'legal',
        'penny': 'not_legal',
        'commander': 'legal',
        'brawl': 'not_legal',
        'duel': 'legal',
        'frontier': 'not_legal',
        '1v1': 'not_legal'
    },
    mana_cost: '{3}{B}{B}',
    name: 'Ad Nauseam',
    // tslint:disable-next-line: max-line-length
    oracle_text: 'Reveal the top card of your library and put that card into your hand. You lose life equal to its converted mana cost. You may repeat this process any number of times.',
    set: 'ala',
    set_name: 'Shards of Alara',
    prints_search_uri: 'https://api.scryfall.com/cards/search?order=released&q=oracleid%3A981b0e21-e5e6-4a1e-bfde-679d56623f7f&unique=prints',
    type_line: 'Instant',
    scryfall_uri: 'https://scryfall.com/card/ala/63/ad-nauseam?utm_source=api',
    prices: {
        usd: '13.62',
        usd_foil: '35.57',
        eur: '5.19',
        tix: '0.11'
    }
};

export const exampleGamePrimitive: GameCardPrimitive = {
    id: 'naus',
    dbId: '0a4ce4a1-65e3-4b40-be35-8fc55a968ec8',
    tapped: false,
    flipped: false,
    controller: 'aaa',
    owner: 'aaa',
    x: 0,
    y: 0
};

export function exampleCardModel() {
    return cardModelsMap.getModel(examplePrimitive);
}

export function exampleGameCardModel() {
    return gameCardModelsMap.getModel({ card: examplePrimitive, gameCard: exampleGamePrimitive });
}

function randType() {
    return TYPES[Math.floor(Math.random() * (TYPES.length))];
}

export function exampleCardState(): CardsState {
    return {
        cards: Array.from({ length: 50 }).reduce((acc: { [key: string]: CardPrimitive }, card, idx) => {
            const id = idx.toString();
            const type = randType();
            const primitiveClone = { ...examplePrimitive, id, type_line: type };
            acc[id] = primitiveClone;
            return acc;
        }, {}),
        cardsbyName: {
            [examplePrimitive.name]: examplePrimitive.id
        }
    };
}

const exampleDeckRow: DeckEditorRow = {
    id: examplePrimitive.id,
    quantity: 3,
    sideboard: 1,
    owned: 1
};

export function exampleCardList(): DeckEditorState['cards'] {
    return Array.from({ length: 50 }).reduce((acc: DeckEditorState['cards'], card, idx) => {
        const id = idx.toString();
        acc[id] = { ...exampleDeckRow, id };
        return acc;
    }, {});
}
