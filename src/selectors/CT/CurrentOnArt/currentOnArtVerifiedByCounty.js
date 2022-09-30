import { createSelector } from 'reselect';

const listUnfiltered = state => state.currentOnArtVerifiedByCounty.listUnfiltered;
const listFiltered = state => state.currentOnArtVerifiedByCounty.listFiltered;
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
            currentOnArt.push(list[i].NumNupi);
        }

        return { counties, currentOnArt }
    }
);