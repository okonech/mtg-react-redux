import { ActionType, createStandardAction } from 'typesafe-actions';

export const openContextMenu = createStandardAction('click/OPEN_CONTEXT_MENU')();
export const closeContextMenu = createStandardAction('click/CLOSE_CONTEXT_MENU')();

export type ClickAction = ActionType<typeof openContextMenu> | ActionType<typeof closeContextMenu>;
