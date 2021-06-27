import { createSelector } from 'reselect';

const filtered = state => state.filters.filtered;
const listFiltered = state => state.otzVlSuppressionByAge.listFiltered;
const listUnfiltered = state => state.otzVlSuppressionByAge.listUnfiltered;

export const getOtzVlSuppressionByAge = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;

    }
);
