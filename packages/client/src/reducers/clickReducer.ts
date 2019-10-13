import { ClickAction, closeContextMenu, openContextMenu } from '../actions/clickActions';
import { getType } from 'typesafe-actions';
import produce from 'immer';

// Context menu

export interface ClickState {
    contextMenuOpen: boolean;
}

const defaultState = {
    contextMenuOpen: false
};

export default function clickReducer(state: ClickState = defaultState, action: ClickAction): ClickState {
    return produce(state, (draft) => {
        switch (action.type) {
            case getType(openContextMenu):
                draft.contextMenuOpen = true;
                break;
            case getType(closeContextMenu):
                draft.contextMenuOpen = false;
                break;
            default:
                break;
        }
    });
}
