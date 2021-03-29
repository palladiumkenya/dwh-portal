import { createSelector } from 'reselect';

const listUnfiltered = state => state.medianTimeToArtStartByYear.listUnfiltered;
const listFiltered = state => state.medianTimeToArtStartByYear.listFiltered;
const filtered = state => state.filters.filtered;

export const getMedianTimeToArtStartByYear = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        let years = [];
        let times = [];

        for(let i = 0; i < list.length; i++) {
            years.push(list[i].StartYr);
            times.push(parseInt(list[i].medianTime, 10));
        }

        return { years, times };
    }
);
