import { createSelector } from 'reselect';

const listUnfiltered = state => state.sixMonthRetention.listUnfiltered;
const listFiltered = state => state.sixMonthRetention.listFiltered;
const filtered = state => state.filters.filtered;

export const getSixMonthRetention = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const yearCategories = [2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021];
        let data = [];
        for(let i = 0; i < yearCategories.length; i++) {
            data[i] = 0;
        }
        for(let i = 0; i < list.length; i++) {
            let yearIndex = yearCategories.indexOf(list[i].year);
            if(yearIndex === -1 ) {
                continue;
            }
            data[yearIndex] = data[yearIndex] + parseInt(list[i].retention);
        }
        return { yearCategories, data };
    }
);
