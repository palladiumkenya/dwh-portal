import { createSelector } from 'reselect';

const listUnfiltered = (state) => state.prepDiscontinuation.listUnfiltered;
const listFiltered = (state) => state.prepDiscontinuation.listFiltered;
const filtered = state => state.filters.filtered;


export const getPrEPDiscontinuation = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return list.PrepDiscontinuations;
    }
);
