import { createSelector } from 'reselect';
import { AppState } from '../reducers';

const getSelected = (state: AppState) => state.select;

export const selectedSelector = createSelector(
    [getSelected],
    (selectedState) => (
        selectedState.selected
    )
);
