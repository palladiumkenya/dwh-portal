import { createSelector } from 'reselect';

const filtered = state => state.filters.filtered;
const listFiltered = state => state.otzEnrollmentAmongAlhivOnArtByCounty.listFiltered;
const listUnfiltered = state => state.otzEnrollmentAmongAlhivOnArtByCounty.listUnfiltered;

export const getOtzEnrollmentAmongAlHivOnArtByCounty = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;

        const arrayVal = list.map(val => ({
            y: Math.round(val.Percentage),
            text: val.TXCurr,
            County: val.County,
            TXCurr: val.TXCurr,
        }));

        arrayVal.sort((a, b) => {
            return b.y - a.y;
        });

        return arrayVal;
    }
);


