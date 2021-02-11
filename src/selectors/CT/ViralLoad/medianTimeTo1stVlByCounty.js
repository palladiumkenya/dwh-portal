import { createSelector } from 'reselect';

const listUnfiltered = state => state.medianTimeTo1stVlByCounty.listUnfiltered;
const listFiltered = state => state.medianTimeTo1stVlByCounty.listFiltered;
const filtered = state => state.filters.filtered;

export const getMedianTimeTo1stVlByCounty = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        let counties = [];
        let times = [];

        for(let i = 0; i < list.length; i++) {
            counties.push(list[i].county);
            times.push(parseInt(list[i].time, 10));
        }

        return { counties, times };
    }
);
