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
        let symptomaticPatients = [];

        for (let j = 0; j < ageGroups.length; j++) {
            const filteredAgeGroups = list.filter(obj => obj.DATIM_AgeGroup === ageGroups[j]);

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
