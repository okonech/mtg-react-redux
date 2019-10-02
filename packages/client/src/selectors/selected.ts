import { AppState } from '../reducers';
import { createSelector } from 'reselect';

const getSelected = (state: AppState) => state.select;

export const selectedSelector = createSelector(
    [getSelected],
    (selectedState) => (
        selectedState.selected
    )
);
