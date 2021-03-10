import { createSelector } from 'reselect';

const listUnfiltered = state => state.treatmentOutcomesByAge.listUnfiltered;
const listFiltered = state => state.treatmentOutcomesByAge.listFiltered;
const filtered = state => state.filters.filtered;

export const getTreatmentOutcomesByAge = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const treatmentOutcomesCategories = ['Active', 'Dead', 'LTFU', 'Stopped', 'TransferOut'];
        const ageCategories = [
            '<1',
            '1-4',
            '5-9',
            '10-14',
            '15-19',
            '20-24',
            '25-29',
            '30-34',
            '35-39',
            '40-44',
            '45-49',
            '50-54',
            '55-59',
            '60-64',
            '65+'
        ];
        let data = [];
        // seed all values sp that missing values default to 0
        for(let i = 0; i < treatmentOutcomesCategories.length; i++) {
            data[i] = [];
            for(let j = 0; j < ageCategories.length; j++) {
                data[i][j] = 0;
            }
        }
        for(let i = 0; i < list.length; i++) {
            let treatmentOutcomesIndex = treatmentOutcomesCategories.indexOf(list[i].artOutcome);
            let ageIndex = ageCategories.indexOf(list[i].ageGroup);
            if(treatmentOutcomesIndex === -1 || ageIndex === -1 ) { // unsupported
                continue;
            }
            data[treatmentOutcomesIndex][ageIndex] = data[treatmentOutcomesIndex][ageIndex] + parseInt(list[i].totalOutcomes);
        }
        // combine and cleanup
        for(let i = 0; i < data.length; i++) {
            data[i][1] = data[i][1] + data[i][0];
            data[i][7] = data[i][7] + data[i][6];
            data[i][9] = data[i][9] + data[i][8];
            data[i][11] = data[i][11] + data[i][10];
            data[i][13] = data[i][13] + data[i][12];
            data[i].splice(0, 1);
            data[i].splice(6-1, 1);
            data[i].splice(8-2, 1);
            data[i].splice(10-3, 1);
            data[i].splice(12-4, 1);
        }
        ageCategories[1] = '<5';
        ageCategories[7] = '25-34';
        ageCategories[9] = '35-44';
        ageCategories[11] = '45-54';
        ageCategories[13] = '55-64';
        ageCategories.splice(0, 1);
        ageCategories.splice(6-1, 1);
        ageCategories.splice(8-2, 1);
        ageCategories.splice(10-3, 1);
        ageCategories.splice(12-4, 1);
        return { ageCategories, data };
    }
);
