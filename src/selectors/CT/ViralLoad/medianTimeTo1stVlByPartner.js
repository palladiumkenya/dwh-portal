import { createSelector } from 'reselect';

const listUnfiltered = state => state.medianTimeTo1stVlByPartner.listUnfiltered;
const listFiltered = state => state.medianTimeTo1stVlByPartner.listFiltered;
const filtered = state => state.filters.filtered;

export const getMedianTimeTo1stVlByPartner = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        let partners = [];
        let times = [];

        for(let i = 0; i < list.length; i++) {
            partners.push(list[i].Partner);
            times.push(list[i].medianTime);
        }

        return { partners, times };
    }
);
