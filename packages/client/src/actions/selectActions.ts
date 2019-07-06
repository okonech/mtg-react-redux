
export interface SelectCardsAction {
    type: 'SELECT_CARDS';
    payload: {
        cards: string[]
    };
}

export type selectCards = (cards: string[]) => SelectCardsAction;

export function selectCards(cards: string[]): SelectCardsAction {
    return {
        type: 'SELECT_CARDS',
        payload: {
            cards
        }
    };
}
