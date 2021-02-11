import { createSelector } from 'reselect';

const listUnfiltered = state => state.viralLoadUptakeByAge.listUnfiltered;
const listFiltered = state => state.viralLoadUptakeByAge.listFiltered;
const filtered = state => state.filters.filtered;

export const getViralLoadUptakeByAge = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const sexCategories = ['Male', 'Female'];
        const ageCategories = [
            'Under 1',
            '1 to 4',
            '5 to 9',
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
            '65+'
        ];
        let data = [];
        for(let i = 0; i < sexCategories.length; i++) {
            data[i] = [];
            for(let j = 0; j < ageCategories.length; j++) {
                data[i][j] = 0;
            }
        }
        for(let i = 0; i < list.length; i++) {
            let sexIndex = sexCategories.indexOf(list[i].gender);
            let ageIndex = ageCategories.indexOf(list[i].ageGroup);
            if(sexIndex === -1 || ageIndex === -1) {
                continue;
            }
            data[sexIndex][ageIndex] = data[sexIndex][ageIndex] + parseInt(list[i].vlDone);
        }
        return { ageCategories, sexCategories, data };
    }
);
