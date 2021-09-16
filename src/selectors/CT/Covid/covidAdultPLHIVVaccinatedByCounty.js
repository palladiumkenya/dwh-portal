import _ from 'lodash';
import { createSelector } from 'reselect';

const listUnfiltered = state => state.CovidAdultPLHIVVaccinatedByCounty.listUnfiltered;
const listFiltered = state => state.CovidAdultPLHIVVaccinatedByCounty.listFiltered;
const filtered = state => state.filters.filtered;

export const getAdultPLHIVVaccinatedByCounty = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;

        let counties = list.map(obj => obj.County);
        let fullyVaccinated = [];
        let partiallyVaccinated = [];

        for (let j = 0; j < counties.length; j++) {
            const filteredCounties = list.filter(obj => obj.County === counties[j]);
            if (filteredCounties.length > 0) {
                const filterFully = filteredCounties.filter(obj => obj.VaccinationStatus === 'Fully Vaccinated');
                const filterPartial = filteredCounties.filter(obj => obj.VaccinationStatus === 'Partially Vaccinated');
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

        return { counties, fullyVaccinated, partiallyVaccinated };
    }
);
