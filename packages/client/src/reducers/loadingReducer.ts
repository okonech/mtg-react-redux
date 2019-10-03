import { getType } from 'typesafe-actions';
import { loaded, loading, LoadingAction } from '../actions/loadingActions';

// Single boolean loading value to be toggled

export type LoadingState = boolean;

export default function loadingReducer(state: LoadingState = true, action: LoadingAction): LoadingState {
    switch (action.type) {
        case getType(loading):
            return true;
        case getType(loaded):
            return false;
        default:
            return state;
    }
}

export const loadingSelector = (state: LoadingState) => state;
