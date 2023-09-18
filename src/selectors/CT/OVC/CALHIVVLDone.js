import { createSelector } from 'reselect';

const filtered = state => state.filters.filtered;
const listFiltered = state => state.CALHIVVLDone.listFiltered;
const listUnfiltered = state => state.CALHIVVLDone.listUnfiltered;

export const getCALHIVVLDone = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        return filtered ? listFiltered : listUnfiltered;
    }
);
