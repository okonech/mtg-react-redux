import { CardModel, CardPrimitive } from '@mtg-react-redux/models';
import { CATEGORIES } from '../routes/DeckEditor';

export const placeholderPrimitive: CardPrimitive = {
    id: 'placeholder',
    image_uris: {
        small: '/images/cardback.jpg',
        normal: '/images/cardback.jpg',
        large: '/images/cardback.jpg',
        png: '/images / cardback.jpg',
        art_crop: '/images / cardback.jpg',
        border_crop: '/images/cardback.jpg'
    },
    name: '',
    layout: 'normal',
    mana_cost: '0',
    cmc: 0,
    set: '',
    set_name: '',
    set_search_uri: '',
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
        'duel': 'not_legal',
        'frontier': 'not_legal',
        '1v1': 'not_legal'
    },
    colors: [],
    color_identity: []
};

export function groupCardsByType(cards: CardModel[], type: keyof typeof CATEGORIES) {
    const res: { [key: string]: CardModel[] } = cards.reduce((acc: { [key: string]: CardModel[] }, card) => {
        let groupKey: string;
        switch (type) {
            case 'type':
                groupKey = card.types()[0];
                break;
            case 'cmc':
                groupKey = card.cmc().toString();
                break;
            case 'color':
                groupKey = CardModel.colorType(card.colors());
                break;
            case 'colorId':
                groupKey = CardModel.colorType(card.colorIdentity());
                break;
            default:
                throw new Error(`Unkown grouping ${type}`);
        }
        if (!acc[groupKey]) {
            acc[groupKey] = [];
        }
        acc[groupKey].push(card);
        return acc;
    }, {});
    return res;
}
