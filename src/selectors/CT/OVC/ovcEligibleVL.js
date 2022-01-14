import { createSelector } from 'reselect';

const filtered = state => state.filters.filtered;
const listFiltered = state => state.ovcEligibleVL.listFiltered;
const listUnfiltered = state => state.ovcEligibleVL.listUnfiltered;

export const getOVCEligibleVL = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return list;
    }
);
