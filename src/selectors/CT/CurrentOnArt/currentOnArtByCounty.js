import { createSelector } from 'reselect';

const listUnfiltered = state => state.currentOnArtByCounty.listUnfiltered;
const listFiltered = state => state.currentOnArtByCounty.listFiltered;
const filtered = state => state.filters.filtered;

export const getCurrentOnArtByCounty = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const counties = [];
        const currentOnArt = [];
        
        for(let i = 0; i < list.length; i++) {
            if (!list[i].County) {
                continue;
            }
            counties.push(list[i].County.toUpperCase());
            currentOnArt.push(list[i].txCurr);
        }

        return { counties, currentOnArt }
    }
);