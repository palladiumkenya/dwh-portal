import { createSelector } from 'reselect';

const filtered = state => state.filters.filtered;
const listFiltered = state => state.CALHIVTotalOnMMD.listFiltered;
const listUnfiltered = state => state.CALHIVTotalOnMMD.listUnfiltered;

export const getCALHIVTotalOnMMD = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        return filtered ? listFiltered : listUnfiltered;
    }
);
