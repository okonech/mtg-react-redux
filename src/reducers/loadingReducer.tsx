// Single boolean loading value to be toggled

interface LoadingAction {
  type: string;
}

export default function cardsReducer (state = false, action: LoadingAction) {
    switch (action.type) {
        case 'REQUEST_PLAYER':
            return true;
        case 'RECEIVE_PLAYER':
            return false;
        default:
            return state;
    }
}