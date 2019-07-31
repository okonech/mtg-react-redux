import { Card } from 'scryfall-sdk';
import { deleteEmpty } from './util/objects';

export type CardPrimitive = Pick<Card,
    'id' | 'image_uris' | 'name' | 'layout' | 'mana_cost' | 'cmc' |
    'type_line' | 'set' | 'set_name' | 'set_search_uri' | 'oracle_text' |
    'legalities' | 'colors' | 'color_identity' | 'card_faces'
>;

type Types = 'Artifact' | 'Conspiracy' | 'Creature' | 'Enchantment' | 'Instant' |
    'Land' | 'Phenomenon' | 'Plane' | 'Planeswalker' | 'Scheme' | 'Sorcery' | 'Tribal' | 'Vanguard';

type ImageSize = 'small' | 'medium' | 'large';

interface CardModel {
    readonly id: CardPrimitive['id'];
    readonly name: CardPrimitive['name'];
    readonly cmc: CardPrimitive['cmc'];
    readonly manaCost: CardPrimitive['mana_cost'];
    readonly layout: CardPrimitive['layout'];
    readonly typeLine: CardPrimitive['type_line'];
    readonly set: CardPrimitive['set'];
    readonly setName: CardPrimitive['set_name'];
    readonly setSearchUri: CardPrimitive['set_search_uri'];
    readonly oracleText: CardPrimitive['oracle_text'];
    readonly legalities: CardPrimitive['legalities'];
    readonly colors: CardPrimitive['colors'];
    readonly colorIdentity: CardPrimitive['color_identity'];

    types(): Types[];
    // get front by default, flipped side optionally. Falls back to front
    imageUrl(type: ImageSize, flipped?: boolean): string;

    // return primitive
    dehydrate(): CardPrimitive;
}

export class CardModelImpl implements CardModel {

    constructor(private _card: CardPrimitive | Card) { }

    get id() {
        return this._card.id;
    }

    get name() {
        return this._card.name;
    }

    get cmc() {
        return this._card.cmc;
    }

    get manaCost() {
        return this._card.mana_cost;
    }

    get layout() {
        return this._card.layout;
    }

    get typeLine() {
        return this._card.type_line;
    }

    get set() {
        return this._card.set;
    }

    get setName() {
        return this._card.set_name;
    }

    get setSearchUri() {
        return this._card.set_search_uri;
    }

    get oracleText() {
        return this._card.oracle_text;
    }

    get legalities() {
        return this._card.legalities;
    }

    get colors() {
        return this._card.colors;
    }

    get colorIdentity() {
        return this._card.color_identity;
    }

    public types() {
        // parse type line for an enum of types
        return ['Artifact' as Types];
    }

    public imageUrl(type: ImageSize, flipped?: boolean) {
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
