import { createSelector } from 'reselect';

const listUnfiltered = state => state.currentOnArtVerifiedByPartner.listUnfiltered;
const listFiltered = (state) =>
    state.currentOnArtVerifiedByPartner.listFiltered;
const filtered = state => state.filters.filtered;

export const getCurrentOnArtByPartner = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const partners = [];
        const currentOnArt = [];
        console.log(list)
        for(let i = 0; i < list.length; i++) {
            if (!list[i].CTPartner) {
                continue;
            }
            partners.push(list[i].CTPartner.toUpperCase());
            currentOnArt.push(list[i].NumNupi);
        }

        return { partners, currentOnArt }
    }
);