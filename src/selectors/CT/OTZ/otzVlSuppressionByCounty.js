import { createSelector } from 'reselect';

const filtered = state => state.filters.filtered;
const listFiltered = state => state.otzVlSuppressionByCounty.listFiltered;
const listUnfiltered = state => state.otzVlSuppressionByCounty.listUnfiltered;

export const getOtzVlSuppressionByCounty = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;

    }
);
