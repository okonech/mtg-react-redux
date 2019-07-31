import { Card } from 'scryfall-sdk';

export function subset(card: Card) {
    const {
        id, image_uris, name, layout, mana_cost, cmc,
        type_line, set, set_name, set_search_uri, oracle_text,
        legalities, colors, color_identity, card_faces
    } = card;

    const sub = {
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
    deleteEmpty(sub, true);
    return sub;
}

function deleteEmpty(test: object, recurse: boolean) {
    for (const i in test) {
        if (test[i] === null || test[i] === undefined) {
            delete test[i];
        } else if (recurse && typeof test[i] === 'object') {
            deleteEmpty(test[i], recurse);
        }
    }
}
