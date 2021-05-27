import { createSelector } from 'reselect';

const filtered = state => state.filters.filtered;
const listFiltered = state => state.otzVlUptakeAmongAlHivEnrolledInOtzByCounty.listFiltered;
const listUnfiltered = state => state.otzVlUptakeAmongAlHivEnrolledInOtzByCounty.listUnfiltered;

export const getOtzVlUptakeAmongAlhivEnrolledInOtzByCounty = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;

        const arrayVal = list.map(val => ({
            y: Math.round(val.vl_uptake_percent),
            text: 'lastVL: ' + val.lastVL + ' eligibleVL: ' + val.eligibleVL,
            County: val.County
        }));

        arrayVal.sort((a, b) => {
            return b.y - a.y;
        });

        return arrayVal;
    }
);
