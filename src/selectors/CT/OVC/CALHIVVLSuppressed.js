import { createSelector } from 'reselect';

const filtered = state => state.filters.filtered;
const listFiltered = state => state.CALHIVVLSuppressed.listFiltered;
const listUnfiltered = state => state.CALHIVVLSuppressed.listUnfiltered;

export const getCALHIVVLSuppressed = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return list;
    }
);
