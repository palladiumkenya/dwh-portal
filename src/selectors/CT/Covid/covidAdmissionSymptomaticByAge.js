import _ from 'lodash';
import { createSelector } from 'reselect';

const listUnfiltered = state => state.CovidAdmissionSymptomaticByAge.listUnfiltered;
const listFiltered = state => state.CovidAdmissionSymptomaticByAge.listFiltered;
const filtered = state => state.filters.filtered;

export const getCovidAdmissionSymptomaticByAge = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;

        let ageGroups = [
            '< 1',
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
        let symptomaticPatients = [];

        for (let j = 0; j < ageGroups.length; j++) {
            const filteredAgeGroups = list.filter(obj => obj.AgeGroup === ageGroups[j]);

            if (filteredAgeGroups.length > 0) {

                symptomaticPatients.push(
                    {
                        y: Number(filteredAgeGroups[0].Num) > 0 ? Number(filteredAgeGroups[0].Num) : 0,
                        text: filteredAgeGroups[0].Num
                    }
                );
            } else {
                symptomaticPatients.push(
                    {
                        y: 0,
                        text: 0
                    }
                );
            }
        }

        return { ageGroups, symptomaticPatients };
    }
);
