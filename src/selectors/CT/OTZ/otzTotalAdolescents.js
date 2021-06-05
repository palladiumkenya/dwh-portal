import { createSelector } from 'reselect';

const filtered = state => state.filters.filtered;
const listFiltered = state => state.otzTotalAdolescents.listFiltered;
const listUnfiltered = state => state.otzTotalAdolescents.listUnfiltered;

export const getOtzTotalAdolescents = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return list;
    }
);
