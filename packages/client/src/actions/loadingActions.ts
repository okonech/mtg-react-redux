import { ActionType, createStandardAction } from 'typesafe-actions';

export const loading = createStandardAction('loading/SET_LOADING')();
export const loaded = createStandardAction('loading/SET_LOADED')();

export type LoadingAction = ActionType<typeof loading> | ActionType<typeof loaded>;
