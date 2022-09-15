import { createSelector } from 'reselect';

// const listUnfiltered = [];
const listUnfiltered = (state) => state.newOnPrep.listUnfiltered;
const listFiltered = (state) => state.newOnPrep.listFiltered;
// const listFiltered = []
const filtered = state => state.filters.filtered;


export const getNewOnPrepTotal = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return list.length;
    }
);
