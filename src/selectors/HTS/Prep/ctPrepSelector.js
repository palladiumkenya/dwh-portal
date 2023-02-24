import { createSelector } from 'reselect';

const listUnfiltered = (state) => state.ctPrep.listUnfiltered;
const listFiltered = (state) => state.ctPrep.listFiltered;

const filtered = (state) => state.filters.filtered;


export const getCTPrepTotal = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return list.length > 0 ? list[0].PrepCT : 0;
    }
);

