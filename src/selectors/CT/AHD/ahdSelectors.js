import { createSelector } from 'reselect';

const listUnfiltered = state => state.ahdScreening.listUnfiltered;
const listFiltered = state => state.ahdScreening.listFiltered;
const filtered = state => state.filters.filtered;


export const getAHDIndicators = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        console.log(listUnfiltered, listFiltered)
        return filtered ? listFiltered : listUnfiltered;
    }
)
