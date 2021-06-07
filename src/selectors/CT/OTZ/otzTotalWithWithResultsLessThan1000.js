import { createSelector } from 'reselect';

const filtered = state => state.filters.filtered;
const listFiltered = state => state.otzTotalWithWithResultsLessThan1000.listFiltered;
const listUnfiltered = state => state.otzTotalWithWithResultsLessThan1000.listUnfiltered;

export const getOtzTotalWithVlResultsLessThan1000 = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return list;
    }
);
