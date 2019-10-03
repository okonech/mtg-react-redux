import { CardModel, cardModelsMap, CardPrimitive, GameCardPrimitive } from '@mtg-react-redux/models';
import { cardsSelector, CardsState } from '../reducers/cardsReducer';
import { CATEGORIES } from '../components/deck-editor/DeckEditor';
import { DeckEditorRow, DeckEditorState } from '../reducers/deckEditorReducer';

export const placeholderPrimitive = {
    card: {
        id: 'placeholder-data',
        image_uris: {
            small: '/images/cardback.jpg',
            normal: '/images/cardback.jpg',
            large: '/images/cardback.jpg',
            png: '/images / cardback.jpg',
            art_crop: '/images / cardback.jpg',
            border_crop: '/images/cardback.jpg'
        },
        name: '',
        layout: 'normal'
    } as CardPrimitive,
    gameCard: {
        id: 'placeholder',
        dbId: 'placeholder-data',
        tapped: false,
        flipped: false,
        controller: 'curr-player',
        owner: 'curr-player',
        x: 0,
        y: 0
    } as GameCardPrimitive
};

export function getModelsForCards(cardList: DeckEditorState['cards'], cardData: CardsState, board: 'sideboard' | 'main' | 'both' = 'both') {
    return cardsSelector(cardData, Object.keys(cardList).filter((id) => {
        switch (board) {
            case 'both':
                return true;
            case 'main':
                return cardList[id].quantity > 0;
            case 'sideboard':
                return cardList[id].sideboard > 0;
            default:
                throw new Error(`Unknown board type ${board}`);
        }
    })).map((card) => cardModelsMap.getModel(card));
}

export function groupCardsByCategory(cards: CardModel[], category: keyof typeof CATEGORIES) {
    const res: { [key: string]: CardModel[] } = cards.reduce((acc: { [key: string]: CardModel[] }, card) => {
        let groupKey: string;
        switch (category) {
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
                groupKey = CardModel.colorType(card.colorIdentity);
                break;
            case 'setName':
                groupKey = card.setName;
                break;
            default:
                throw new Error(`Unkown grouping ${category}`);
        }
        if (!acc[groupKey]) {
            acc[groupKey] = [];
        }
        acc[groupKey].push(card);
        return acc;
    }, {});
    return res;
}

export function cardListToGroupedModels(cardList: DeckEditorState['cards'], cardData: CardsState, category: keyof typeof CATEGORIES) {
    const main = Object.keys(cardList).reduce((acc, curr) => {
        if (cardList[curr].quantity > 0) {
            acc.push(curr);
        }
        return acc;
    }, []);

    const models = cardsSelector(cardData, main).map((card) => cardModelsMap.getModel(card));
    return groupCardsByCategory(models, category);
}

export function cardListToGroupedModelsSb(cardList: DeckEditorState['cards'], cardData: CardsState, category: keyof typeof CATEGORIES) {
    const sideboard = Object.keys(cardList).reduce((acc, curr) => {
        if (cardList[curr].sideboard > 0) {
            acc.push(curr);
        }
        return acc;
    }, []);
    const sbModels = cardsSelector(cardData, sideboard).map((card) => cardModelsMap.getModel(card));
    const groups = cardListToGroupedModels(cardList, cardData, category);
    return sbModels.length > 0 ? {
        ...groups,
        Sideboard: sbModels
    } : groups;
}

export function rowQuantity(row: DeckEditorRow, groupName: string) {
    return groupName === 'Sideboard' ? row.sideboard : row.quantity;
}

export function groupQuantitySum(cardList: DeckEditorRow[], groupName: string) {
    return cardList.map((row) => rowQuantity(row, groupName)).reduce((acc, q) => acc + q, 0);
}
