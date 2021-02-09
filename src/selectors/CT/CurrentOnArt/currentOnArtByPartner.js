import { createSelector } from 'reselect';

const listUnfiltered = state => state.currentOnArtByPartner.listUnfiltered;
const listFiltered = state => state.currentOnArtByPartner.listFiltered;
const filtered = state => state.filters.filtered;

export const getCurrentOnArtByPartner = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const partners = [];
        const currentOnArt = [];
        
        for(let i = 0; i < list.length; i++) {
            partners.push(list[i].CTPartner);
            currentOnArt.push(list[i].txCurr);
        }

        return { partners, currentOnArt }
    }
);