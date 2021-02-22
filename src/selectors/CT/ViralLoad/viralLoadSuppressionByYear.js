import { createSelector } from 'reselect';

const listUnfiltered = state => state.viralLoadSuppressionByYear.listUnfiltered;
const listFiltered = state => state.viralLoadSuppressionByYear.listFiltered;
const filtered = state => state.filters.filtered;

export const getViralLoadSuppressionByYear = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const retentionCategories = ['3 MONTHS', '6 MONTHS', '12 MONTHS', '24 MONTHS'];
        const yearCategories = [2011,2012,2013,2014,2015,2016,2017,2018,2019,2020];
        let data = [];
        for(let i = 0; i < retentionCategories.length; i++) {
            data[i] = [];
            for(let j = 0; j < yearCategories.length; j++) {
                data[i][j] = 0;
            }
        }
        for(let i = 0; i < list.length; i++) {
            let yearIndex = yearCategories.indexOf(list[i].year);
            if(yearIndex === -1) {
                continue;
            }
            data[0][yearIndex] = data[0][yearIndex] + parseInt(list[i].retention3Months);
            data[1][yearIndex] = data[1][yearIndex] + parseInt(list[i].retention6Months);
            data[2][yearIndex] = data[2][yearIndex] + parseInt(list[i].retention12Months);
            data[3][yearIndex] = data[3][yearIndex] + parseInt(list[i].retention24Months);
        }
        return { yearCategories, retentionCategories, data };
    }
);
