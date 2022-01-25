import { createSelector } from 'reselect';

const filtered = state => state.filters.filtered;
const listFiltered = state => state.OvcIIT.listFiltered;
const listUnfiltered = state => state.OvcIIT.listUnfiltered;

export const getOVCIIT = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return list;
    }
);
