import { createSelector } from 'reselect';

const filtered = state => state.filters.filtered;
const listFiltered = state => state.OvcTotalOnTld.listFiltered;
const listUnfiltered = state => state.OvcTotalOnTld.listUnfiltered;

export const getOvcTotalOnTld = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return list;
    }
);
