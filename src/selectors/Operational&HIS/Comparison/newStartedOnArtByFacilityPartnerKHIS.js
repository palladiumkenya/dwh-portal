import { createSelector } from 'reselect';

const listUnfiltered = state => state.newOnArtByFacilityKHIS.listUnfiltered;
const listFiltered = state => state.newOnArtByFacilityKHIS.listFiltered;
const filtered = state => state.filters.filtered;


export const getNewOnArtByFacilityPartnerKHIS = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;

        return {
            data: list
        };
    }
);
