import { createSelector } from 'reselect';

const filtered = state => state.filters.filtered;
const listFiltered = state => state.otzEnrollmentAmongAlhivOnArtByPartner.listFiltered;
const listUnfiltered = state => state.otzEnrollmentAmongAlhivOnArtByPartner.listUnfiltered;
const listFilteredPartner = state => state.otzEnrolledAdolescentsByPartner.listFiltered;
const listUnfilteredPartner = state => state.otzEnrolledAdolescentsByPartner.listUnfiltered;

export const getOtzEnrollmentAmongAlHivOnArtByPartner = createSelector(
    [listUnfiltered, listUnfilteredPartner, listFiltered, listFilteredPartner, filtered],
    (listUnfiltered, listUnfilteredPartner, listFiltered, listFilteredPartner, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const listPartner = filtered ? listFilteredPartner : listUnfilteredPartner;

        const arrayVal = [];
        for (const listElement of list) {
            const filterTotalAdolescents = listPartner.filter(obj => obj.partner === listElement.partner);
            if (filterTotalAdolescents.length > 0) {
                const percentage = ((listElement.TXCurr / filterTotalAdolescents[0].totalAdolescents) * 100);
                arrayVal.push({
                    y: Math.round((percentage + Number.EPSILON) * 100) / 100,
                    text: listElement.TXCurr,
                    partner: listElement.partner,
                    TXCurr: listElement.TXCurr
                });
            }
        }

        /*const arrayVal = list.map(val => ({
            y: Math.round(val.Percentage),
            text: val.TXCurr,
            partner: val.partner,
            TXCurr: val.TXCurr,
        }));*/

        arrayVal.sort((a, b) => {
            return b.y - a.y;
        });

        return arrayVal;
    }
);


