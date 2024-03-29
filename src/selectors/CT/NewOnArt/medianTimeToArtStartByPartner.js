import { createSelector } from 'reselect';

const listUnfiltered = state => state.medianTimeToArtStartByPartner.listUnfiltered;
const listFiltered = state => state.medianTimeToArtStartByPartner.listFiltered;
const filtered = state => state.filters.filtered;

export const getMedianTimeToArtStartByPartner = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        let partners = [];
        let times = [];

        for(let i = 0; i < list.length; i++) {
            partners.push(list[i].partner);
            times.push(parseInt(list[i].medianTime, 10));
        }

        return { partners, times };
    }
);
