import { createSelector } from 'reselect';

const filtered = state => state.filters.filtered;
const listFiltered = state => state.otzEnrollmentAmongAlhivOnArtByAge.listFiltered;
const listUnfiltered = state => state.otzEnrollmentAmongAlhivOnArtByAge.listUnfiltered;
const listFilteredByAgeGroup = state => state.otzEnrollmentAdolescentsByAgeGroup.listFiltered;
const listUnfilteredByAgeGroup = state => state.otzEnrollmentAdolescentsByAgeGroup.listUnfiltered;

export const getOtzEnrollmentAmongAlHivOnArtByAge = createSelector(
    [listUnfiltered, listUnfilteredByAgeGroup, listFiltered, listFilteredByAgeGroup, filtered],
    (listUnfiltered, listUnfilteredByAgeGroup, listFiltered, listFilteredByAgeGroup, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const listAgeGroup = filtered ? listFilteredByAgeGroup : listUnfilteredByAgeGroup;

        //get sum of clients
        let totalAdolescents =  listAgeGroup.reduce((a, b) => a + b.totalAdolescents, 0)

        const arrayVal = [];
        for (const listAgeGroupElement of listAgeGroup) {
            const listItem = list.filter(obj => obj.ageGroup === listAgeGroupElement.ageGroup);
            if (listItem.length > 0) {
                const percentage = ((listItem[0].TXCurr / totalAdolescents) * 100);
                arrayVal.push(
                    {
                        y: Math.round((percentage + Number.EPSILON) * 100) / 100,
                        text: listItem[0].TXCurr,
                        ageGroup: listItem[0].ageGroup,
                        TXCurr: listItem[0].TXCurr
                    }
                );
            }
        }

        return arrayVal;
    }
);


