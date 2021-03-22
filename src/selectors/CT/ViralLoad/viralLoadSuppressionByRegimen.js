import { createSelector } from 'reselect';

const listUnfiltered = state => state.viralLoadSuppressionByRegimen.listUnfiltered;
const listFiltered = state => state.viralLoadSuppressionByRegimen.listFiltered;
const filtered = state => state.filters.filtered;

export const getViralLoadSuppressionByRegimen = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const regimenCategories = ['TLD', 'TLE', 'NVP', 'Other Regimen'];
        const retentionCategories = ['VL', 'HVL', 'LVL'];
        let data = [];
        for (const retentionCategory of retentionCategories) {
            const categoryData = [];
            for (const regimenCategory of regimenCategories) {
                const filteredValues = list.filter(obj => obj.Last12MVLResult === retentionCategory && obj.regimen === regimenCategory);
                if (filteredValues.length > 0) {
                    categoryData.push(filteredValues[0].count);
                } else {
                    categoryData.push(0);
                }
            }
            data.push(categoryData);
        }

        return { regimenCategories, data };
    }
);
