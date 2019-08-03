import { Card } from 'scryfall-sdk';
import CardModelError from './CardModelError';
import { deleteEmpty } from './util/objects';

export type CardPrimitive = Pick<Card,
    'id' | 'image_uris' | 'name' | 'layout' | 'mana_cost' | 'cmc' |
    'type_line' | 'set' | 'set_name' | 'prints_search_uri' | 'oracle_text' |
    'legalities' | 'colors' | 'color_identity' | 'card_faces' | 'scryfall_uri' | 'prices'
>;

type Types = 'Artifact' | 'Conspiracy' | 'Creature' | 'Enchantment' | 'Instant' |
    'Land' | 'Phenomenon' | 'Plane' | 'Planeswalker' | 'Scheme' | 'Sorcery' | 'Tribal' | 'Vanguard';

// types by importance in return struct
export const TYPES: Types[] = [
    'Creature', 'Planeswalker', 'Enchantment', 'Instant', 'Sorcery', 'Land', 'Artifact'
];

type ColorType = 'White' | 'Blue' | 'Black' | 'Red' | 'Green' | 'Multicolor' | 'Colorless';

type ImageSize = 'small' | 'medium' | 'large';

interface CardModel {
    readonly id: CardPrimitive['id'];
    readonly set: CardPrimitive['set'];
    readonly setName: CardPrimitive['set_name'];
    readonly printsSearchUri: CardPrimitive['prints_search_uri'];
    readonly legalities: CardPrimitive['legalities'];
    readonly colorIdentity: CardPrimitive['color_identity'];
    readonly scryfallUri: CardPrimitive['scryfall_uri'];
    readonly prices: CardPrimitive['prices'];

    name(flipped: boolean): CardPrimitive['name'];
    cmc(flipped: boolean): CardPrimitive['cmc'];
    manaCost(flipped: boolean): CardPrimitive['mana_cost'];
    layout(flipped: boolean): CardPrimitive['layout'];
    typeLine(flipped: boolean): CardPrimitive['type_line'];
    oracleText(flipped: boolean): CardPrimitive['oracle_text'];
    colors(flipped: boolean): CardPrimitive['colors'];

    types(flipped: boolean): Types[];
    // get front by default, flipped side optionally. Falls back to front
    imageUrl(type: ImageSize, flipped?: boolean): string;

    // return primitive
    dehydrate(): CardPrimitive;
}

export class CardModelImpl implements CardModel {

    constructor(private _card: CardPrimitive | Card) { }

    public static colorType(colors: CardPrimitive['colors']): ColorType {
        if (colors.length === 0) {
            return 'Colorless';
        }
        if (colors.length > 1) {
            return 'Multicolor';
        }
        const color = colors[0];
        switch (color) {
            case 'W':
                return 'White';
            case 'U':
                return 'Blue';
            case 'B':
                return 'Black';
            case 'R':
                return 'Red';
            case 'G':
                return 'Green';
            default:
                throw new CardModelError(`Invalid color: ${color}`);
        }

    }

    get id() {
        return this._card.id;
    }

    get set() {
        return this._card.set;
    }

    get setName() {
        return this._card.set_name;
    }

    get printsSearchUri() {
        return this._card.prints_search_uri;
    }

    get legalities() {
        return this._card.legalities;
    }

    get colorIdentity() {
        return this._card.color_identity;
    }

    get scryfallUri() {
        return this._card.scryfall_uri;
    }

    get prices() {
        return this._card.prices;
    }

    public name(flipped = false) {
        return this.searchPreferFaces(this._card, flipped, 'name');
    }

    public cmc(flipped = false) {
        return this.searchFaces(this._card, flipped, 'cmc');
    }

    public manaCost(flipped = false) {
        return this.searchFaces(this._card, flipped, 'mana_cost');
    }

    public layout(flipped = false) {
        return this.searchFaces(this._card, flipped, 'layout');
    }

    public types(flipped = false) {
        const type = this.typeLine(flipped);
        // parse type line for an enum of types
        return TYPES.filter((searchType) => type.includes(searchType));
    }

    public typeLine(flipped = false) {
        return this.searchPreferFaces(this._card, flipped, 'type_line');
    }

    public oracleText(flipped = false) {
        return this.searchFaces(this._card, flipped, 'oracle_text');
    }

    public colors(flipped = false) {
        return this.searchFaces(this._card, flipped, 'colors');
    }

    private searchFaces(card: CardPrimitive | CardPrimitive['card_faces'][number], flipped = false, prop: keyof CardPrimitive) {
        // could be 0 so need to check for undefined
        if (card[prop] !== undefined) {
            return card[prop];
        }

        if ((card as CardPrimitive).card_faces) {
            return this.searchFaces((card as CardPrimitive).card_faces[flipped ? 1 : 0], flipped, prop);
        }
        throw new CardModelError(`No ${prop} found`);
    }

    private searchPreferFaces(card: CardPrimitive | CardPrimitive['card_faces'][number], flipped = false, prop: keyof CardPrimitive) {
        if ((card as CardPrimitive).card_faces) {
            return this.searchFaces((card as CardPrimitive).card_faces[flipped ? 1 : 0], flipped, prop);
        }
        // could be 0 so need to check for undefined
        if (card[prop] !== undefined) {
            return card[prop];
        }
        throw new CardModelError(`No ${prop} found`);
    }

    public imageUrl(type: ImageSize, flipped = false) {
        const { image_uris, card_faces } = this._card;

        let normalizedType: keyof CardPrimitive['image_uris'];
        switch (type) {
            case 'small':
            case 'large':
                normalizedType = type;
                break;
            case 'medium':
                normalizedType = 'normal';
                break;
            default:
                normalizedType = 'small';
        }

        // no faces, return regular
        if (!card_faces) {
            return image_uris[normalizedType];
        }

        // locate appropriate face
        const face = card_faces[flipped ? 1 : 0];

        // fall back to regular images (split cards, etc)
        if (!face.image_uris) {
            return image_uris[normalizedType];
        }

        // return appropriate face image
        return face.image_uris[normalizedType];
    }

    public dehydrate() {
        const {
            id, image_uris, name, layout, mana_cost, cmc,
            type_line, set, set_name, prints_search_uri, oracle_text,
            legalities, colors, color_identity, card_faces, scryfall_uri, prices
        } = this._card;
        const primitive = {
            id,
            image_uris,
            name,
            layout,
            mana_cost,
            cmc,
            type_line,
            set,
            set_name,
            prints_search_uri,
            oracle_text,
            legalities,
            colors,
            color_identity,
            card_faces,
            scryfall_uri,
            prices
        };
        deleteEmpty(primitive, true);
        return primitive;
    }

}
