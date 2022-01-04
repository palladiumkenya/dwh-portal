import { createSelector } from 'reselect';

const filtered = state => state.filters.filtered;
const listFiltered = state => state.OvcOverallCALHIV.listFiltered;
const listUnfiltered = state => state.OvcOverallCALHIV.listUnfiltered;

export const getOvcOverallCALHIV = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return list;
    }
);
