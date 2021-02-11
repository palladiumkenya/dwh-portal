import { createSelector } from 'reselect';

const listUnfiltered = state => state.newOnArtTrends.listUnfiltered;
const listFiltered = state => state.newOnArtTrends.listFiltered;
const filtered = state => state.filters.filtered;

export const getNewOnArtByYear = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        let years = [];
        let txNew = [];

        for(let i = 0; i < list.length; i++) {
            if (!list[i].year) {
                continue;
            }
            if(years.indexOf(list[i].year) === -1){
                years.push(list[i].year);
            }
        }

        for(let i = 0; i < years.length; i++) {
            txNew[i] = 0;
        }

        for(let i = 0; i < list.length; i++) {
            if (!list[i].txNew) {
                continue;
            }
            if (!list[i].year) {
                continue;
            }
            let index = years.indexOf(list[i].year);
            if(index === -1 ) {
                continue;
            }
            txNew[index] = txNew[index] + parseInt(list[i].txNew, 10);
        }
        
        return { years, txNew };
    }
);
