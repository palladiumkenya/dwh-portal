import { createSelector } from 'reselect';

const listUnfiltered = state => state.viralLoadSuppressionByRegimen.listUnfiltered;
const listFiltered = state => state.viralLoadSuppressionByRegimen.listFiltered;
const filtered = state => state.filters.filtered;

export const getViralLoadSuppressionByRegimen = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const regimenCategories = ['TLD', 'TLE', 'OTHERS'];
        const suppressionCategories = ['SUPPRESSED', 'LLV', 'HVL'];
        let data = [];
        for(let i = 0; i < regimenCategories.length; i++) {
            data[i] = 0;
        }
        for(let i = 0; i < list.length; i++) {
            let regimenIndex = regimenCategories.indexOf(list[i].regimen);
            if(regimenIndex === -1) {
                if(list[i].regimen === 'Other Regimen') {
                    regimenIndex = 2;
                } else {
                    continue;
                }
            }
            data[regimenIndex] = data[regimenIndex] + parseInt(list[i].txCurr);
        }
        return { suppressionCategories, regimenCategories, data };
    }
);
