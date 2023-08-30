import { createSelector } from 'reselect';

const filtered = state => state.filters.filtered;
const listFiltered = state => state.OvcCALHIVByGender.listFiltered;
const listUnfiltered = state => state.OvcCALHIVByGender.listUnfiltered;

export const getOvcCALHIVByGender = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        return filtered ? listFiltered : listUnfiltered;
    }
);
