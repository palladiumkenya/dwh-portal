import { createSelector } from 'reselect';

const filtered = state => state.filters.filtered;
const listFiltered = state => state.otzEnrollmentAmongAlhivOnArtByCounty.listFiltered;
const listUnfiltered = state => state.otzEnrollmentAmongAlhivOnArtByCounty.listUnfiltered;
const listFilteredCounty = state => state.otzEnrolledAdolescentsByCounty.listFiltered;
const listUnfilteredCounty = state => state.otzEnrolledAdolescentsByCounty.listUnfiltered;

export const getOtzEnrollmentAmongAlHivOnArtByCounty = createSelector(
    [listUnfiltered, listUnfilteredCounty, listFiltered, listFilteredCounty, filtered],
    (listUnfiltered, listUnfilteredCounty, listFiltered, listFilteredCounty, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const listCounty = filtered ? listFilteredCounty : listUnfilteredCounty;

        const arrayVal = [];
        for (const listElement of list) {
            const filterTotalAdolescents = listCounty.filter(obj => obj.County === listElement.County);
            if (filterTotalAdolescents.length > 0) {
                const percentage = ((listElement.TXCurr / filterTotalAdolescents[0].totalAdolescents) * 100);
                arrayVal.push({
                    y: Math.round((percentage + Number.EPSILON) * 100) / 100,
                    text: listElement.TXCurr,
                    County: listElement.County,
                    TXCurr: listElement.TXCurr
                });
            }
        }

        arrayVal.sort((a, b) => {
            return b.y - a.y;
        });

        return arrayVal;
    }
);


