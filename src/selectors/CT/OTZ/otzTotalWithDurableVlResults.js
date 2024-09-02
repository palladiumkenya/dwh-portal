import { createSelector } from 'reselect';

const filtered = state => state.filters.filtered;
const listFiltered = state => state.otzTotalWithDurableVlResults.listFiltered;
const listUnfiltered = state => state.otzTotalWithDurableVlResults.listUnfiltered;

export const getOtzTotalWithDurableVlResults = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        return filtered ? listFiltered : listUnfiltered;
    }
);
