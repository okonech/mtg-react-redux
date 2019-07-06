
export async function getCards(cards: string[]): Promise<ScryfallCollectionCard[]> {
    const batches = await Promise.all(chunk(cards, 50).map((chunks) => search(chunks)));
    const jsonBatches = await Promise.all(batches.map((res) => res.json()));
    return [].concat.apply([], jsonBatches.map((json) => json.data));
}

function chunk(arr: string[], len: number): string[][] {
    const chunks = [];
    let i = 0;
    const n = arr.length;
    while (i < n) {
        chunks.push(arr.slice(i, i += len));
    }
    return chunks;
}

export interface ScryfallCollectionCard {
    cmc: number;
    collector_number: string;
    color_identity: color[];
    colors: color[];
    full_art: boolean;
    name: string;
    id: string;
    mana_cost: string;
    image_uris?: ImageUris;
    card_faces?: Array<{
        colors: color[];
        image_uris: ImageUris;
        mana_cost: string;
        name: string;
    }>;
    border_color: string;
    type_line: string;
    oracle_text: string;
}

export type color = 'W' | 'U' | 'B' | 'R' | 'G';

interface ImageUris {
    small: string;
    normal: string;
    png: string;
    art_crop: string;
}

// make scryfall collection post
function search(cards: string[]) {

    return fetch(
        'https://api.scryfall.com/cards/collection',
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With, Accept',
                'Access-Control-Allow-Methods': '*'
            },
            method: 'POST',
            body: JSON.stringify({
                identifiers: cards.map((card) => ({ name: card }))
            })
        });
}
