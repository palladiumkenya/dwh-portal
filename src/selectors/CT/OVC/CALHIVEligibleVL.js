import { createSelector } from 'reselect';

const filtered = state => state.filters.filtered;
const listFiltered = state => state.CALHIVEligibleVL.listFiltered;
const listUnfiltered = state => state.CALHIVEligibleVL.listUnfiltered;

export const getCALHIVEligibleVL = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return list;
    }
);
