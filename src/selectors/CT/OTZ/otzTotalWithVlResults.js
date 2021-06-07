import { createSelector } from 'reselect';

const filtered = state => state.filters.filtered;
const listFiltered = state => state.otzTotalWithVlResults.listFiltered;
const listUnfiltered = state => state.otzTotalWithVlResults.listUnfiltered;

export const getOtzTotalWithVlResults = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return list;
    }
);
