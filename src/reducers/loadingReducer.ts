import { LoadingAction } from '../actions/loadingActions';

// Single boolean loading value to be toggled

export type LoadingState = boolean;

export default function loadingReducer(state: LoadingState = true, action: LoadingAction): LoadingState {
    switch (action.type) {
        case 'LOADING':
            return true;
        case 'LOADED':
            return false;
        default:
            return state;
    }
}

export const loadingSelector = (state: LoadingState) => state;