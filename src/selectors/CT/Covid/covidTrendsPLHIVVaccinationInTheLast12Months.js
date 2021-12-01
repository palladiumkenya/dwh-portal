import _ from 'lodash';
import { createSelector } from 'reselect';

const listUnfiltered = state => state.CovidTrendsPLHIVVaccinationInTheLast12Months.listUnfiltered;
const listFiltered = state => state.CovidTrendsPLHIVVaccinationInTheLast12Months.listFiltered;
const filtered = state => state.filters.filtered;

export const getTrendsPLHIVVaccinationInTheLast12Months = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;

        const yearMonthTrends = list.map(obj => obj.DategivenFirstDose + ' ' + obj.YearFirstDose);
        const fullyVaccinated = list.filter(obj => obj.VaccinationStatus === 'Fully Vaccinated');
        const partiallyVaccinated = list.filter(obj => obj.VaccinationStatus === 'Partially Vaccinated');

        const trendsFullyVaccinated = fullyVaccinated.map(obj => obj.Num);
        const trendsPartiallyVaccinated = partiallyVaccinated.map(obj => obj.Num);

        return { yearMonthTrends, trendsFullyVaccinated, trendsPartiallyVaccinated };
    }
);
