import { createSelector } from 'reselect';

const listUnfiltered = (state) => state.prepScreeningOutcome.listUnfiltered;
const listFiltered = (state) => state.prepScreeningOutcome.listFiltered;

const filtered = (state) => state.filters.filtered;


export const getPrepScreeningOutcome = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return list[0];
    }
);

