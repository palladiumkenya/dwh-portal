import { createSelector } from 'reselect';

const filtered = state => state.filters.filtered;
const listFiltered = state => state.otzEnrollmentAmongAlhivOnArtByAge.listFiltered;
const listUnfiltered = state => state.otzEnrollmentAmongAlhivOnArtByAge.listUnfiltered;

export const getOtzEnrollmentAmongAlHivOnArtByAge = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const arrayVal = list.map(val => ({
            y: Math.round(val.Percentage),
            text: val.TXCurr,
            ageGroup: val.ageGroup,
            TXCurr: val.TXCurr,
        }));

        return arrayVal;
    }
);


