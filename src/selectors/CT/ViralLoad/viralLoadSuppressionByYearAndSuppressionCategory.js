import { createSelector } from 'reselect';

const listUnfiltered = state => state.viralLoadSuppressionByYearAndSuppressionCategory.listUnfiltered;
const listFiltered = state => state.viralLoadSuppressionByYearAndSuppressionCategory.listFiltered;
const filtered = state => state.filters.filtered;

export const getViralLoadSuppressionByYearAndSuppressionCategory = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        console.log(list);
        const retentionCategories = ['LLV', 'SUPPRESSED', 'HVL'];
        const yearCategories = [2011,2012,2013,2014,2015,2016,2017,2018,2019,2020, 2021];
        let data = [];

        return { yearCategories, retentionCategories, data };
    }
);
