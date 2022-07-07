import { createSelector } from 'reselect';
import moment from 'moment';

const listUnfiltered = state => state.currOnArtByFacilityKHIS.listUnfiltered;
const listFiltered = state => state.currOnArtByFacilityKHIS.listFiltered;
const filtered = state => state.filters.filtered;


export const getCurrOnArtByFacilityPartnerKHIS = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;


        return {
            data: list
        };
    }
);
