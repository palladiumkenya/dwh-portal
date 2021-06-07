import { createSelector } from 'reselect';

const filtered = state => state.filters.filtered;
const listFiltered = state => state.otzVlUptakeAmongAlHivEnrolledInOtzByAge.listFiltered;
const listUnfiltered = state => state.otzVlUptakeAmongAlHivEnrolledInOtzByAge.listUnfiltered;

export const getOtzVlUptakeAmongAlhivEnrolledInOtzByAge = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;

        const arrayVal = list.map(val => ({
            y: Math.round(val.vl_uptake_percent),
            text: 'lastVL: ' + val.lastVL + ' eligibleVL: ' + val.eligibleVL,
            ageGroup: val.ageGroup
        }));

        return arrayVal;
    }
);
