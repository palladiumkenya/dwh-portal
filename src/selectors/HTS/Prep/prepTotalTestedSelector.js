import { createSelector } from 'reselect';

const listUnfiltered = (state) => state.prepTotalTested.listUnfiltered;
const listFiltered = (state) => state.prepTotalTested.listFiltered;

const filtered = (state) => state.filters.filtered;

export const getPrepTestTotal = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;

        return list.length > 0 ? list[0].TotalTested : 0;
    }
);
