import { createSelector } from 'reselect';

const filtered = state => state.filters.filtered;
const listFiltered = (state) => state.otzNotEnrolledPartner.listFiltered;
const listUnfiltered = (state) => state.otzNotEnrolledPartner.listUnfiltered;
const listFilteredPartner = state => state.otzEnrolledAdolescentsByPartner.listFiltered;
const listUnfilteredPartner = state => state.otzEnrolledAdolescentsByPartner.listUnfiltered;

export const getOtzNotEnrolledAmongAlHivOnArtByPartner = createSelector(
    [listUnfiltered, listUnfilteredPartner, listFiltered, listFilteredPartner, filtered],
    (listUnfiltered, listUnfilteredPartner, listFiltered, listFilteredPartner, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const listPartner = filtered ? listFilteredPartner : listUnfilteredPartner;

        const arrayVal = [];
        for (const listElement of list) {

            const filterTotalAdolescents = listPartner.filter(
                (obj) =>{
                    return obj.partner === listElement.CTPartner;
            });
            
            if (filterTotalAdolescents.length > 0) {
                const percentage =
                    (listElement.Num /
                        filterTotalAdolescents[0].totalAdolescents) *
                    100;
                arrayVal.push({
                    y: Math.round((percentage + Number.EPSILON) * 100) / 100,
                    text: listElement.Num,
                    partner: listElement.CTPartner,
                    TXCurr: listElement.Num,
                });
            }
        }
        
        arrayVal.sort((a, b) => {
            return b.y - a.y;
        });

        return arrayVal;
    }
);


