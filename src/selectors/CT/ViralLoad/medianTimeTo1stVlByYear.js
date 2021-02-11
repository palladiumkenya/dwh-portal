import { createSelector } from 'reselect';

const listUnfiltered = state => state.medianTimeTo1stVlByYear.listUnfiltered;
const listFiltered = state => state.medianTimeTo1stVlByYear.listFiltered;
const filtered = state => state.filters.filtered;

export const getMedianTimeTo1stVlByYear = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        let years = [];
        let times = [];

        for(let i = 0; i < list.length; i++) {
            years.push(list[i].year);
            times.push(parseInt(list[i].time, 10));
        }

        return { years, times };
    }
);
