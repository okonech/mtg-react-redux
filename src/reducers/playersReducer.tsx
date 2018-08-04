import {initialState} from '../reduxDefs/initialState';
import {Player} from '../reduxDefs/stateInterface';

export default function reducer(
state: Player[] = initialState.players,
action: any) {

    switch (action.type) {
      case 'PLAYERS_CARDS_DND': {
          // drag drop from container to container
          // handles dnd between player items
          console.log(action);
          return {...state};
      }
      case 'PLAYERS_ADD_PLAYER': {
          // add new players at the start of a game
          return state.concat(action.payload);
      }
    }

    return state;
}