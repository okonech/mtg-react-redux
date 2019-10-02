import { CardModelImpl, cardModelsMap, CardPrimitive } from './Card';
import { InstanceMemoizerImpl } from './InstanceMaps';

export interface GameCardPrimitive {
    id: string;
    dbId: string;
    tapped: boolean;
    flipped: boolean;
    controller: string;
    owner: string;
    x: number;
    y: number;
}


interface GameCardModel {
    /**
     * Id unique to local game
     */
    readonly id: string;

    /**
     * Scryfall id
     */
    readonly dbId: string;

    readonly tapped: boolean;
    readonly flipped: boolean;

    readonly controller: string;
    readonly owner: string;

    /**
     * Coordinates in zone
     */
    readonly x: number;
    readonly y: number;

    readonly cardData: CardModelImpl;

    dehydrate(): GameCardPrimitive;
}

export interface GameCardConstructorArgs {
    gameCard: GameCardPrimitive;
    card: CardPrimitive;
}

export class GameCardModelImpl implements GameCardModel {

    private _gameCard: GameCardPrimitive;
    private _card: CardModelImpl;

    constructor(args: GameCardConstructorArgs) {
        this._gameCard = args.gameCard;
        this._card = cardModelsMap.getModel(args.card);
    }

    get id() {
        return this._gameCard.id;
    }

    get dbId() {
        return this._gameCard.dbId;
    }

    get tapped() {
        return this._gameCard.tapped;
    }

    get flipped() {
        return this._gameCard.flipped;
    }

    get controller() {
        return this._gameCard.controller;
    }

    get owner() {
        return this._gameCard.owner;
    }

    get x() {
        return this._gameCard.x;
    }

    get y() {
        return this._gameCard.y;
    }

    get cardData() {
        return this._card;
    }

    public dehydrate() {
        return this._gameCard;
    }

}

export const gameCardModelsMap = new InstanceMemoizerImpl<GameCardConstructorArgs, GameCardModelImpl>(GameCardModelImpl);
