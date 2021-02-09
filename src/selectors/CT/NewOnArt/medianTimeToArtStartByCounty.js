import { createSelector } from 'reselect';

const listUnfiltered = state => state.medianTimeToArtStartByCounty.listUnfiltered;
const listFiltered = state => state.medianTimeToArtStartByCounty.listFiltered;
const filtered = state => state.filters.filtered;

export const getMedianTimeToArtStartByCounty = createSelector(
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
