import { createSelector } from 'reselect';

const listUnfiltered = state => state.dsdAppointmentDurationByAge.listUnfiltered;
const listFiltered = state => state.dsdAppointmentDurationByAge.listFiltered;
const filtered = state => state.filters.filtered;

export const getAppointmentDurationByAge = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const ageCategories = [
            ' Under 1',
            '01 to 04',
            '05 to 09',
            '10 to 14',
            '15 to 19',
            '20 to 24',
            '25 to 29',
            '30 to 34',
            '35 to 39',
            '40 to 44',
            '45 to 49',
            '50 to 54',
            '55 to 59',
            '60 to 64',
            '65+',
        ];
        const arr = {
            '<15 YRS': [' Under 1', '01 to 04', '05 to 09', '10 to 14'],
            '15-19 YRS': ['15 to 19'],
            '20-24 YRS': ['20 to 24'],
            '25-34 YRS': ['25 to 29', '30 to 34'],
            '35-44 YRS': ['35 to 39', '40 to 44'],
            '45-54 YRS': ['45 to 49', '50 to 54'],
            '55-64 YRS': ['55 to 59', '60 to 64'],
            '65+ YRS': ['65+'],
        };
        const MMDarr = [];
        const NonMMDarr = [];
        const groupedVals = [];

        Object.keys(arr).forEach(key => {
            let totalMMD = 0;
            let totalNonMMD = 0;
            if (arr[key].length > 1) {
                arr[key].forEach(z => {
                    const catValues = list.filter(obj => obj.AgeGroup?.trim() === z?.trim());
                    if (catValues.length > 0) {
                        totalMMD = totalMMD + catValues[0].MMD;
                        totalNonMMD = totalNonMMD + catValues[0].NonMMD;
                    }
                });
            } else {
                const catValues = list.filter(obj => obj.AgeGroup?.trim() === arr[key][0]);
                if (catValues.length > 0) {
                    totalMMD = totalMMD + catValues[0].MMD;
                    totalNonMMD = totalNonMMD + catValues[0].NonMMD;
                }
            }
            MMDarr.push(totalMMD);
            NonMMDarr.push(totalNonMMD);
        });
        const ObjectArr = Object.keys(arr);
        groupedVals.push(MMDarr, NonMMDarr);
        return { ageCategories, groupedVals, ObjectArr };
    }
);
