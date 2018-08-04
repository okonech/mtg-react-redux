import {initialState} from '../reduxDefs/initialState';
import {Game} from '../reduxDefs/stateInterface';

export default function reducer(
state: Game = initialState.game,
action: any) {

    switch (action.type) {
      case 'N/A': {
          // drag drop from container to container
          // handles dnd between player items
          console.log(action);
          return {...state};
      }
    }

    return state;
}