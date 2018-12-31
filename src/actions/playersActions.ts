import { Player } from '../reducers/playersReducer'

export interface PlayersAction {
  type: 'ADD_PLAYERS' | 'UPDATE_PLAYERS' | 'DELETE_PLAYERS';
  payload: {
    ids?: string[];
    items?: Player[];
  }
}

export function addPlayers(players: Player[]): PlayersAction {
  return {
    type: 'ADD_PLAYERS',
    payload: {
      items: players
    }
  };
}

export function updatePlayers(players: Player[]): PlayersAction {
  return {
    type: 'UPDATE_PLAYERS',
    payload: {
      items: players
    }
  };
}

export function deletePlayers(ids: string[]): PlayersAction {
  return {
    type: 'DELETE_PLAYERS',
    payload: {
      ids
    }
  };
}


interface PlayerZone {
  player: number;
  zone: string;
}

export function cardsDND(from: PlayerZone, to: PlayerZone, draggedCards: any[]) {
  return {
    type: 'PLAYERS_CARDS_DND',
    payload: {
      from,
      to,
      cards: draggedCards
    },
  };
}