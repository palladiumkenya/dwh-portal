import { createSelector } from 'reselect';

const filtered = state => state.filters.filtered;
const listFiltered = state => state.otzVlUptakeAmongAlHivEnrolledInOtzBySex.listFiltered;
const listUnfiltered = state => state.otzVlUptakeAmongAlHivEnrolledInOtzBySex.listUnfiltered;

export const getOtzVlUptakeAmongAlhivEnrolledInOtzBySex = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        return filtered ? listFiltered : listUnfiltered;
    }
);
