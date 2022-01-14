import { createSelector } from 'reselect';

const filtered = state => state.filters.filtered;
const listFiltered = state => state.OvcCurrentOnArt.listFiltered;
const listUnfiltered = state => state.OvcCurrentOnArt.listUnfiltered;

export const getOvcCurrentOnArt = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return list;
    }
);
