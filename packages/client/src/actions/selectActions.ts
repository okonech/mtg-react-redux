
export interface SelectCardsAction {
    type: 'SELECT_CARDS';
    payload: {
        cards: string[]
    };
}

export function selectCards(cards: string[]): SelectCardsAction {
    return {
        type: 'SELECT_CARDS',
        payload: {
            cards
        }
    };
}
