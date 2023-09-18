import { createSelector } from 'reselect';

const filtered = state => state.filters.filtered;
const listFiltered = state => state.CALHIVOnDTG.listFiltered;
const listUnfiltered = state => state.CALHIVOnDTG.listUnfiltered;

export const getCALHIVOnDTG = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        return filtered ? listFiltered : listUnfiltered;
    }
);
