import { ActionType, createStandardAction } from 'typesafe-actions';

export const selectCards = createStandardAction('select/SELECT_CARDS')<string[]>();

export type SelectAction = ActionType<typeof selectCards>;
