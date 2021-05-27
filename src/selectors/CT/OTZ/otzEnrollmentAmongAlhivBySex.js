import { createSelector } from 'reselect';

const filtered = state => state.filters.filtered;
const listFiltered = state => state.otzEnrollmentAmongAlhivOnArtBySex.listFiltered;
const listUnfiltered = state => state.otzEnrollmentAmongAlhivOnArtBySex.listUnfiltered;

export const getOtzEnrollmentAmongAlHivOnArtBySex = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        return filtered ? listFiltered : listUnfiltered;
    }
);


