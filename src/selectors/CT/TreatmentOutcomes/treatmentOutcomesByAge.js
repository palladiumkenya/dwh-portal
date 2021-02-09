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
        return { ageCategories, data };
    }
);
