import _ from 'lodash';
import { createSelector } from 'reselect';

const listUnfiltered = state => state.CovidAdultPLHIVVaccinatedByAgeGroup.listUnfiltered;
const listFiltered = state => state.CovidAdultPLHIVVaccinatedByAgeGroup.listFiltered;
const filtered = state => state.filters.filtered;

export const getAdultPLHIVVaccinatedByAgeGroups = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;

        let ageGroups = [
            "15-19",
            "20-24",
            "25-29",
            "30-34",
            "35-39",
            "40-44",
            "45-49",
            "50-54",
            "55-59",
            "60-64",
            "65+"
        ];
        let fullyVaccinated = [];
        let partiallyVaccinated = [];

        for (let j = 0; j < ageGroups.length; j++) {
            const filteredAgeGroups = list.filter(obj => obj.AgeGroup === ageGroups[j]);
            if (filteredAgeGroups.length > 0) {
                const filterFully = filteredAgeGroups.filter(obj => obj.VaccinationStatus === 'Fully Vaccinated');
                const filterPartial = filteredAgeGroups.filter(obj => obj.VaccinationStatus === 'Partially Vaccinated');
                if (filterFully.length > 0) {
                    fullyVaccinated.push(Number(filterFully[0].Num));
                } else {
                    fullyVaccinated.push(0);
                }

                if (filterPartial.length > 0) {
                    partiallyVaccinated.push(Number(filterPartial[0].Num));
                } else {
                    partiallyVaccinated.push(0);
                }
            } else {
                fullyVaccinated.push(0);
                partiallyVaccinated.push(0);
            }
        }

        return { ageGroups, fullyVaccinated, partiallyVaccinated };
    }
);
