import { createSelector } from 'reselect';

const filtered = state => state.filters.filtered;
const listFiltered = state => state.OvcTotalOnMMD.listFiltered;
const listUnfiltered = state => state.OvcTotalOnMMD.listUnfiltered;

export const getOvcTotalOnMMD = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return list;
    }
);
