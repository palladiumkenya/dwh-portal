import { createSelector } from 'reselect';

const filtered = state => state.filters.filtered;
const listFiltered = state => state.otzVlSuppressionBySex.listFiltered;
const listUnfiltered = state => state.otzVlSuppressionBySex.listUnfiltered;

export const getOtzVlSuppressionBySex = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;

    }
);
