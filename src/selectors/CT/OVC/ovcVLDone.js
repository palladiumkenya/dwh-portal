import { createSelector } from 'reselect';

const filtered = state => state.filters.filtered;
const listFiltered = state => state.ovcVLDone.listFiltered;
const listUnfiltered = state => state.ovcVLDone.listUnfiltered;

export const getOVCVLDone = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return list;
    }
);
