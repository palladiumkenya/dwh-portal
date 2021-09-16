import _ from 'lodash';
import { createSelector } from 'reselect';

const listUnfiltered = state => state.CovidAdultPLHIVVaccinatedByGender.listUnfiltered;
const listFiltered = state => state.CovidAdultPLHIVVaccinatedByGender.listFiltered;
const filtered = state => state.filters.filtered;

export const getAdultPLHIVVaccinatedByGender = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;

        let gender = [
            "Female",
            "Male"
        ];
        let fullyVaccinated = [];
        let partiallyVaccinated = [];

        for (let j = 0; j < gender.length; j++) {
            const filteredGenders = list.filter(obj => obj.gender === gender[j]);
            if (filteredGenders.length > 0) {
                const filterFully = filteredGenders.filter(obj => obj.VaccinationStatus === 'Fully Vaccinated');
                const filterPartial = filteredGenders.filter(obj => obj.VaccinationStatus === 'Partially Vaccinated');
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

        return { gender, fullyVaccinated, partiallyVaccinated };
    }
);
