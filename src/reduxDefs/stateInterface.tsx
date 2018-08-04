export interface State {
    players: Player[];
    game: Game;
}

export interface Player {
    name: string;
    life: number;
    poison: number;
    library: Card[];
    hand: Card[];
    battlefield: Card[];
    graveyard: Card[];
    exile: Card[];
}

export interface Card {
    id: number;
    name: string;
}

export interface Game {
    turn: number;
    currentPlayer: string|undefined;
}

