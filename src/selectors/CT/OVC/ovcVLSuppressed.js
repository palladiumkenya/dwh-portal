import { createSelector } from 'reselect';

const filtered = state => state.filters.filtered;
const listFiltered = state => state.ovcVLSuppressed.listFiltered;
const listUnfiltered = state => state.ovcVLSuppressed.listUnfiltered;

export const getOVCVLSuppressed = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return list;
    }
);
