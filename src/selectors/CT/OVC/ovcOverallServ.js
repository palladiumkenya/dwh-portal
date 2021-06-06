import { createSelector } from 'reselect';

const filtered = state => state.filters.filtered;
const listFiltered = state => state.ovcOverallServ.listFiltered;
const listUnfiltered = state => state.ovcOverallServ.listUnfiltered;

export const getOvcOverallServ = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return list;
    }
);
