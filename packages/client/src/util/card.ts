import { CardPrimitive } from '@mtg-react-redux/models';

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
