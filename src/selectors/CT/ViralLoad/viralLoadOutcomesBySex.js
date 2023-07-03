import { createSelector } from 'reselect';

const listUnfiltered = state => state.viralLoadOutcomesBySex.listUnfiltered;
const listFiltered = state => state.viralLoadOutcomesBySex.listFiltered;
const filtered = state => state.filters.filtered;

export const getViralLoadOutcomesBySex = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const outcomesCategories = ['LDL', 'Low Risk LLV', 'High Risk LLV '];
        const sexCategories = ['Male', 'Female'];
        let data = [];
        for(let i = 0; i < sexCategories.length; i++) {
            data[i] = [];
            for(let j = 0; j < outcomesCategories.length; j++) {
                data[i][j] = 0;
            }
        }
        for(let i = 0; i < list.length; i++) {
            let sexIndex = sexCategories.indexOf(list[i].gender);
            let outcomesIndex = outcomesCategories.indexOf(list[i].outcome);
            if(outcomesIndex === -1 || sexIndex === -1) {
                continue;
            }
            data[sexIndex][outcomesIndex] = data[sexIndex][outcomesIndex] + parseInt(list[i].count);
        }
        return { sexCategories, outcomesCategories, data };
    }
);

export const getViralLoadOutcomesOverall = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const outcomesCategories = ['LDL', 'Low Risk LLV', 'High Risk LLV '];
        let data = [];
        for(let i = 0; i < outcomesCategories.length; i++) {
            data[i] = 0;
        }
        for(let i = 0; i < list.length; i++) {
            let outcomesIndex = outcomesCategories.indexOf(list[i].outcome);
            if(outcomesIndex === -1) {
                continue;
            }
            data[outcomesIndex] = data[outcomesIndex] + parseInt(list[i].count);
        }
        return { outcomesCategories, data };
    }
);
