import _ from 'lodash';
import { createSelector } from 'reselect';

const listUnfiltered = state => state.viralLoadSuppressionByYearAndSuppressionCategory.listUnfiltered;
const listFiltered = state => state.viralLoadSuppressionByYearAndSuppressionCategory.listFiltered;
const filtered = state => state.filters.filtered;

export const getViralLoadSuppressionByYearAndSuppressionCategory = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const retentionCategories = ['HVL', 'LLV', 'SUPPRESSED'];
        const yearCategories = [2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021];
        let data = [];
        for (const retentionCategory of retentionCategories) {
            const categoryData = [];
            for (let i = 0; i < yearCategories.length; i++) {
                const filteredValues = list.filter(obj => obj.last12MVLResult === retentionCategory && obj.year === yearCategories[i]);
                if (filteredValues.length > 0) {
                    categoryData.push(filteredValues[0].totalSuppressed);
                } else {
                    categoryData.push(0);
                }
            }
            data.push(categoryData);
        }
        return { yearCategories, retentionCategories, data };
    }
);

export const getViralLoadDoneByYear = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return _.chain(list)
            .filter(l => l.year >= 2011)
            .groupBy('year')
            .map((objs, key) => ({
                'year': key,
                'vlDone': _.sumBy(objs, 'totalSuppressed')
            }))
            .value();
    }
);
