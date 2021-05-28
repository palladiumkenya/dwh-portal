import { createSelector } from 'reselect';

const filtered = state => state.filters.filtered;
const listFiltered = state => state.otzEnrollmentAmongAlhivOnArtByPartner.listFiltered;
const listUnfiltered = state => state.otzEnrollmentAmongAlhivOnArtByPartner.listUnfiltered;

export const getOtzEnrollmentAmongAlHivOnArtByPartner = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;

        const arrayVal = list.map(val => ({
            y: Math.round(val.Percentage),
            text: val.TXCurr,
            partner: val.partner,
            TXCurr: val.TXCurr,
        }));

        arrayVal.sort((a, b) => {
            return b.y - a.y;
        });

        return arrayVal;
    }
);


