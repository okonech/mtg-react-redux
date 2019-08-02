import { Card } from 'scryfall-sdk';
import CardModelError from './CardModelError';
import { deleteEmpty } from './util/objects';

export type CardPrimitive = Pick<Card,
    'id' | 'image_uris' | 'name' | 'layout' | 'mana_cost' | 'cmc' |
    'type_line' | 'set' | 'set_name' | 'set_search_uri' | 'oracle_text' |
    'legalities' | 'colors' | 'color_identity' | 'card_faces'
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
    id(flipped: boolean): CardPrimitive['id'];
    name(flipped: boolean): CardPrimitive['name'];
    cmc(flipped: boolean): CardPrimitive['cmc'];
    manaCost(flipped: boolean): CardPrimitive['mana_cost'];
    layout(flipped: boolean): CardPrimitive['layout'];
    typeLine(flipped: boolean): CardPrimitive['type_line'];
    set(flipped: boolean): CardPrimitive['set'];
    setName(flipped: boolean): CardPrimitive['set_name'];
    setSearchUri(flipped: boolean): CardPrimitive['set_search_uri'];
    oracleText(flipped: boolean): CardPrimitive['oracle_text'];
    legalities(flipped: boolean): CardPrimitive['legalities'];
    colors(flipped: boolean): CardPrimitive['colors'];
    colorIdentity(flipped: boolean): CardPrimitive['color_identity'];

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

    public id(flipped = false) {
        return this._card.id;
    }

    public name(flipped = false) {
        return this._card.name;
    }

    public cmc(flipped = false) {
        return this._card.cmc;
    }

    public manaCost(flipped = false) {
        return this._card.mana_cost;
    }

    public layout(flipped = false) {
        return this._card.layout;
    }

    public types(flipped = false) {
        const type = this.typeLine(flipped);
        // parse type line for an enum of types
        return TYPES.filter((searchType) => type.includes(searchType));
    }

    public typeLine(flipped = false) {
        return this.typeLineGuts(this._card, flipped);
    }

    private typeLineGuts(card: CardPrimitive | CardPrimitive['card_faces'][number], flipped = false): string {
        if (card.type_line) {
            return card.type_line;
        }
        if ((card as CardPrimitive).card_faces) {
            return this.typeLineGuts((card as CardPrimitive).card_faces[flipped ? 1 : 0]);
        }
        throw new CardModelError('no type line found');
    }

    public set(flipped = false) {
        return this._card.set;
    }

    public setName(flipped = false) {
        return this._card.set_name;
    }

    public setSearchUri(flipped = false) {
        return this._card.set_search_uri;
    }

    public oracleText(flipped = false) {
        return this._card.oracle_text;
    }

    public legalities(flipped = false) {
        return this._card.legalities;
    }

    public colors(flipped = false) {
        return this._card.colors;
    }

    public colorIdentity(flipped = false) {
        return this._card.color_identity;
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
        const face = card_faces[flipped ? 0 : 1];

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
            type_line, set, set_name, set_search_uri, oracle_text,
            legalities, colors, color_identity, card_faces
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
            set_search_uri,
            oracle_text,
            legalities,
            colors,
            color_identity,
            card_faces
        };
        deleteEmpty(primitive, true);
        return primitive;
    }

}
