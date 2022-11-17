import { createSelector } from 'reselect';

const listUnfiltered = (state) => state.currentOnArt.listUnfiltered;
const listFiltered = (state) => state.currentOnArt.listFiltered;
const filtered = state => state.filters.filtered;

export const getCurrentOnArt = createSelector(
    [
        listUnfiltered,
        listFiltered,
        filtered,
    ],
    (
        listUnfiltered,
        listFiltered,
        filtered
    ) => {
        const list = filtered ? listFiltered : listUnfiltered;

        return list.TXCURR;
    }
);